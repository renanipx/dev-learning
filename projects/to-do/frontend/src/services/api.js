import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  // Buscar todas as tarefas
  getAllTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  },

  // Criar nova tarefa
  createTodo: async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Atualizar tarefa
  updateTodo: async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Deletar tarefa
  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  },

  // Buscar tarefa por ID
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw error;
    }
  },
};

export default api;