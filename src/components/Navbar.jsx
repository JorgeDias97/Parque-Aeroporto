import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const classeLink = ({ isActive }) =>
    `${styles.navItem} ${isActive ? styles.navItemActive : ''}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLink}>
            Parque Aeroporto
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li><NavLink to="/" end className={classeLink}>Parques</NavLink></li>
          <li><NavLink to="/favoritos" className={classeLink}>Favoritos</NavLink></li>
          <li><NavLink to="/reservas" className={classeLink}>Reservas</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;