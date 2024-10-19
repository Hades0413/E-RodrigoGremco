import React, { useState } from "react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import GithubIcon from "../components/icons/GithubIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import {
  loginWithEmail,
  loginWithGoogle,
  loginWithGitHub,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", { email, password });

    try {
      const userData = await loginWithEmail(email, password);
      console.log("Inicio de sesión exitoso:", userData);

      if (userData) {
        setCurrentUser(userData);
        Swal.fire({
          title: "Éxito",
          text: `Inicio de sesión exitoso, bienvenido ${userData.nombre}!`,
          icon: "success",
          background: "#000",
          color: "#fff",
        });

        navigate("/home");
        console.log("Redirigiendo a /home");
      } else {
        console.log("No se encontró el usuario.");
        Swal.fire({
          title: "Error",
          text: "Credenciales incorrectas.",
          icon: "error",
          background: "#000",
          color: "#fff",
        });
      }
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
    console.log("Iniciando sesión con Google...");
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      console.log("Inicio de sesión con Google exitoso:", user);

      Swal.fire({
        title: "Bienvenido!",
        text: `Bienvenido ${user.displayName}!`,
        icon: "success",
        background: "#000",
        color: "#fff",
      });

      navigate("/home");
      console.log("Redirigiendo a /home");
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
    console.log("Iniciando sesión con GitHub...");
    try {
      const result = await loginWithGitHub();
      const user = result.user;
      console.log("Inicio de sesión con GitHub exitoso:", user);

      Swal.fire({
        title: "Bienvenido!",
        text: `Bienvenido ${user.displayName || user.email}!`,
        icon: "success",
        background: "#000",
        color: "#fff",
      });

      navigate("/home");
      console.log("Redirigiendo a /home");
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

  const handleRegister = () => {
    console.log("Redirigiendo a la página de registro");
    navigate("/register");
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
          Bienvenido de vuelta
        </h2>
        <form onSubmit={handleLogin} style={{ marginBottom: "24px" }}>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Iniciar sesión
          </button>
        </form>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0 8px",
              backgroundColor: "white",
              position: "relative",
              zIndex: 1,
            }}
          >
            O CONTINÚA CON
          </span>
          <hr
            style={{
              margin: "-9px 0 16px",
              border: "none",
              borderTop: "1px solid #e5e7eb",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={handleGitHubLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <GithubIcon
              style={{ marginRight: "8px", height: "16px", width: "16px" }}
            />
            Github
          </button>
          <button
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <GoogleIcon
              style={{ marginRight: "8px", height: "16px", width: "16px" }}
            />
            Google
          </button>
        </div>
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            textAlign: "center",
            color: "#4f46e5",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          No tienes una cuenta? Regístrate!
        </button>
      </div>
    </div>
  );
}
