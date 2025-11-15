const express = require('express');
const { authorize } = require('../middleware/permissions');

const router = express.Router();

// In-memory todos
let TODOS = [
  { id: 't1', title: 'First Task', completed: false },
];

// GET /api/todos - requires todo:read
router.get('/', authorize(['todo:read']), (req, res) => {
  res.json(TODOS);
});

// POST /api/todos - requires todo:create
router.post('/', authorize(['todo:create']), (req, res) => {
  const { title } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }
  const id = `t${Date.now()}`;
  const todo = { id, title, completed: false };
  TODOS.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id - requires todo:update
router.put('/:id', authorize(['todo:update']), (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body || {};
  const idx = TODOS.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  TODOS[idx] = { ...TODOS[idx], title: title ?? TODOS[idx].title, completed: completed ?? TODOS[idx].completed };
  res.json(TODOS[idx]);
});

// DELETE /api/todos/:id - requires todo:delete
router.delete('/:id', authorize(['todo:delete']), (req, res) => {
  const { id } = req.params;
  const exists = TODOS.some(t => t.id === id);
  if (!exists) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  TODOS = TODOS.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;