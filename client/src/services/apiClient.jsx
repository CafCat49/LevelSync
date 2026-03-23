// src/services/apiClient.js
const BASE_URL = 'https://levelsync-backend.onrender.com/api';

const apiClient = async (endpoint, options = {}) => {
  // 1. Automatically get the token for every request
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 2. Handle empty responses (like DELETE) or errors
  const data = response.status !== 204 ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Server Error');
    error.status = response.status;
    error.errors = data?.errors; 
    throw error;
  }

  return data;
};

export default apiClient;