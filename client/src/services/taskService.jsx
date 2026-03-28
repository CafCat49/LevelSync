// src/services/taskService.jsx
import apiClient from './apiClient';

// We just pass the relative path (the endpoint)
export const getAllTasks = () => apiClient('/tasks');

export const createTask = (task) => apiClient('/tasks', {
  method: 'POST',
  body: JSON.stringify(task),
});

export const updateTask = (id, task) => apiClient(`/tasks/${id}`, {
  method: 'PUT',
  body: JSON.stringify(task),
});

export const deleteTask = (id) => apiClient(`/tasks/${id}`, {
  method: 'DELETE',
});

// Keep your existing exports above, then add this:
export const taskService = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};