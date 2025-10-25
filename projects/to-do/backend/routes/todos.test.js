const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todosRouter = require('./todos');
const Todo = require('../models/Todo');
const authRouter = require('./auth');

const app = express();
app.use(express.json());
app.use('/api/todos', todosRouter);
app.use('/api', authRouter);

let token;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/todo_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Obter token JWT antes dos testes
  const res = await request(app)
    .post('/api/login')
    .send({ username: 'admin', password: '123456' });
  token = res.body.token;
});

// Limpar coleção antes de cada teste
beforeEach(async () => {
  await Todo.deleteMany();
});

// Fechar conexão após os testes
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todos API', () => {
  it('GET /api/todos deve retornar lista vazia', async () => {
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/todos deve criar uma nova tarefa', async () => {
    const todoData = {
      title: 'Testar Jest',
      description: 'Descrição de teste',
      priority: 'alta',
      dueDate: '2024-12-31',
    };
    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(todoData);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(todoData.title);
  });

  it('GET /api/todos deve retornar tarefas criadas', async () => {
    await Todo.create({ title: 'Tarefa 1', priority: 'baixa' });
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Tarefa 1');
  });

  it('GET /api/todos/:id deve retornar tarefa específica', async () => {
    const todo = await Todo.create({ title: 'Tarefa específica', priority: 'média' });
    const res = await request(app)
      .get(`/api/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tarefa específica');
  });

  it('PUT /api/todos/:id deve atualizar tarefa', async () => {
    const todo = await Todo.create({ title: 'Atualizar', priority: 'baixa' });
    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Atualizada', priority: 'alta' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Atualizada');
    expect(res.body.priority).toBe('alta');
  });

  it('DELETE /api/todos/:id deve deletar tarefa', async () => {
    const todo = await Todo.create({ title: 'Deletar', priority: 'baixa' });
    const res = await request(app)
      .delete(`/api/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tarefa deletada com sucesso');
  });
});