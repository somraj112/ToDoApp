import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }])
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...updatedTask, id: task.id } : task
    ))
    setEditingTask(null)
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="app-container">
      <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      <h1>Task Manager</h1>
      <TaskForm 
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        editTask={editingTask}
      />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  )
}

export default App
