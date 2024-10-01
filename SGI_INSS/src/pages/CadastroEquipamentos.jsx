import { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './styles/CadastroEquipamentos.css';
import Menu from './Menu';
import Footer from './Footer';
import BackButton from './BackButton';

const CadastroEquipamentos = () => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [dataAquisicao, setDataAquisicao] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [estado, setEstado] = useState('Disponível');
  const [descricao, setDescricao] = useState(''); // Novo campo para descrição
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const gerarNumeroSerie = () => {
    return 'NS-' + Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !categoria || !marca || !modelo || !dataAquisicao || !quantidade || !estado) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const numeroSerie = gerarNumeroSerie();

      await addDoc(collection(db, 'equipments'), {
        nome,
        numeroSerie,
        categoria,
        marca,
        modelo,
        dataAquisicao,
        quantidade,
        estado,
        descricao, // Adicionando descrição ao banco de dados
        criadoEm: new Date(),
      });
      setSuccess('Equipamento cadastrado com sucesso!');
      setNome('');
      setCategoria('');
      setMarca('');
      setModelo('');
      setDataAquisicao('');
      setQuantidade(1);
      setEstado('Disponível');
      setDescricao(''); // Limpar o campo de descrição
    } catch (error) {
      setError('Erro ao cadastrar equipamento: ' + error.message);
    }
  };

  return (
    <>
      <Menu />
      <Container id="container-cadastro-equipamentos" className="d-flex flex-column align-items-center justify-content-center">
        <BackButton style={{ margin: '20px' }} />
        <div className="cadastro-equipamentos-box p-4 shadow">
          <div className="text-center mb-4">
            <h2 className="mb-4">Cadastro de Equipamentos</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formNome">
                  <Form.Label>Nome do Equipamento</Form.Label>
                  <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="p-2" />
                </Form.Group>
                <Form.Group controlId="formCategoria" className="mt-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control as="select" value={categoria} onChange={(e) => setCategoria(e.target.value)} required className="p-2">
                    <option value="">Selecione...</option>
                    <option value="Computador">Computador</option>
                    <option value="Impressora">Impressora</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Teclado">Teclado</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Outro">Outro</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMarca" className="mt-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required className="p-2" />
                </Form.Group>
                <Form.Group controlId="formDataAquisicao" className="mt-3">
                  <Form.Label>Data de Aquisição</Form.Label>
                  <Form.Control type="date" value={dataAquisicao} onChange={(e) => setDataAquisicao(e.target.value)} required className="p-2" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formModelo">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required className="p-2" />
                </Form.Group>
                <Form.Group controlId="formQuantidade" className="mt-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required min="1" className="p-2" />
                </Form.Group>
                <Form.Group controlId="formEstado" className="mt-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control as="select" value={estado} onChange={(e) => setEstado(e.target.value)} required className="p-2">
                    <option value="Disponível">Disponível</option>
                    <option value="Em Uso">Em Uso</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Descartado">Descartado</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formDescricao" className="mt-3">
                  <Form.Label>Descrição do Equipamento</Form.Label>
                  <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="p-2" />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <Button style={{ width: '200px' }} variant="primary" type="submit" className="px-4">
                Cadastrar Equipamento
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CadastroEquipamentos;
