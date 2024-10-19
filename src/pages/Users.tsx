import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchUsuarios, deleteUsuario } from "../services/usuarioService";
import type { Usuario } from "../services/usuarioService";
import UsuarioDetailsForm from "../components/common/usuarios/UsuarioDetailsForm";
import UsuarioEditForm from "../components/common/usuarios/UsuarioEditForm";
import UsuarioCreateForm from "../components/common/usuarios/UsuarioCreateForm";
import "../styles/users/Users.css";
import { Info, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Users: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const usuariosData = await fetchUsuarios();
        const sortedUsuarios = usuariosData.sort((a, b) => a.id - b.id);
        setUsuarios(sortedUsuarios);
        setTotalPages(Math.ceil(sortedUsuarios.length / itemsPerPage));
      } catch (error) {
        setError("Error al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    loadUsuarios();
  }, []);

  const handleDeleteClick = async (firebaseDocId: string, nombre: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar al usuario "${nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await deleteUsuario(firebaseDocId);
        setUsuarios((prev) => {
          const updatedUsuarios = prev.filter((usuario) => usuario.firebaseDocId !== firebaseDocId);
          setTotalPages(Math.ceil(updatedUsuarios.length / itemsPerPage));
          return updatedUsuarios;
        });
        Swal.fire(
          "¡Eliminado!",
          `El usuario "${nombre}" fue eliminado correctamente.`,
          "success"
        );
      } catch (error) {
        setError("Error al eliminar el usuario.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpenCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenDetails = (firebaseDocId: string) => {
    setSelectedUsuarioId(firebaseDocId);
    setIsDetailsModalOpen(true);
  };

  const handleOpenEdit = (firebaseDocId: string) => {
    setSelectedUsuarioId(firebaseDocId);
    setIsEditModalOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedUsuarioId(null);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUsuarioId(null);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleUsuariosUpdated = async () => {
    setLoading(true);
    try {
      const usuariosData = await fetchUsuarios();
      const sortedUsuarios = usuariosData.sort((a, b) => a.id - b.id);
      setUsuarios(sortedUsuarios);
      setTotalPages(Math.ceil(sortedUsuarios.length / itemsPerPage));
    } catch {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const paginatedUsuarios = usuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="categoria-container">
      <h1 className="page-title">Gestión de Usuarios</h1>

      <button className="create-btn" onClick={handleOpenCreate}>
        <Plus className="icon" /> Crear Usuario
      </button>

      <div className="table-container-user">
        <table className="categoria-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Es Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="loading">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : paginatedUsuarios.length > 0 ? (
              paginatedUsuarios.map((usuario) => (
                <tr key={usuario.firebaseDocId}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo_electronico}</td>
                  <td>{usuario.direccion_envio}</td>
                  <td>{usuario.es_admin ? "Sí" : "No"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn info" onClick={() => handleOpenDetails(usuario.firebaseDocId!)}>
                        <Info className="icon" />
                      </button>
                      <button className="action-btn edit" onClick={() => handleOpenEdit(usuario.firebaseDocId!)}>
                        <Edit className="icon" />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(usuario.firebaseDocId!, usuario.nombre)}>
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-categorias">No hay usuarios disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <ChevronLeft className="icon" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <ChevronRight className="icon" />
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      )}

      {isDetailsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Detalles del Usuario</h2>
            {selectedUsuarioId && (
              <UsuarioDetailsForm firebaseDocId={selectedUsuarioId} />
            )}
            <button className="cancel-btn" onClick={handleCloseDetails}>Cerrar</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Editar Usuario</h2>
            {selectedUsuarioId && (
              <UsuarioEditForm
                firebaseDocId={selectedUsuarioId}
                onUsuarioUpdated={handleUsuariosUpdated} // Usar la función actualizada
              />
            )}
            <button className="cancel-btn" onClick={handleCloseEdit}>Cerrar</button>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Crear Usuario</h2>
            <UsuarioCreateForm
              onUsuarioCreated={handleUsuariosUpdated} // Usar la función actualizada
            />
            <button className="cancel-btn" onClick={handleCloseCreate}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
