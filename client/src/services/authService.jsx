// src/services/authService.jsx
import apiClient from './apiClient';

export const register = (username, email, password) => 
  apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });

export const login = (email, password) => 
  apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};