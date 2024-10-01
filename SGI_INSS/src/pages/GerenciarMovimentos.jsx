import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Menu from './Menu';
import Footer from './Footer';
import BackButton from './BackButton';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';

const GerenciarMovimentos = () => {
  const [equipments, setEquipments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [tipoMovimento, setTipoMovimento] = useState('Entrada');
  const [dataMovimento, setDataMovimento] = useState('');
  const [observacao, setObservacao] = useState('');
  const [destinoOrigem, setDestinoOrigem] = useState('');
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentsCollection = collection(db, 'equipments');
      const equipmentsSnapshot = await getDocs(equipmentsCollection);
      const equipmentsList = equipmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentsList);
    };

    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'employees');
      const employeesSnapshot = await getDocs(employeesCollection);
      const employeesList = employeesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeesList);

      // Selecionar automaticamente o funcionário atual
      const currentEmployee = employeesList.find(
        (emp) => emp.email === currentUser.email
      );
      if (currentEmployee) {
        setSelectedEmployee(currentEmployee.id);
      }
    };

    fetchEquipments();
    fetchEmployees();
  }, [currentUser.email]);

  const handleMovement = async () => {
    if (!selectedEquipment || !selectedEmployee || !dataMovimento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const movimentoId = uuidv4();
      await addDoc(collection(db, 'movements'), {
        id: movimentoId,
        equipamentoId: selectedEquipment,
        funcionarioId: selectedEmployee,
        tipoMovimento,
        dataMovimento: dataMovimento || new Date().toISOString().split('T')[0],
        observacao,
        destinoOrigem,
        file: file ? file.name : null,
        criadoEm: new Date(),
      });
      // Limpar os campos após o registro
      setSelectedEquipment('');
      setTipoMovimento('Entrada');
      setDataMovimento('');
      setObservacao('');
      setDestinoOrigem('');
      setFile(null);
      alert('Movimento registrado com sucesso.');
    } catch (error) {
      console.error('Erro ao registrar movimento: ', error);
      alert('Erro ao registrar movimento: ' + error.message);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Menu />
      <Container className="mt-5">
        <h2 className="mb-4 text-center">Gerenciar Movimentos</h2>
        <BackButton />
        <Card className="p-4 mt-4">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEquipment">
                  <Form.Label>Equipamento</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                  >
                    <option value="">Selecione um equipamento</option>
                    {equipments.map((equipment) => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmployee">
                  <Form.Label>Funcionário</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    disabled
                  >
                    <option value="">Selecione um funcionário</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formTipoMovimento">
                  <Form.Label>Tipo de Movimento</Form.Label>
                  <Form.Control
                    as="select"
                    value={tipoMovimento}
                    onChange={(e) => setTipoMovimento(e.target.value)}
                  >
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDataMovimento">
                  <Form.Label>Data do Movimento</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataMovimento}
                    onChange={(e) => setDataMovimento(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="formObservacao">
                  <Form.Label>Observação</Form.Label>
                  <Form.Control
                    type="text"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDestinoOrigem">
                  <Form.Label>Destino ou Origem</Form.Label>
                  <Form.Control
                    type="text"
                    value={destinoOrigem}
                    onChange={(e) => setDestinoOrigem(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12}>
                <Form.Group controlId="formFileUpload">
                  <Form.Label>Guia de Entrada ou Saída</Form.Label>
                  <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="mt-4"
              onClick={handleMovement}
            >
              Registar Movimento
            </Button>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default GerenciarMovimentos;
