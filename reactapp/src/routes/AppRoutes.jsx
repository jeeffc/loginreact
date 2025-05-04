import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';
import NavBar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          {/* Rota Padrão - Redireciona para Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          {/* Rota Protegida */}
          <Route 
            path="/principal" 
            element={
              <ProtectedRoute>
                <Principal />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota para URLs não encontradas */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}