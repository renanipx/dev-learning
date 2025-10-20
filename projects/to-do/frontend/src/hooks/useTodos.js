import { useState, useEffect } from 'react';
import { todoService } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar todas as tarefas
  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova tarefa
  const addTodo = async (todoData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error('Erro:', err);
      throw err;
    }
  };

  // Atualizar tarefa
  const updateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro:', err);
      throw err;
    }
  };

  // Deletar tarefa
  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error('Erro:', err);
      throw err;
    }
  };

  // Alternar status de conclusão
  const toggleTodo = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
    } catch (err) {
      console.error('Erro ao alternar tarefa:', err);
    }
  };

  // Carregar tarefas ao inicializar
  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos: loadTodos,
  };
};