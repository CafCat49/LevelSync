import { useState } from 'react';
import { taskService } from '../services/taskService';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #2d3436;
  border: 2px solid #6c5ce7;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  background: #34495e;
  border: 1px solid #6c5ce7;
  border-radius: 5px;
  padding: 12px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #00b894;
  }
  
  &::placeholder {
    color: #95a5a6;
  }
`;

const Button = styled.button`
  background-color: #00b894;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  
  &:hover {
    background-color: #00a383;
  }
`;

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
    <FormContainer>
      <h2 style={{ color: '#00b894', textAlign: 'center', margin: '0 0 15px 0' }}>
        Add New Task
      </h2>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input 
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Add Task</Button>
      </Form>
    </FormContainer>
  );
}