import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-accent shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-white transition-colors duration-200">
            <h2>Parque Aeroporto</h2>
          </Link>
        </div>
        <ul className="flex space-x-8 font-semibold">
          <li><Link to="/" className="hover:text-white transition-colors duration-200">Parques</Link></li>
          <li><Link to="/favoritos" className="hover:text-white transition-colors duration-200">Favoritos</Link></li>
          <li><Link to="/reservas" className="hover:text-white transition-colors duration-200">Reservas</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;