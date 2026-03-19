import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    setToken(response.token)
    setUser({ username: response.username, userId: response.userId })

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify({ username: response.username, userId: response.userId }))
  }

  const register = async (username, email, password) => {
    const response = await authService.register(username, email, password)
    setToken(response.token)
    setUser({ username: response.username, userId: response.userId })

    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify({ username: response.username, userId: response.userId }))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }

  if (loading) return <div>Loading...</div>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }