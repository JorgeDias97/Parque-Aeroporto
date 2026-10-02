import styles from './Footer.module.css';

const Footer = () => {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <p>&copy; {anoAtual} Parque Aeroporto. Plataforma de reservas.</p>
    </footer>
  );
};

export default Footer;