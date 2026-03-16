import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #1a1d23;
  border-bottom: 2px solid #6c5ce7;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, #6c5ce7, #00b894);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  color: #dfe6e9;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2d3436;
    color: #00b894;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Logo to="/">Level Sync</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </NavLinks>
    </Nav>
  );
}