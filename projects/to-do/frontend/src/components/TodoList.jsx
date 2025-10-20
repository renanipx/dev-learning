import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onUpdate, onDelete }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;