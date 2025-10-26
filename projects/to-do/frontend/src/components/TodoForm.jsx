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
      <div style={{ display: 'flex', gap: '12px', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
          <label htmlFor="title" style={{ fontWeight: '600', marginBottom: '4px' }}>Título da tarefa</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título da tarefa"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
          <label htmlFor="description" style={{ fontWeight: '600', marginBottom: '4px' }}>Descrição (opcional)</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição (opcional)"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <label htmlFor="priority" style={{ fontWeight: '600', marginBottom: '4px' }}>Prioridade</label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <label htmlFor="dueDate" style={{ fontWeight: '600', marginBottom: '4px' }}>Data de entrega</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ flex: 1, alignSelf: 'flex-end', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span className="material-icons" style={{ fontSize: '20px' }}>add</span>
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default TodoForm;