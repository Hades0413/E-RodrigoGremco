import React, { useEffect, useState } from "react";
import {
  Usuario,
  fetchUsuarioByFirebaseDocId,
  updateUsuario,
} from "../../../services/usuarioService";
import Swal from "sweetalert2";

interface UsuarioEditFormProps {
  firebaseDocId: string;
  onUsuarioUpdated: (updatedUsuario: Usuario) => void;
  onClose: () => void;
}

const UsuarioEditForm: React.FC<UsuarioEditFormProps> = ({
  firebaseDocId,
  onUsuarioUpdated,
  onClose,
}) => {
  const [usuario, setUsuario] = useState<Partial<Usuario>>({
    nombre: "",
    correo_electronico: "",
    direccion_envio: "",
    es_admin: false,
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      const fetchedUsuario = await fetchUsuarioByFirebaseDocId(firebaseDocId);
      if (fetchedUsuario) {
        setUsuario(fetchedUsuario);
      }
    };
    fetchUsuario();
  }, [firebaseDocId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUsuario(firebaseDocId, usuario);
      const updatedUsuario: Usuario = {
        id: usuario.id ?? 0,
        nombre: usuario.nombre ?? "",
        correo_electronico: usuario.correo_electronico ?? "",
        direccion_envio: usuario.direccion_envio ?? "",
        es_admin: usuario.es_admin ?? false,
        contrasena: "",
        fecha_registro: "",
        firebaseDocId,
      };

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "Los cambios se han guardado correctamente.",
        confirmButtonText: "Aceptar",
        background: "#000",
        color: "#fff",
      }).then(() => {
        onClose();
      });
      onUsuarioUpdated(updatedUsuario);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el usuario.",
        confirmButtonText: "Aceptar",
        background: "#000",
        color: "#fff",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={usuario.nombre || ""}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="correo_electronico">Correo Electrónico:</label>
        <input
          type="email"
          id="correo_electronico"
          name="correo_electronico"
          value={usuario.correo_electronico || ""}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccion_envio">Dirección de Envío:</label>
        <input
          type="text"
          id="direccion_envio"
          name="direccion_envio"
          value={usuario.direccion_envio || ""}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group-admin checkbox-group">
        <input
          type="checkbox"
          id="es_admin"
          name="es_admin"
          checked={usuario.es_admin || false}
          onChange={handleInputChange}
          className="form-checkbox"
        />
        <label htmlFor="es_admin">Administrador</label>
      </div>
      <button type="submit" className="submit-btn">
        Guardar Cambios
      </button>
    </form>
  );
};

export default UsuarioEditForm;
