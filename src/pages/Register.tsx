import React, { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(
        nombre,
        correoElectronico,
        contrasena,
        direccionEnvio,
        false
      );
      Swal.fire({
        title: "Éxito",
        text: "Usuario registrado exitosamente",
        icon: "success",
        background: "#000",
        color: "#fff",
      });
      setNombre("");
      setCorreoElectronico("");
      setContrasena("");
      setDireccionEnvio("");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario: ", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el usuario.",
        icon: "error",
        background: "#000",
        color: "#fff",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Registrarse
        </h2>
        <form onSubmit={handleRegistro} style={{ marginBottom: "24px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Dirección de Envío
          </label>
          <input
            type="text"
            placeholder="Dirección de Envío"
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            textAlign: "center",
            color: "#4f74e5",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ¿Ya tienes una cuenta? Inicia sesión!
        </button>
      </div>
    </div>
  );
};

export default Register;
