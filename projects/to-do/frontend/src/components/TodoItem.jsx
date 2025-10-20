import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority || 'média',
    dueDate: todo.dueDate || ''
  });

  const handleSave = async () => {
    try {
      await onUpdate(todo._id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority || 'média',
      dueDate: todo.dueDate || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'alta': return 'priority-alta';
      case 'média': return 'priority-média';
      case 'baixa': return 'priority-baixa';
      default: return 'priority-média';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isEditing) {
    return (
      <li className="todo-item">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            placeholder="Título"
            style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            placeholder="Descrição"
            style={{ width: '100%', marginBottom: '8px', padding: '8px', resize: 'vertical' }}
            rows="2"
          />
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              style={{ padding: '4px', flex: 1 }}
            >
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleChange}
              style={{ padding: '4px', flex: 1 }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleSave}
            className="btn btn-primary"
            style={{ padding: '8px 12px' }}
          >
            Salvar
          </button>
          <button 
            onClick={handleCancel}
            className="btn"
            style={{ padding: '8px 12px', background: '#666', color: 'white' }}
          >
            Cancelar
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />
      
      <div className="todo-content">
        <div className="todo-title">{todo.title}</div>
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
        
        <div className="todo-meta">
          {todo.priority && (
            <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
          )}
          {todo.dueDate && (
            <span>📅 {formatDate(todo.dueDate)}</span>
          )}
          <span>🕒 {new Date(todo.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button 
          onClick={() => setIsEditing(true)}
          className="btn"
          style={{ padding: '6px 12px', background: '#3182ce', color: 'white' }}
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(todo._id)}
          className="btn btn-danger"
          style={{ padding: '6px 12px' }}
        >
          Excluir
        </button>
      </div>
    </li>
  );
};

export default TodoItem;