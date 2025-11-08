import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import roomRoutes from './routes/roomRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';
import Message from './models/Message';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realtime-echo-chat';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use(notFound);
app.use(errorHandler);

const connectedUsers = new Map<string, { socketId: string; username: string; roomId?: string }>();
const roomUsers = new Map<string, Set<string>>();

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET as string);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  const user = socket.data.user;
  console.log(`User ${user.username} connected`);

  connectedUsers.set(user.userId, {
    socketId: socket.id,
    username: user.username
  });

  socket.on('join-room', async (data) => {
    try {
      const { roomId } = data;
      
      socket.join(roomId);
      
      const userData = connectedUsers.get(user.userId);
      if (userData) {
        userData.roomId = roomId;
        connectedUsers.set(user.userId, userData);
      }

      if (!roomUsers.has(roomId)) {
        roomUsers.set(roomId, new Set());
      }
      roomUsers.get(roomId)!.add(user.userId);

      socket.to(roomId).emit('user-joined', {
        username: user.username,
        message: `${user.username} joined the room`
      });

      const usersInRoom = Array.from(roomUsers.get(roomId)!).map(userId => {
        const userInfo = connectedUsers.get(userId);
        return userInfo ? userInfo.username : null;
      }).filter(Boolean);

      io.to(roomId).emit('room-users', {
        roomId,
        users: usersInRoom
      });

      const recentMessages = await Message.find({ roomId })
        .sort({ timestamp: -1 })
        .limit(50)
        .lean();

      socket.emit('room-messages', {
        roomId,
        messages: recentMessages.reverse().map(msg => ({
          id: msg._id,
          username: msg.username,
          content: msg.content,
          timestamp: msg.timestamp
        }))
      });

    } catch (error) {
      console.error('Join room error:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  socket.on('leave-room', (data) => {
    try {
      const { roomId } = data;
      
      socket.leave(roomId);
      
      const userData = connectedUsers.get(user.userId);
      if (userData) {
        userData.roomId = undefined;
        connectedUsers.set(user.userId, userData);
      }

      if (roomUsers.has(roomId)) {
        roomUsers.get(roomId)!.delete(user.userId);
        
        if (roomUsers.get(roomId)!.size === 0) {
          roomUsers.delete(roomId);
        } else {
          const usersInRoom = Array.from(roomUsers.get(roomId)!).map(userId => {
            const userInfo = connectedUsers.get(userId);
            return userInfo ? userInfo.username : null;
          }).filter(Boolean);

          io.to(roomId).emit('room-users', {
            roomId,
            users: usersInRoom
          });
        }
      }

      socket.to(roomId).emit('user-left', {
        username: user.username,
        message: `${user.username} left the room`
      });

    } catch (error) {
      console.error('Leave room error:', error);
      socket.emit('error', { message: 'Failed to leave room' });
    }
  });

  socket.on('send-message', async (data) => {
    try {
      const { roomId, content } = data;

      if (!content || content.trim().length === 0) {
        socket.emit('error', { message: 'Message cannot be empty' });
        return;
      }

      if (content.length > 1000) {
        socket.emit('error', { message: 'Message too long (max 1000 characters)' });
        return;
      }

      const message = new Message({
        roomId,
        userId: user.userId,
        username: user.username,
        content: content.trim()
      });

      await message.save();

      const messageData = {
        id: message._id,
        username: user.username,
        content: content.trim(),
        timestamp: message.timestamp
      };

      io.to(roomId).emit('new-message', messageData);

    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('typing', (data) => {
    const { roomId, isTyping } = data;
    socket.to(roomId).emit('user-typing', {
      username: user.username,
      isTyping
    });
  });

  socket.on('disconnect', () => {
    console.log(`User ${user.username} disconnected`);
    
    const userData = connectedUsers.get(user.userId);
    if (userData && userData.roomId) {
      const roomId = userData.roomId;
      
      if (roomUsers.has(roomId)) {
        roomUsers.get(roomId)!.delete(user.userId);
        
        if (roomUsers.get(roomId)!.size === 0) {
          roomUsers.delete(roomId);
        } else {
          const usersInRoom = Array.from(roomUsers.get(roomId)!).map(userId => {
            const userInfo = connectedUsers.get(userId);
            return userInfo ? userInfo.username : null;
          }).filter(Boolean);

          io.to(roomId).emit('room-users', {
            roomId,
            users: usersInRoom
          });
        }
      }

      socket.to(roomId).emit('user-left', {
        username: user.username,
        message: `${user.username} left the room`
      });
    }

    connectedUsers.delete(user.userId);
  });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

export default app;