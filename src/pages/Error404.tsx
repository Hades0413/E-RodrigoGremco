import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error404.css";
import errorImage from "../assets/img/error404.png";

const Error404: React.FC = () => {
  return (
    <div className="error-404-container">
      <nav className="error-nav">
        <div className="error-nav__logo">
          <Link className="error-link" to="/home">
            RODRIGO GREMCO
          </Link>
        </div>
      </nav>

      <div className="error-404-content">
        <div className="error-header">
          <h1 className="error-title">404</h1>
          <h3 className="error-subtitle">¡Página No Encontrada!</h3>
        </div>
        <img loading="lazy" src={errorImage} alt="not found" className="error-image" />
        <div className="error-footer">
          <p className="error-message">
            Lo sentimos, la página que solicitaste no pudo ser encontrada. ¡Por
            favor, vuelve a la página principal!
          </p>
          <Link to="/home" className="error-home-button">
            IR A INICIO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
