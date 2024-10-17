import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../styles/common/Nav.css";
import logo from "../../assets/img/logo.png";
import { logout } from "../../services/authService";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

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

      <Link to="/" className="nav-logo-container">
        <img src={logo} alt="Logo" className="nav-logo" />
        <span className="nav-logo-text">PLUTÓN</span>
      </Link>

      <div className="nav-right">
        <img src={logo} alt="Logo" className="nav-logo-responsive" />
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/usuarios">usuarios</Link>
          </li>
          <li>
            <Link to="/producto">producto</Link>
          </li>
          <li>
            <Link to="/categoria">categoria</Link>
          </li>
          <li>
            <Link to="/preguntas">Preguntas</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="nav-logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;