import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";
import {
  createUsuario,
  fetchNextUserId,
  formatFechaRegistro,
} from "../../../services/usuarioService";
import { Usuario } from "../../../services/usuarioService";

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
    >
      <h1>Crear Usuario</h1>
      <TextField
        name="nombre"
        label="Nombre Completo"
        variant="outlined"
        required
        value={nuevoUsuario.nombre}
        onChange={handleInputChange}
      />
      <TextField
        name="correo_electronico"
        label="Correo Electrónico"
        variant="outlined"
        required
        value={nuevoUsuario.correo_electronico}
        onChange={handleInputChange}
      />
      <TextField
        name="contrasena"
        label="Contraseña"
        variant="outlined"
        required
        value={nuevoUsuario.contrasena}
        onChange={handleInputChange}
      />
      <TextField
        name="direccion_envio"
        label="Dirección de Envío"
        variant="outlined"
        value={nuevoUsuario.direccion_envio}
        onChange={handleInputChange}
      />
      <label>
        <input
          type="checkbox"
          name="es_admin"
          checked={nuevoUsuario.es_admin}
          onChange={handleInputChange}
        />
        Administrador
      </label>
      <Button type="submit" variant="contained" color="primary">
        Crear Usuario
      </Button>
    </Box>
  );
};

export default UsuarioCreateForm;
