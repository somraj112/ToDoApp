import { useState } from 'react';

const TaskForm = ({ onSubmit, editTask = null, darkMode = false }) => {
  const [task, setTask] = useState({
    title: editTask?.title || '',
    description: editTask?.description || '',
    category: editTask?.category || 'Personal',
    priority: editTask?.priority || 'Medium',
    dueDate: editTask?.dueDate ?? '',
    completed: editTask?.completed || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      id: editTask?.id || Date.now(), // Ensure each task has a unique ID
    };
    onSubmit(newTask);

    // Reset form fields regardless of whether it's an edit or new task
    setTask({
      title: '',
      description: '',
      category: 'Personal',
      priority: 'Medium',
      dueDate: '',
      completed: false,
    });
  };

  const darkStyles = {
    form: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
    },
    input: {
      backgroundColor: darkMode ? '#374151' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      border: darkMode ? '1px solid #4b5563' : '1px solid #e0e0e0',
    },
    button: {
      backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
      color: '#ffffff',
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{
      maxWidth: '500px',
      margin: '20px auto',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
      ...darkStyles.form
    }}>
      <input 
        type="text" 
        value={task.title} 
        onChange={(e) => setTask({ ...task, title: e.target.value })} 
        placeholder="Enter task title" 
        required
        style={{
          padding: '12px',
          borderRadius: '6px',
          width: '100%',
          outline: 'none',
          ...darkStyles.input
        }}
      />
      <textarea 
        value={task.description} 
        onChange={(e) => setTask({ ...task, description: e.target.value })} 
        placeholder="Enter task description"
        style={{
          padding: '12px',
          borderRadius: '6px',
          width: '100%',
          minHeight: '100px',
          resize: 'vertical',
          outline: 'none',
          ...darkStyles.input
        }}
      />
      <select 
        value={task.category} 
        onChange={(e) => setTask({ ...task, category: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '6px',
          width: '100%',
          outline: 'none',
          cursor: 'pointer',
          ...darkStyles.input
        }}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
      </select>
      <select 
        value={task.priority} 
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '6px',
          width: '100%',
          outline: 'none',
          cursor: 'pointer',
          ...darkStyles.input
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input 
        type="date" 
        value={task.dueDate} 
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        style={{
          padding: '12px',
          borderRadius: '6px',
          width: '100%',
          outline: 'none',
          cursor: 'pointer',
          ...darkStyles.input
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '14px',
          width: '100%',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'background-color 0.3s ease',
          ...darkStyles.button
        }}
      >
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;