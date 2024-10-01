import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';
import Footer from './Footer';
import Menu from './Menu';
import BackButton from './BackButton';
import Loader from './Loader';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Definindo os cargos permitidos
  const roles = {
    TAG: ['Técnico Administrativo & Contador', 'Administrador'],
    TAI: ['Auditor de Controle Interno'],
    TDI: ['Analista de Sistema', 'Suporte Técnico', 'Desenvolvedor', 'Administrador de Base de Dados', 'Técnico Informático'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação de telefone
    const phonePattern = /^[0-9]{7,9}$/;
    if (!phonePattern.test(phone.replace(/\s+/g, ''))) {
      setError('Por favor, insira um número de telefone válido com 7 a 9 dígitos.');
      setLoading(false);
      return;
    }

    try {
      if (!name || !email || !password || !department || !role || !phone) {
        setError('Por favor, preencha todos os campos.');
        setLoading(false);
        return;
      }

      await register(name, email, password, role, department, phone);
      setLoading(false);
      navigate('/login'); // Redirecionar para a página de login
    } catch (error) {
      setError('Erro ao registar usuário: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Menu />
      <Container id="container-register" className="d-flex flex-column align-items-center justify-content-center">
        <BackButton />
        {loading && <Loader />}
        <div className="register-box p-4 shadow">
          <div className="text-center mb-4">
            <h2 className="mb-4">Registar</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
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
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-2"
              />
            </Form.Group>
            <Form.Group controlId="formDepartment" className="mt-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                as="select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="p-2"
              >
                <option value="">Selecione...</option>
                <option value="DI">Departamento de Informática</option>
                <option value="DAG">Departamento de Administração Geral</option>
                <option value="DAI">Departamento de Auditoria Interna</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="p-2"
              >
                <option value="">Selecione um cargo</option>
                {Object.entries(roles).map(([key, roleOptions]) =>
                  roleOptions.map((role, index) => (
                    <option key={index} value={`${key} - ${role}`}>
                      {role}
                    </option>
                  ))
                )}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="px-4"
              >
                Registar Utilizador
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
