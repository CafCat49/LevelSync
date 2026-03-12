const API_URL = 'http://localhost:8080/api/tasks';

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },

  // Create a task
  createTask: async (task) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  // Update a task
  updateTask: async (id, task) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  // Delete a task
  deleteTask: async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};