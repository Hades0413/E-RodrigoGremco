import React, { useState } from "react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import { loginWithEmail, loginWithGoogle, loginWithGitHub } from "../services/authService";
import { Container, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(correoElectronico, contrasena);
      Swal.fire({
        title: "Éxito",
        text: "Inicio de sesión exitoso",
        icon: "success",
        background: "#000",
        color: "#fff",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      Swal.fire({
        title: "Error",
        text: "Error al iniciar sesión. Verifica tus credenciales.",
        icon: "error",
        background: "#000",
        color: "#fff",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      Swal.fire({
        title: "Bienvenido!",
        text: `Bienvenido ${user.displayName}!`,
        icon: "success",
        background: "#000",
        color: "#fff",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
      Swal.fire({
        title: "Error",
        text: "Error al iniciar sesión con Google.",
        icon: "error",
        background: "#000",
        color: "#fff",
      });
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await loginWithGitHub();
      const user = result.user;
      Swal.fire({
        title: "Bienvenido!",
        text: `Bienvenido ${user.displayName || user.email}!`,
        icon: "success",
        background: "#000",
        color: "#fff",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub: ", error);
      Swal.fire({
        title: "Error",
        text: "Error al iniciar sesión con GitHub.",
        icon: "error",
        background: "#000",
        color: "#fff",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleLogin}>
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
        <Button type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoogleLogin}
          style={{ marginLeft: "10px" }}
        >
          Iniciar Sesión con Google
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleGitHubLogin}
          style={{ marginLeft: "10px" }}
        >
          Iniciar Sesión con GitHub
        </Button>
      </form>
    </Container>
  );
};

export default Login;
