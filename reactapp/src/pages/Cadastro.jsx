import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const { cadastrarUsuario } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica dos campos
    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      return setErro('Todos os campos são obrigatórios');
    }
    
    try {
      setErro('');
      setLoading(true);
      await cadastrarUsuario(email, senha, nome, sobrenome, dataNascimento);
      navigate('/principal');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está em uso');
      } else if (error.code === 'auth/weak-password') {
        setErro('A senha deve ter pelo menos 6 caracteres');
      } else {
        setErro('Falha ao criar a conta. Por favor, tente novamente.');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Cadastro de Usuário</h2>
        
        {erro && <div className="error-message">{erro}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input
              type="text"
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="button-primary" 
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
}