import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import './styles/Dashboard.css';
import Footer from './Footer';
import Menu from './Menu';
import profilePic from '../assets/2606517_5856.png';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    role: '',
    phone: '',
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const info = await fetchUserInfo(currentUser.uid);
      setUserInfo(info);
    };

    getUserInfo();
  }, [currentUser]);

  const fetchUserInfo = async (uid) => {
    const userDoc = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return {
        id: uid,
        name: userData.name,
        email: userData.email,
        department: userData.department,
        role: userData.role,
        phone: userData.phone,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutConfirmation(false);
    await logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const getServices = (role, department, isAdmin) => {
    // Sequência ajustada conforme a primeira imagem
    const services = [];

    if (isAdmin) {
      services.push(
        { title: 'Cadastro de Equipamentos', link: '/cadastro-equipamentos' },
        { title: 'Visualizar Equipamentos', link: '/visualizar-equipamentos' },
        { title: 'Movimentar Equipamentos', link: '/gerenciar-movimentos' },
        { title: 'Visualizar Movimentos', link: '/visualizar-movimentos' },
        { title: 'Visualizar Remoções', link: '/visualizar-remocoes' },
        { title: 'Visualizar Relatórios', link: '/relatorios-financeiros' },
        { title: 'Gerir Utilizadores', link: '/gerenciamento-usuarios' }
      );
    } else {
      if (department === 'DI') {
        services.push(
          { title: 'Cadastro de Equipamentos', link: '/cadastro-equipamentos' },
          { title: 'Visualizar Equipamentos', link: '/visualizar-equipamentos' },
          { title: 'Movimentar Equipamentos', link: '/gerenciar-movimentos' },
          { title: 'Visualizar Movimentos', link: '/visualizar-movimentos' },
          { title: 'Visualizar Remoções', link: '/visualizar-remocoes' },
          { title: 'Visualizar Relatórios', link: '/relatorios-financeiros' },
          { title: 'Gerir Utilizadores', link: '/gerenciamento-usuarios' }
        );
      }

      if (department === 'DAG') {
        services.push(
          { title: 'Visualizar Equipamentos', link: '/visualizar-equipamentos' },
          { title: 'Visualizar Movimentos', link: '/visualizar-movimentos' },
          { title: 'Visualizar Remoções', link: '/visualizar-remocoes' },
          { title: 'Visualizar Relatórios', link: '/relatorios-financeiros' }
        );
      }

      if (department === 'DAI') {
        services.push(
          { title: 'Visualizar Equipamentos', link: '/visualizar-equipamentos' },
          { title: 'Visualizar Movimentos', link: '/visualizar-movimentos' },
          { title: 'Visualizar Remoções', link: '/visualizar-remocoes' },
          { title: 'Visualizar Relatórios', link: '/relatorios-financeiros' }
        );
      }
    }

    return services;
  };

  const services = getServices(userInfo.role, userInfo.department, currentUser.isAdmin);

  return (
    <>
      <Menu onLogout={handleLogoutClick} />
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={profilePic} />
              <Card.Body>
                <Card.Title>Perfil</Card.Title>
                <Card.Text>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>ID:</strong> {userInfo.id}</p>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>Nome:</strong> {userInfo.name}</p>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>Email:</strong> {userInfo.email}</p>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>Telefone:</strong> {userInfo.phone}</p>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>Departamento:</strong> {userInfo.department}</p>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}><strong style={{color: 'black'}}>Cargo:</strong> {userInfo.role}</p>
                </Card.Text>
                {currentUser.isAdmin && (
                  <Button variant="primary" href="/register">
                    Registar Utilizador
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Row>
              {services.map((service, index) => (
                <Col key={index} md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{service.title}</Card.Title>
                      <Button variant="primary" href={service.link}>
                        Acessar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Modal de Confirmação de Logout */}
      <Modal show={showLogoutConfirmation} onHide={handleCancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja sair?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
