import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Alert } from 'react-bootstrap';
import './styles/Login.css';
import logo from '../assets/Logo.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  useEffect(() => {
    // Limpar campos de email e senha quando a página de login for carregada
    setEmail('');
    setPassword('');
  }, [currentUser]);

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'O email inserido é inválido. Por favor, verifique e tente novamente.';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada. Por favor, entre em contato com o suporte.';
      case 'auth/user-not-found':
        return 'Não encontramos uma conta com este email. Por favor, verifique e tente novamente.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Por favor, verifique e tente novamente.';
      case 'auth/invalid-password':
        return 'A senha fornecida é inválida. Deve ter pelo menos 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Falha na conexão de rede. Por favor, verifique sua conexão e tente novamente.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas de login falhadas. Acesso temporariamente desativado. Tente novamente mais tarde.';
      case 'auth/internal-error':
        return 'Ocorreu um erro interno. Por favor, tente novamente mais tarde.';
      case 'auth/weak-password':
        return 'A senha fornecida é muito fraca. Por favor, escolha uma senha mais forte.';
      case 'auth/email-already-in-use':
        return 'O endereço de e-mail já está sendo usado por outra conta.';
      case 'auth/operation-not-allowed':
        return 'O login com email e senha está desativado. Por favor, entre em contato com o suporte.';
      default:
        return 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      const friendlyMessage = getFriendlyErrorMessage(error.code);
      setError(friendlyMessage);
    }
  };

  return (
    <div id='container-login'>
      <div className="login-box p-4 shadow">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2 className="mb-4">Seja bem-vindo(a)</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2"
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="px-4">
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
