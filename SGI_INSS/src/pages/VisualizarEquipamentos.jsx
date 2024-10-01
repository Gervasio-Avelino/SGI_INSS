import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./styles/VisualizarEquipamentos.css";
import Menu from "./Menu";
import Footer from "./Footer";
import BackButton from "./BackButton";

const VisualizarEquipamentos = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    numeroSerie: "",
    categoria: "",
    marca: "",
    modelo: "",
    dataAquisicao: "",
    quantidade: "",
    estado: "",
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentsCollection = collection(db, "equipments");
      const equipmentsSnapshot = await getDocs(equipmentsCollection);
      const equipmentsList = equipmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(equipmentsList);
      setFilteredEquipments(equipmentsList);
    };

    fetchEquipments();
  }, []);

  useEffect(() => {
    const results = equipments.filter(
      (equipment) =>
        equipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipments(results);
  }, [searchTerm, equipments]);

  const handleCardClick = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData(equipment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEquipment(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (selectedEquipment) {
      setShowConfirmDelete(true);
    }
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "equipments", selectedEquipment.id));
    setEquipments(
      equipments.filter((equipment) => equipment.id !== selectedEquipment.id)
    );
    handleCloseModal();
    setShowConfirmDelete(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (selectedEquipment) {
      await updateDoc(doc(db, "equipments", selectedEquipment.id), formData);
      setEquipments(
        equipments.map((equipment) =>
          equipment.id === selectedEquipment.id
            ? { ...formData, id: selectedEquipment.id }
            : equipment
        )
      );
      setIsEditing(false);
      handleCloseModal();
    }
  };

  return (
    <>
      <Menu />
      <Container id="container-equipamentos" className="mt-5">
        <h2 className="mb-4">Visualização de Equipamentos</h2>
        <BackButton />
        <Form.Control
          type="text"
          placeholder="Pesquisar por ID, marca, modelo, ou categoria"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Row>
          {filteredEquipments.map((equipment) => (
            <Col key={equipment.id} md={4} className="mb-4">
              <Card onClick={() => handleCardClick(equipment)}>
                <Card.Body>
                  <Card.Title>{equipment.nome}</Card.Title>
                  <Card.Text>
                    <strong>ID:</strong> {equipment.id} <br />
                    <strong>Marca:</strong> {equipment.marca} <br />
                    <strong>Modelo:</strong> {equipment.modelo} <br />
                    <strong>Quantidade:</strong> {equipment.quantidade} <br />
                    <strong>Estado:</strong> {equipment.estado}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEquipment?.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isEditing ? (
              <Form>
                <Form.Group controlId="formNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNumeroSerie" className="mt-3">
                  <Form.Label>Número de Série</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroSerie"
                    value={formData.numeroSerie}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoria" className="mt-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMarca" className="mt-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formModelo" className="mt-3">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDataAquisicao" className="mt-3">
                  <Form.Label>Data de Aquisição</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataAquisicao"
                    value={formData.dataAquisicao}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formQuantidade" className="mt-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEstado" className="mt-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Em Uso">Em Uso</option>
                    <option value="Manutenção">Manutenção</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            ) : (
              <>
                <p>
                  <strong>ID:</strong> {selectedEquipment?.id}
                </p>
                <p>
                  <strong>Número de Série:</strong>{" "}
                  {selectedEquipment?.numeroSerie}
                </p>
                <p>
                  <strong>Categoria:</strong> {selectedEquipment?.categoria}
                </p>
                <p>
                  <strong>Marca:</strong> {selectedEquipment?.marca}
                </p>
                <p>
                  <strong>Modelo:</strong> {selectedEquipment?.modelo}
                </p>
                <p>
                  <strong>Data de Aquisição:</strong>{" "}
                  {selectedEquipment?.dataAquisicao}
                </p>
                <p>
                  <strong>Quantidade:</strong> {selectedEquipment?.quantidade}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedEquipment?.estado}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Fechar
                </Button>
                <Button variant="warning" onClick={handleEditClick}>
                  Editar
                </Button>
                <Button variant="danger" onClick={handleDeleteClick}>
                  Remover
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          show={showConfirmDelete}
          onHide={() => setShowConfirmDelete(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Remoção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tens a certeza que deseja remover este equipamento?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmDelete(false)}
            >
              Não
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default VisualizarEquipamentos;
