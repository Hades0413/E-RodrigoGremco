import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Swal from "sweetalert2";
import { fetchUsuarios, deleteUsuario } from "../services/usuarioService";
import type { Usuario } from "../services/usuarioService";
import UsuarioDetailsForm from "../components/common/usuarios/UsuarioDetailsForm";
import UsuarioEditForm from "../components/common/usuarios/UsuarioEditForm";
import UsuarioCreateForm from "../components/common/usuarios/UsuarioCreateForm";

const Users: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<string | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const usuariosData = await fetchUsuarios();
        const sortedUsuarios = usuariosData.sort((a, b) => a.id - b.id);
        setUsuarios(sortedUsuarios);
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
        setUsuarios((prev) =>
          prev.filter((usuario) => usuario.firebaseDocId !== firebaseDocId)
        );
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <h1>Gestión de Usuarios</h1>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenCreate}
        sx={{ marginBottom: 2 }}
      >
        Crear Usuario
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="tabla de usuarios">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Es Admin</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <TableRow key={usuario.firebaseDocId}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.correo_electronico}</TableCell>
                  <TableCell>{usuario.direccion_envio}</TableCell>
                  <TableCell>{usuario.es_admin ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDetails(usuario.firebaseDocId!)}
                    >
                      Detalles
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenEdit(usuario.firebaseDocId!)}
                      sx={{ marginLeft: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteClick(
                          usuario.firebaseDocId!,
                          usuario.nombre
                        )
                      }
                      sx={{ marginLeft: 1 }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay usuarios disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />

      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetails}>
        <DialogTitle>Detalles del Usuario</DialogTitle>
        <DialogContent>
          {selectedUsuarioId && (
            <UsuarioDetailsForm firebaseDocId={selectedUsuarioId} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditModalOpen} onClose={handleCloseEdit}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          {selectedUsuarioId && (
            <UsuarioEditForm
              firebaseDocId={selectedUsuarioId}
              onUsuarioUpdated={() => {
                handleCloseEdit();
                setLoading(true);
                fetchUsuarios()
                  .then((usuariosData) => {
                    const sortedUsuarios = usuariosData.sort(
                      (a, b) => a.id - b.id
                    );
                    setUsuarios(sortedUsuarios);
                  })
                  .catch(() => setError("Error al cargar los usuarios"))
                  .finally(() => setLoading(false));
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isCreateModalOpen} onClose={handleCloseCreate}>
  <DialogTitle>Crear Usuario</DialogTitle>
  <DialogContent>
    <UsuarioCreateForm 
      onUsuarioCreated={() => {
        handleCloseCreate();
        setLoading(true);
        fetchUsuarios()
          .then((usuariosData) => {
            const sortedUsuarios = usuariosData.sort((a, b) => a.id - b.id);
            setUsuarios(sortedUsuarios);
          })
          .catch(() => setError("Error al cargar los usuarios"))
          .finally(() => setLoading(false));
      }} 
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseCreate} color="primary">
      Cerrar
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default Users;
