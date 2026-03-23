// src/services/userService.jsx
import apiClient from './apiClient';

export const getUser = (id) => apiClient(`/users/${id}`);

export const updateUser = (id, user) => 
  apiClient(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });

// Keeping your object export for compatibility with your existing imports
export const userService = {
  getUser,
  updateUser,
};