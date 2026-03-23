const API_URL = 'https://levelsync-backend.onrender.com/api/users'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  })
  return await response.json()
}

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(user),
  })
  return await response.json()
}

export const userService = {
  getUser,
  updateUser,
}