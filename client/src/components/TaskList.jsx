import { useState } from 'react';
import { taskService } from '../services/taskService';
import styled from 'styled-components';

// Styled components
const TaskListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const TaskCard = styled.div`
  background: #2d3436;
  border: 2px solid ${props => props.completed ? '#00b894' : '#6c5ce7'};
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  transition: all 0.3s ease;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3);
  }
`;

const TaskContent = styled.div`
  color: white;
  margin-bottom: 15px;
  text-align: center; 
`;

const TaskTitle = styled.h3`
  margin: 0 0 8px 0;
  color: ${props => props.completed ? '#b2bec3' : '#00b894'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  font-size: 24px;
`;

const TaskDescription = styled.p`
  margin: 0;
  margin-bottom: 20px;
  color: #dfe6e9;
  font-size: 16px;
`;

const TaskActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 0px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'delete' ? '#d63031' : '#6c5ce7'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.variant === 'delete' ? '#c0392b' : '#5f4dd1'};
  }
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  background: #34495e;
  border: 1px solid #6c5ce7;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #00b894;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

// Component 
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
              <TaskCard>
                <TaskTitle completed={task.completed}>
                  {task.title}
                </TaskTitle>
                <TaskDescription>
                  {task.description}
                </TaskDescription>
                <TaskActions>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Checkbox
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />
                  <span style={{ color: '#dfe6e9' }}>Complete</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={() => startEdit(task)}>Edit</Button>
                    <Button variant="delete" onClick={() => deleteTask(task.id)}>Delete</Button>
                  </div>
                </TaskActions>
              </TaskCard>
              
            </div>
          )}
        </div>
      ))}
    </div>
  );
}