import React, { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../services/authService";
import { Button, TextField, Typography, Container } from "@mui/material";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(
        nombre,
        correoElectronico,
        contrasena,
        direccionEnvio,
        false // Por defecto, el usuario no es admin
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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Registrarse
      </Typography>
      <form onSubmit={handleRegistro}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <TextField
          label="Dirección de Envío"
          variant="outlined"
          fullWidth
          margin="normal"
          value={direccionEnvio}
          onChange={(e) => setDireccionEnvio(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default Register;
