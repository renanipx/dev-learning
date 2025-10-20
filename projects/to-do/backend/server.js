const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar com MongoDB:', err));

// Importar rotas
const todoRoutes = require('./routes/todos');

// Rotas
app.use('/api/todos', todoRoutes);

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API do To-Do App funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});