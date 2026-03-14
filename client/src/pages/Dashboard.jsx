import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { taskService } from '../services/taskService';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a1d23 100%);
  padding: 20px;
`;

const DashboardTitle = styled.h1`
  color: #6c5ce7;
  text-align: center;
  font-size: 48px;
  margin: 20px 0;
  text-shadow: 0 0 10px rgba(0, 184, 148, 0.5);
`;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      <AddTaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
    </DashboardContainer>
  );
}