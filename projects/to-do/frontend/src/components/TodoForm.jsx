import React, { useState } from 'react';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'média',
    dueDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Por favor, insira um título para a tarefa');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        completed: false
      });
      
      // Limpar formulário após sucesso
      setFormData({
        title: '',
        description: '',
        priority: 'média',
        dueDate: ''
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="title"
        placeholder="Título da tarefa"
        value={formData.title}
        onChange={handleChange}
        required
        style={{ flex: 2 }}
      />
      
      <input
        type="text"
        name="description"
        placeholder="Descrição (opcional)"
        value={formData.description}
        onChange={handleChange}
        style={{ flex: 2 }}
      />
      
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        style={{ flex: 1 }}
      >
        <option value="baixa">Baixa</option>
        <option value="média">Média</option>
        <option value="alta">Alta</option>
      </select>
      
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        style={{ flex: 1 }}
      />
      
      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
        Adicionar
      </button>
    </form>
  );
};

export default TodoForm;