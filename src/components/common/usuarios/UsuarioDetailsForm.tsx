import React, { useEffect, useState } from "react";
import { Usuario, fetchUsuarioByFirebaseDocId } from "../../../services/usuarioService";

interface UsuarioDetailsFormProps {
  firebaseDocId: string;
}

const UsuarioDetailsForm: React.FC<UsuarioDetailsFormProps> = ({ firebaseDocId }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const fetchedUsuario = await fetchUsuarioByFirebaseDocId(firebaseDocId);
      setUsuario(fetchedUsuario);
    };
    fetchUsuario();
  }, [firebaseDocId]);

  if (!usuario) {
    return <p>Cargando detalles del usuario...</p>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Correo Electrónico:</strong> {usuario.correo_electronico}</p>
      <p><strong>Dirección de Envío:</strong> {usuario.direccion_envio}</p>
      <p><strong>Administrador:</strong> {usuario.es_admin ? "Sí" : "No"}</p>
      <p><strong>Fecha de Registro:</strong> {usuario.fecha_registro}</p>
    </div>
  );
};

export default UsuarioDetailsForm;
