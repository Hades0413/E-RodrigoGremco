import React, { useEffect, useState } from "react";
import { Usuario, fetchUsuarioByFirebaseDocId, updateUsuario } from "../../../services/usuarioService";

interface UsuarioEditFormProps {
  firebaseDocId: string;
  onUsuarioUpdated: () => void;
}

const UsuarioEditForm: React.FC<UsuarioEditFormProps> = ({ firebaseDocId, onUsuarioUpdated }) => {
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
    await updateUsuario(firebaseDocId, usuario);
    onUsuarioUpdated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Usuario</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="correo_electronico"
          value={usuario.correo_electronico}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Dirección de Envío:</label>
        <input
          type="text"
          name="direccion_envio"
          value={usuario.direccion_envio}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Administrador:</label>
        <input
          type="checkbox"
          name="es_admin"
          checked={usuario.es_admin}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default UsuarioEditForm;
