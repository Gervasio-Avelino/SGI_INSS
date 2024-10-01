import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import Menu from './Menu';
import Footer from './Footer';
import BackButton from './BackButton';

const VisualizarRemocoes = () => {
  const [removals, setRemovals] = useState([]);
  const [selectedRemoval, setSelectedRemoval] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRemovals = async () => {
      const removalsCollection = collection(db, 'removals');
      const removalsSnapshot = await getDocs(removalsCollection);
      const removalsList = removalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRemovals(removalsList);
    };

    fetchRemovals();
  }, []);

  const handleCardClick = (removal) => {
    setSelectedRemoval(removal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRemoval(null);
  };

  return (
    <>
      <Menu />
      <Container style={{minHeight: '100vh'}} id='container-remocoes' className="mt-5">
        <h2 className="mb-4">Visualização de Remoções</h2>
        <BackButton />
        <Row>
          {removals.map((removal) => (
            <Col key={removal.id} md={4} className="mb-4">
              <Card onClick={() => handleCardClick(removal)}>
                <Card.Body>
                  <Card.Title>{removal.nomeEquipamento}</Card.Title>
                  <Card.Text>
                    <strong>ID do Equipamento:</strong> {removal.equipamentoId} <br />
                    <strong>ID do Funcionário:</strong> {removal.funcionarioId} <br />
                    <strong>Data da Remoção:</strong> {removal.dataRemocao} <br />
                    <strong>Motivo da Remoção:</strong> {removal.motivoRemocao} <br />
                    <strong>Observação:</strong> {removal.observacao} <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes da Remoção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRemoval && (
              <>
                <p><strong>ID da Remoção:</strong> {selectedRemoval.id}</p>
                <p><strong>ID do Equipamento:</strong> {selectedRemoval.equipamentoId}</p>
                <p><strong>ID do Funcionário:</strong> {selectedRemoval.funcionarioId}</p>
                <p><strong>Data da Remoção:</strong> {selectedRemoval.dataRemocao}</p>
                <p><strong>Motivo da Remoção:</strong> {selectedRemoval.motivoRemocao}</p>
                <p><strong>Observação:</strong> {selectedRemoval.observacao}</p>
                <p><strong>Destino:</strong> {selectedRemoval.destino}</p>
                {selectedRemoval.file && (
                  <p>
                    <strong>Arquivo:</strong> 
                    <a href={selectedRemoval.fileURL} target="_blank" rel="noopener noreferrer">
                      {selectedRemoval.file}
                    </a>
                  </p>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default VisualizarRemocoes;
