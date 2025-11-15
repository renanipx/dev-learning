require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/auth');
const todoRoutes = require('./src/routes/todos');
const { verifyAccessToken } = require('./src/middleware/auth');

const app = express();

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Auth + Roles + Permissions API is running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes (verify access token, then authorize per route)
app.use('/api/todos', verifyAccessToken, todoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});