import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import CadastroEquipamentos from './pages/CadastroEquipamentos';
import GerenciamentoUsuarios from './pages/GerenciamentoUsuarios';
import RelatoriosFinanceiros from './pages/RelatoriosFinanceiros';
import AuditoriasInternas from './pages/AuditoriasInternas';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
            path="/relatorios-financeiros"
            element={
              <PrivateRoute>
                <RelatoriosFinanceiros />
              </PrivateRoute>
            }
          />
          <Route
            path="/auditorias-internas"
            element={
              <PrivateRoute>
                <AuditoriasInternas />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
