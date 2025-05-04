import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Principal() {
  const { currentUser, userData, buscarDadosUsuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !userData) {
      buscarDadosUsuario(currentUser.uid);
    }
  }, [currentUser, userData, buscarDadosUsuario]);

  // Função para formatar a data de nascimento
  const formatarData = (dataString) => {
    if (!dataString) return '';
    
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="page-container">
      <div className="user-profile">
        <h2>Bem-vindo à Página Principal</h2>
        
        {userData ? (
          <div className="user-data">
            <h3>Seus Dados</h3>
            
            <div className="data-item">
              <span className="data-label">Nome:</span>
              <span className="data-value">{userData.nome}</span>
            </div>
            
            <div className="data-item">
              <span className="data-label">Sobrenome:</span>
              <span className="data-value">{userData.sobrenome}</span>
            </div>
            
            <div className="data-item">
              <span className="data-label">Data de Nascimento:</span>
              <span className="data-value">{formatarData(userData.dataNascimento)}</span>
            </div>
            
            <div className="data-item">
              <span className="data-label">E-mail:</span>
              <span className="data-value">{userData.email}</span>
            </div>
          </div>
        ) : (
          <p>Carregando dados do usuário...</p>
        )}
      </div>
    </div>
  );
}