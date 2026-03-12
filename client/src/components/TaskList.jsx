import { useState } from 'react';
import { taskService } from '../services/taskService';

export default function TaskList({ tasks, onTaskUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const toggleComplete = async (task) => {
    try {
      await taskService.updateTask(task.id, {
        ...task,
        completed: !task.completed
      });
      onTaskUpdated(); // Reload tasks
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      onTaskUpdated(); // Reload tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const saveEdit = async (task) => {
    try {
      await taskService.updateTask(task.id, {
        ...task,
        title: editTitle,
        description: editDescription
      });
      setEditingId(null);
      onTaskUpdated(); // Reload tasks
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          {editingId === task.id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={() => saveEdit(task)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <span>Complete</span>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}