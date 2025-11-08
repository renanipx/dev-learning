import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { User, Room, Message, SocketEvents } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect() {
    const token = Cookies.get('token');
    if (!token) return;

    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.setupEventListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    const events: (keyof SocketEvents)[] = [
      'user:connected',
      'user:disconnected',
      'room:joined',
      'room:left',
      'room:message',
      'room:typing',
      'room:typing:stop',
    ];

    events.forEach((event) => {
      this.socket!.on(event, (...args: any[]) => {
        const listeners = this.listeners.get(event);
        if (listeners) {
          listeners.forEach((listener) => listener(...args));
        }
      });
    });
  }

  on<T extends keyof SocketEvents>(event: T, callback: SocketEvents[T]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback as Function);
  }

  off<T extends keyof SocketEvents>(event: T, callback: SocketEvents[T]) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.delete(callback as Function);
    }
  }

  emit<T extends keyof SocketEvents>(event: T, ...args: Parameters<SocketEvents[T]>) {
    if (this.socket) {
      this.socket.emit(event, ...args);
    }
  }

  joinRoom(roomId: string) {
    this.emit('room:join' as any, roomId);
  }

  leaveRoom(roomId: string) {
    this.emit('room:leave' as any, roomId);
  }

  sendMessage(roomId: string, content: string) {
    this.emit('room:message' as any, roomId, content);
  }

  startTyping(roomId: string) {
    this.emit('room:typing' as any, roomId);
  }

  stopTyping(roomId: string) {
    this.emit('room:typing:stop' as any, roomId);
  }
}

export const socketService = new SocketService();