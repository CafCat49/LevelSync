import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Nav>
      <Logo to="/">Level Sync</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <Username>Hi, {user?.username}</Username>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2d3436;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #6c5ce7, #00b894);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #6c5ce7;
  }
`

const Username = styled.span`
  color: #00b894;
  font-weight: 500;
`

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`

export default Navbar