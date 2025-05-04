import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Firebase App
        </Link>
        <div className="nav-menu">
          {currentUser ? (
            <>
              <Link to="/principal" className="nav-link">
                Principal
              </Link>
              <button onClick={handleLogout} className="nav-button">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/cadastro" className="nav-link">
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}