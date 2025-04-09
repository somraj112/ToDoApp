import { useState } from 'react';

const TaskList = ({ tasks, onDelete, onEdit, onToggleComplete, darkMode = false }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'high') return task.priority.toLowerCase() === 'high';
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || '1970-01-01') - new Date(b.dueDate || '1970-01-01');
    }
    if (sortBy === 'priority') {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const darkStyles = {
    container: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    select: {
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      border: darkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    button: {
      padding: '10px 18px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
    }
  };

  return (
    <div style={darkStyles.container}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={darkStyles.select}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="high">High Priority</option>
        </select>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={darkStyles.select}
        >
          <option value="dueDate">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {sortedTasks.map((task) => (
        <div 
          key={task.id} 
          style={{
            background: darkMode
              ? `linear-gradient(135deg, ${task.priority === 'High' ? '#4a1d1d' : task.priority === 'Medium' ? '#3d3d1d' : '#1d3d1d'}, #374151)`
              : `linear-gradient(135deg, ${task.priority === 'High' ? '#fff5f5' : task.priority === 'Medium' ? '#fffff0' : '#f0fff4'}, #f3f4f6)`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '15px',
            transition: 'all 0.3s ease',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: task.completed ? 'scale(0.98)' : 'scale(1)',
            opacity: task.completed ? 0.7 : 1,
            '&:hover': {
              transform: task.completed ? 'scale(0.98)' : 'scale(1.02)',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => onToggleComplete(task.id)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                margin: '0 0 8px 0',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: darkMode ? '#ffffff' : '#000000',
              }}>
                {task.title}
              </h3>
              <p style={{ 
                margin: '0 0 8px 0',
                color: darkMode ? '#9ca3af' : '#666666',
              }}>
                {task.description}
              </p>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.9em' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: task.priority === 'High' ? '#ef4444' : 
                                 task.priority === 'Medium' ? '#f59e0b' : '#10b981',
                  color: '#ffffff',
                }}>
                  {task.priority}
                </span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
                  color: darkMode ? '#ffffff' : '#000000',
                }}>
                  {task.category}
                </span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
                  color: darkMode ? '#ffffff' : '#000000',
                }}>
                  {task.dueDate || 'No Due Date'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onEdit(task)}
                style={{
                  ...darkStyles.button,
                  backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
                  color: '#ffffff',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                style={{
                  ...darkStyles.button,
                  backgroundColor: darkMode ? '#ef4444' : '#dc2626',
                  color: '#ffffff',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TaskList;