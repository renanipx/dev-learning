const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - Buscar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/todos - Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      dueDate: req.body.dueDate
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/todos/:id - Buscar tarefa específica
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/todos/:id - Atualizar tarefa
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/todos/:id - Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;