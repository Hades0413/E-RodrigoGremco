import React from 'react';
import '../styles/common/Goats.css';
import goatClaudia from '../assets/img/goatClaudia.png'
import goatAdriana from '../assets/img/goatAdriana.png'
import goatMiguel from '../assets/img/goatMiguel.png'
import goatMarcelo from '../assets/img/goatMarcelo.png'
import goatLeder from '../assets/img/goatLeder.png'
import goatLoco from '../assets/img/goatLoco.png'

interface ColaboradorProps {
  nombre: string;
  apodo: string;
  rol: string;
  email: string;
  imagen: string;
  esLider?: boolean;
}

const iconos = {
  "Magaly la firme": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M3 17V19H9V17H3M3 5V7H13V5H3M13 21V19H21V17H13V15H11V21H13M7 9V11H3V13H7V15H9V9H7M21 13V11H11V13H21M15 9H17V7H21V5H17V3H15V9Z" />
    </svg>
  ),
  "Carreador de espaldas": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M12,3C10.73,3 9.6,3.8 9.18,5H3V7H4.95L2,14C1.53,16 3,17 5.5,17C8,17 9.56,16 9,14L6.05,7H9.17C9.5,7.85 10.15,8.5 11,8.83V20H2V22H22V20H13V8.82C13.85,8.5 14.5,7.85 14.82,7H17.95L15,14C14.53,16 16,17 18.5,17C21,17 22.56,16 22,14L19.05,7H21V5H14.83C14.4,3.8 13.27,3 12,3M12,5A1,1 0 0,1 13,6A1,1 0 0,1 12,7A1,1 0 0,1 11,6A1,1 0 0,1 12,5M5.5,10.25L7,14H4L5.5,10.25M18.5,10.25L20,14H17L18.5,10.25Z" />
    </svg>
  ),
  "bautista": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" />
    </svg>
  ),
  "caza chicas 3000": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
    </svg>
  ),
  "LEDER": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
    </svg>
  ),
  "Loco": (
    <svg viewBox="0 0 24 24" className="icon">
      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
    </svg>
  )
};

const ColaboradorCard: React.FC<ColaboradorProps> = ({ nombre, apodo, rol, email, imagen, esLider }) => {
  return (
    <div className={`card ${esLider ? 'card-lider' : ''}`}>
      <div className="imageContainer">
        <img src={imagen} alt={nombre} className="image" />
      </div>
      <div className="content">
        <h2 className="name">{nombre}</h2>
        <p className="nickname">{apodo}</p>
        <div className="role">
          {iconos[apodo as keyof typeof iconos]}
          <span>{rol}</span>
        </div>
        <p className="email">{email}</p>
      </div>
    </div>
  );
};

const Goats: React.FC = () => {
  const colaboradores: ColaboradorProps[] = [
    { nombre: "Adriana Casas", apodo: "Magaly la firme", rol: "Diseñadora UX/UI", email: "adriana@goat.com", imagen: goatAdriana },
    { nombre: "HADES0413", apodo: "Carreador de espaldas", rol: "Desarrollador Full Stack", email: "hades0413@goat.com", imagen: goatMiguel },
    { nombre: "Claudia Sifuentes", apodo: "Bautista", rol: "Desarrolladora FrontEnd", email: "claudia@goat.com", imagen: goatClaudia },
    { nombre: "Marcelo Liendo", apodo: "Caza chicas 3000", rol: "Arquitecto de Software", email: "marcelo@goat.com", imagen: goatMarcelo },
    { nombre: "Jorge Fabrizio Olano Farfán 26", apodo: "LEDER", rol: "LEDER del equipo SAU", email: "rodrigogremco@goat.com", imagen: goatLeder, esLider: true },
    { nombre: "Leonardo Quezada", apodo: "Loco", rol: "DBA", email: "leonardo@goat.com", imagen: goatLoco },
  ];

  // Reordenar los colaboradores para que el líder esté en la segunda posición
  const colaboradoresOrdenados = [
    colaboradores[0],
    colaboradores.find(c => c.esLider),
    ...colaboradores.filter((c, index) => index !== 0 && !c.esLider)
  ].filter((c): c is ColaboradorProps => c !== undefined);

  return (
    <div className="container">
      <div className="row">
        {colaboradoresOrdenados.slice(0, 3).map((colaborador, index) => (
          <ColaboradorCard key={index} {...colaborador} />
        ))}
      </div>
      <div className="row">
        {colaboradoresOrdenados.slice(3).map((colaborador, index) => (
          <ColaboradorCard key={index + 3} {...colaborador} />
        ))}
      </div>
    </div>
  );
}

export default Goats;