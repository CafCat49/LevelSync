const API_URL = 'http://localhost:8080/api/users';

export const userService = {
    // Get current user profile
    getUser: async () => {
        const response = await fetch(`${API_URL}/current`);
        return response.json();
    },    
    
    // Update user profile
    updateUser: async (id, username) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        return response.json();
    }
};