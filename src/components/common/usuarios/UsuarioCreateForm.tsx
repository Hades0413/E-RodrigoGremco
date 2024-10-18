'use client'

import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  createUsuario,
  fetchNextUserId,
  formatFechaRegistro,
} from "../../../services/usuarioService";
import { Usuario } from "../../../services/usuarioService";
import "../../../styles/users/UsuarioCreateForm.css";

interface UsuarioCreateFormProps {
  onUsuarioCreated: () => void;
}

const UsuarioCreateForm: React.FC<UsuarioCreateFormProps> = ({
  onUsuarioCreated,
}) => {
  const [nuevoUsuario, setNuevoUsuario] = useState<
    Omit<Usuario, "id" | "fecha_registro">
  >({
    nombre: "",
    contrasena: "",
    correo_electronico: "",
    direccion_envio: "",
    es_admin: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await fetchNextUserId();
    const usuarioConId = {
      ...nuevoUsuario,
      id,
      fecha_registro: formatFechaRegistro(),
    };
    const success = await createUsuario(usuarioConId);
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: "El usuario se ha creado correctamente.",
        confirmButtonText: "Aceptar",
      });
      onUsuarioCreated();
    } else {
      console.error("Error al crear el usuario.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el usuario.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
   
      <div className="form-group">
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={nuevoUsuario.nombre}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="correo_electronico">Correo Electrónico</label>
        <input
          type="email"
          id="correo_electronico"
          name="correo_electronico"
          required
          value={nuevoUsuario.correo_electronico}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          required
          value={nuevoUsuario.contrasena}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccion_envio">Dirección de Envío</label>
        <input
          type="text"
          id="direccion_envio"
          name="direccion_envio"
          value={nuevoUsuario.direccion_envio}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group-admin checkbox-group">
        <input
          type="checkbox"
          id="es_admin"
          name="es_admin"
          checked={nuevoUsuario.es_admin}
          onChange={handleInputChange}
          className="form-checkbox"
        />
        <label htmlFor="es_admin">Administrador</label>
      </div>
      <button type="submit" className="submit-btn">
        Crear Usuario
      </button>
    </form>
  );
};

export default UsuarioCreateForm;