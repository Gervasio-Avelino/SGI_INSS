import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './styles/GerenciamentoUsuarios.css';
import Menu from './Menu';
import Footer from './Footer';
import BackButton from './BackButton';

const GerenciamentoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosCollection = collection(db, 'users');
      const usuariosSnapshot = await getDocs(usuariosCollection);
      const usuariosList = usuariosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosList);
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setUsuarios(usuarios.filter(user => user.id !== userToDelete.id));
      setSuccess('Usuário deletado com sucesso!');
    } catch (error) {
      setError('Erro ao deletar usuário: ' + error.message);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentUser(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const userRef = doc(db, 'users', currentUser.id);
      await updateDoc(userRef, currentUser);
      setUsuarios(usuarios.map(user => (user.id === currentUser.id ? currentUser : user)));
      setSuccess('Usuário atualizado com sucesso!');
      setShowEditModal(false);
    } catch (error) {
      setError('Erro ao atualizar usuário: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Menu />
      <Container id="container-gerenciamento-usuarios" className="mt-5">
        <h2 className="mb-4">Gerenciar Utilizadores</h2>
        <BackButton />
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Departamento</th>
              <th>Cargo</th>
              <th>Acções</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(user)}>Editar</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteConfirmation(user)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para Editar Usuário */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Utilizador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentUser?.name || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentUser?.email || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTelefone" className="mt-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={currentUser?.phone || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDepartamento" className="mt-3">
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={currentUser?.department || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCargo" className="mt-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={currentUser?.role || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Confirmação de Exclusão */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tens a certeza que deseja excluir o utilizador?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Não
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default GerenciamentoUsuarios;
