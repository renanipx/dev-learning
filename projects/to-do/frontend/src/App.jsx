import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  // Filtrar tarefas baseado no filtro selecionado
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Carregando tarefas...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>📝 Lista de Tarefas</h1>
      
      {error && (
        <div style={{ 
          background: '#fed7d7', 
          color: '#c53030', 
          padding: '12px', 
          borderRadius: '6px', 
          marginBottom: '20px',
          border: '1px solid #feb2b2'
        }}>
          {error}
        </div>
      )}

      <TodoForm onSubmit={addTodo} />
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: '600' }}>Filtrar:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="all">Todas</option>
          <option value="active">Pendentes</option>
          <option value="completed">Concluídas</option>
        </select>
      </div>

      <TodoList 
        todos={filteredTodos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      {filteredTodos.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666', 
          fontStyle: 'italic' 
        }}>
          {filter === 'all' && 'Nenhuma tarefa encontrada. Adicione sua primeira tarefa!'}
          {filter === 'active' && 'Nenhuma tarefa pendente.'}
          {filter === 'completed' && 'Nenhuma tarefa concluída.'}
        </div>
      )}
    </div>
  );
}

export default App;