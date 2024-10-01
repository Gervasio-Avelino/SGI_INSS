import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './styles/VisualizarMovimentos.css';
import Menu from './Menu'
import Footer from './Footer'
import BackButton from './BackButton';

const VisualizarMovimentos = () => {
  const [movimentos, setMovimentos] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      const movimentosCollection = collection(db, 'movements');
      const movimentosSnapshot = await getDocs(movimentosCollection);
      const movimentosList = movimentosSnapshot.docs.map(doc => doc.data());
      setMovimentos(movimentosList);
    };

    fetchMovements();
  }, []);

  return (
    <>
    <Menu />
    <Container className="mt-5">
      <BackButton />
      <h2 className="mb-4">Visualizar Movimentos</h2>
      <Row>
        {movimentos.map((movimento, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{movimento.equipamento}</Card.Title>
                <Card.Text>
                  <p><strong>Tipo de Movimento:</strong> {movimento.tipoMovimento}</p> 
                  <p><strong>Quantidade:</strong> {movimento.quantidade} </p> 
                  <p><strong>Data do Movimento:</strong> {movimento.dataMovimento}</p> 
                  <p><strong>Registrado em:</strong> {new Date(movimento.criadoEm.seconds * 1000).toLocaleDateString()}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer />
    </>
  );
};

export default VisualizarMovimentos;
