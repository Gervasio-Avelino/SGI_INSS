import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import CadastroEquipamentos from './pages/CadastroEquipamentos';
import GerenciamentoUsuarios from './pages/GerenciamentoUsuarios';
import RelatoriosFinanceiros from './pages/RelatoriosFinanceiros';
import VisualizarEquipamentos from './pages/VisualizarEquipamentos';
import GerenciarMovimentos from './pages/GerenciarMovimentos';
import VisualizarMovimentos from './pages/VisualizarMovimentos';
import { useState, useEffect } from 'react';
import Loader from './pages/Loader'; // Importe o componente Loader
import VisualizarRemocoes from './pages/VizualizarRemocoes';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => setLoading(false);
    // Simule um carregamento inicial de 3 segundos
    setTimeout(handleLoading, 3000);

    return () => {
      handleLoading();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/cadastro-equipamentos"
              element={
                <PrivateRoute>
                  <CadastroEquipamentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/gerenciamento-usuarios"
              element={
                <PrivateRoute>
                  <GerenciamentoUsuarios />
                </PrivateRoute>
              }
            />
            <Route
  path="/visualizar-remocoes"
  element={
    <PrivateRoute>
      <VisualizarRemocoes />
    </PrivateRoute>
  }
/>
            <Route
              path="/relatorios-financeiros"
              element={
                <PrivateRoute>
                  <RelatoriosFinanceiros />
                </PrivateRoute>
              }
            />
            <Route
              path="/visualizar-equipamentos"
              element={
                <PrivateRoute>
                  <VisualizarEquipamentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/gerenciar-movimentos"
              element={
                <PrivateRoute>
                  <GerenciarMovimentos />
                </PrivateRoute>
              }
            />
            <Route
              path="/visualizar-movimentos"
              element={
                <PrivateRoute>
                  <VisualizarMovimentos />
                </PrivateRoute>
              }
            />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
