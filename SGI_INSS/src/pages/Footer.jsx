import './styles/menu.css';

const Footer = () => {
  return (
    <footer id="footer">
      <ul>
        <li><a href="/Dashboard">Menu</a></li>
        <li><a href="#" onClick={() => window.location.href = '/logout'}>Terminar Sessão</a></li>
        <li><a href="https://www.inss.gov.mz/" target="_blank" rel="noopener noreferrer">INSS</a></li>
      </ul>
      <p id="copiright"> &copy; Todos os direitos reservados ao Instituto Nacional de Segurança Social</p>
    </footer>
  );
};

export default Footer;
