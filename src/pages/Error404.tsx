import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight } from 'lucide-react';
import "../styles/Error404.css";
import errorImage from "../assets/img/error404.png";

const Error404: React.FC = () => {
  return (
    <div className="error-404-container">
      <nav className="error-nav">
        <div className="error-nav__logo">
          <Link className="error-link" to="/">
            <Home size={24} strokeWidth={1.5} />
            RODRIGO GREMCO
          </Link>
        </div>
      </nav>

      <div className="error-content">
        <div className="error-left">
          <img 
            loading="lazy" 
            src={errorImage} 
            alt="404 illustration" 
            className="error-image"
          />
        </div>

        <div className="error-right">
          <h1 className="error-title">404</h1>
          <h2 className="error-subtitle">¡Página No Encontrada!</h2>
          <p className="error-message">
            Lo sentimos, no pudimos encontrar la página que buscas. 
            Te invitamos a volver al inicio para continuar explorando.
          </p>
          <Link to="/" className="error-home-button">
            IR A INICIO
            <ArrowRight size={20} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;