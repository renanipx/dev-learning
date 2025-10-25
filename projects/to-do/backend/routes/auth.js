const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { SECRET } = require('../middleware/auth');

// Usuário fixo para exemplo
const USER = {
  username: 'admin',
  password: '123456',
};

// POST /api/login - Autenticação
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;