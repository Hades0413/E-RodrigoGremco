import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Swal from "sweetalert2";
import { fetchProductos, deleteProducto } from "../services/productoService";
import type { Producto } from "../services/productoService";
import ProductoDetailsForm from "../components/common/productos/ProductoDetailsForm";
import ProductoEditForm from "../components/common/productos/ProductoEditForm";
import ProductoCreateForm from "../components/common/productos/ProductoCreateForm";

const Producto: React.FC = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const productosData = await fetchProductos();
        setProductos(productosData);
      } catch (error) {
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setEditModalOpen(true);
  };

  const handleDetailsClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setModalOpen(true);
  };

  const handleDeleteClick = async (id: number, nombre: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el producto "${nombre}" con ID ${id}?`,
      icon: "warning",
      background: "#000",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const firebaseDocId = String(id);
        await deleteProducto(firebaseDocId);
        setProductos((prev) => prev.filter((producto) => producto.id !== id));
        Swal.fire({
          title: "¡Eliminado!",
          text: `El producto "${nombre}" fue eliminado correctamente.`,
          icon: "success",
          background: "#000",
          color: "#fff",
        });
      } catch (error) {
        setError("Error al eliminar el producto.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProducto(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProducto(null);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <h1>Gestión de Productos</h1>

      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Crear Producto
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table aria-label="tabla de productos">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio (USD)</TableCell>
              <TableCell>Stock Disponible</TableCell>
              <TableCell>Categoría ID</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : productos.length > 0 ? (
              productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>{producto.id}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>
                    {producto.descripcion || "Sin descripción"}
                  </TableCell>
                  <TableCell>{producto.precio}</TableCell>
                  <TableCell>{producto.stock_disponible}</TableCell>
                  <TableCell>{producto.categoria_id}</TableCell>
                  <TableCell>
                    {producto.imagen_producto ? (
                      <img
                        src={producto.imagen_producto}
                        alt={producto.nombre}
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailsClick(producto)}
                      sx={{ marginRight: 1 }}
                    >
                      Detalles
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditClick(producto)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteClick(producto.id, producto.nombre)
                      }
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay productos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen && selectedProducto && (
        <ProductoDetailsForm
          producto={selectedProducto}
          onClose={handleCloseModal}
        />
      )}

      <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          {selectedProducto && (
            <ProductoEditForm
              producto={selectedProducto}
              onClose={handleCloseEditModal}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle>Crear Producto</DialogTitle>
        <DialogContent>
          <ProductoCreateForm onClose={handleCloseCreateModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};

export default Producto;
