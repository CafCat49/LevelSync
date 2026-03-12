import { useState } from 'react';
import { taskService } from '../services/taskService';

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await taskService.createTask({
        title,
        description,
        category: 'general',
        completed: false,
        xpValue: 10,
        recurring: false
      });
      
      setTitle('');
      setDescription('');
      onTaskAdded(); // Reload tasks from server
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input 
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}