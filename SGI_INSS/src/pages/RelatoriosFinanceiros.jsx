import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Table, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Menu from './Menu';
import Footer from './Footer';
import './styles/relatorios.css';
import BackButton from './BackButton';

const RelatoriosFinanceiros = () => {
  const [equipments, setEquipments] = useState([]);
  const [movements, setMovements] = useState([]);
  const [removals, setRemovals] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const equipmentsSnapshot = await getDocs(collection(db, 'equipments'));
      const equipmentsList = equipmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEquipments(equipmentsList);
    };

    const fetchMovements = async () => {
      const movementsSnapshot = await getDocs(collection(db, 'movements'));
      const movementsList = movementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMovements(movementsList);
    };

    const fetchRemovals = async () => {
      const removalsSnapshot = await getDocs(collection(db, 'removals'));
      const removalsList = removalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRemovals(removalsList);
    };

    fetchEquipments();
    fetchMovements();
    fetchRemovals();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Visualizar Relatórios', 14, 22);

    doc.autoTable({
      startY: 30,
      head: [['ID', 'Nome', 'Marca', 'Modelo', 'Quantidade', 'Estado']],
      body: equipments.map(equipment => [
        equipment.id, equipment.nome, equipment.marca, equipment.modelo, equipment.quantidade, equipment.estado
      ])
    });

    doc.text('Movimentos Realizados', 14, doc.previousAutoTable.finalY + 10);

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 20,
      head: [['ID', 'Equipamento', 'Tipo de Movimento', 'Quantidade', 'Data do Movimento']],
      body: movements.map(movement => [
        movement.id, movement.equipamento, movement.tipoMovimento, movement.quantidade, movement.dataMovimento
      ])
    });

    doc.text('Remoções Realizadas', 14, doc.previousAutoTable.finalY + 10);

    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 20,
      head: [['ID', 'Equipamento', 'Quantidade', 'Data da Remoção']],
      body: removals.map(removal => [
        removal.id, removal.equipamento, removal.quantidade, removal.dataRemocao
      ])
    });

    doc.save('relatorios_financeiros.pdf');
  };

  return (
    <>
      <Menu />
      <div id="container-relatorio" className="mt-5">
        <h2>Visualizar Relatórios</h2>
        <Button style={{width: '100px'}} className="mb-4" onClick={generatePDF}>Gerar PDF</Button>
        <h3>Equipamentos no Inventário</h3>
        <BackButton />
        <Table striped bordered hover className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Quantidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map(equipment => (
              <tr key={equipment.id}>
                <td>{equipment.id}</td>
                <td>{equipment.nome}</td>
                <td>{equipment.marca}</td>
                <td>{equipment.modelo}</td>
                <td>{equipment.quantidade}</td>
                <td>{equipment.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3>Movimentos Realizados</h3>
        <Table striped bordered hover className="mb-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipamento</th>
              <th>Tipo de Movimento</th>
              <th>Quantidade</th>
              <th>Data do Movimento</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(movement => (
              <tr key={movement.id}>
                <td>{movement.id}</td>
                <td>{movement.equipamento}</td>
                <td>{movement.tipoMovimento}</td>
                <td>{movement.quantidade}</td>
                <td>{movement.dataMovimento}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3>Remoções Realizadas</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipamento</th>
              <th>Quantidade</th>
              <th>Data da Remoção</th>
            </tr>
          </thead>
          <tbody>
            {removals.map(removal => (
              <tr key={removal.id}>
                <td>{removal.id}</td>
                <td>{removal.equipamento}</td>
                <td>{removal.quantidade}</td>
                <td>{removal.dataRemocao}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default RelatoriosFinanceiros;
