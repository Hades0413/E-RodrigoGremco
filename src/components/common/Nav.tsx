import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/common/Nav.css";
import mascota from "../../assets/img/mascota.png";
import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Home, Package, Users, FolderTree, HelpCircle, Trophy, LogOut } from 'lucide-react';

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  // Convertir el valor de isAdmin a número y compararlo
  const isAdmin = currentUser ? currentUser.es_admin : false;

  return (
    <nav className="nav-container">
      <input type="checkbox" id="nav-sidebar-active" />
      <label htmlFor="nav-sidebar-active" className="nav-open-sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M3 6h18v2H3V6zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
        </svg>
      </label>

      <label htmlFor="nav-sidebar-active" className="nav-close-sidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 0 24 24"
          width="32"
        >
          <path
            d="M19 6L6 19M6 6l13 13"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </label>

      <Link to="/home" className="nav-logo-container">
        <img src={mascota} alt="Logo" className="nav-logo" />
        <span className="nav-logo-text">RODRIGO GREMCO</span>
      </Link>

      <div className="nav-right">
        <img
          loading="lazy"
          src={mascota}
          alt="Logo"
          className="nav-logo-responsive"
        />
        <ul className="nav-links">
          <li>
            <Link to="/home"><Home size={20} className="nav-icon" /> Home</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/producto"><Package size={20} className="nav-icon" /> Producto</Link>
              </li>
              <li>
                <Link to="/usuarios"><Users size={20} className="nav-icon" /> Usuarios</Link>
              </li>
              <li>
                <Link to="/categoria"><FolderTree size={20} className="nav-icon" /> Categoría</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/preguntas"><HelpCircle size={20} className="nav-icon" /> Preguntas</Link>
          </li>
          <li>
            <Link to="/goats"><Trophy size={20} className="nav-icon" /> Goats</Link>
          </li>
          {currentUser && (
            <li className="nav-user-container">
              <span className="nav-user-name">
                {currentUser.displayName || currentUser.nombre || "Usuario"}
              </span>
              <span className={`nav-user-badge ${isAdmin ? 'admin' : 'platinum'}`}>
                {isAdmin ? 'ADMIN' : 'PLATINIUM'}
              </span>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className="nav-logout-button">
              <LogOut size={20} className="nav-icon" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;