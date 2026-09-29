const Footer = () => {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-accent/80 py-6 text-center mt-auto shadow-inner">
      <p>&copy; {anoAtual} Parque Aeroporto. Plataforma de reservas.</p>
    </footer>
  );
};

export default Footer;