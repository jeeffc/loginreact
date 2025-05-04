import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }
  
  return children;
}