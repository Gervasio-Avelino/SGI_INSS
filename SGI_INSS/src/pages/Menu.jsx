import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './styles/menu.css';
import logo from '../assets/Logo.webp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Menu = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Defina os cargos permitidos para cada serviço
  const services = [
    { path: '/cadastro-equipamentos', label: 'Cadastro de Equipamentos', roles: ['Administrador', 'Gerente'] },
    { path: '/gerenciamento-usuarios', label: 'Gerenciamento de Usuários', roles: ['Administrador'] },
    { path: '/relatorios-financeiros', label: 'Relatórios Financeiros', roles: ['Administrador', 'Gerente', 'Analista de Sistema'] },
    { path: '/visualizar-equipamentos', label: 'Visualizar Equipamentos', roles: ['Técnico', 'Supervisor', 'Gerente'] },
    { path: '/visualizar-movimentos', label: 'Visualizar Movimentos', roles: ['Técnico', 'Supervisor'] },
    { path: '/gerenciar-movimentos', label: 'Gerenciar Movimentos', roles: ['Gerente'] },
  ];

  return (
    <>
      <Navbar id="header" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/Dashboard">Página Principal</Nav.Link>
            <NavDropdown title="Serviços" id="basic-nav-dropdown">
              {services.map(service => (
                currentUser && service.roles.includes(currentUser.role) && (
                  <NavDropdown.Item key={service.path} href={service.path}>
                    <p>{service.label}</p>
                  </NavDropdown.Item>
                )
              ))}
            </NavDropdown>
            <Nav.Link onClick={() => setShowLogoutModal(true)}>Terminar Sessão</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand id="logo" href="#" onClick={() => navigate('/Dashboard')}>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
      </Navbar>

      {/* Modal de confirmação de logout */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem a certeza de que deseja terminar a sessão?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Sim, Terminar Sessão
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Menu;
