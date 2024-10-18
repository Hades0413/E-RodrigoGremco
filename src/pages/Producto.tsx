import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchProductos, deleteProducto } from "../services/productoService";
import type { Producto } from "../services/productoService";
import ProductoDetailsForm from "../components/common/productos/ProductoDetailsForm";
import ProductoEditForm from "../components/common/productos/ProductoEditForm";
import ProductoCreateForm from "../components/common/productos/ProductoCreateForm";
import { Info, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/producto/Producto.css";

const ProductoTable: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const productosData = await fetchProductos();
        setProductos(productosData);
        setTotalPages(Math.ceil(productosData.length / itemsPerPage));
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
        setProductos((prev) => {
          const updatedProductos = prev.filter((producto) => producto.id !== id);
          setTotalPages(Math.ceil(updatedProductos.length / itemsPerPage));
          return updatedProductos;
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: `El producto "${nombre}" fue eliminado correctamente.`,
          icon: "success",
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedProductos = productos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="producto-container">
      <h1 className="page-title">Gestión de Productos</h1>

      <button className="create-btn" onClick={handleCreateClick}>
        <Plus className="icon" />
        Crear Producto
      </button>

      <div className="table-container-producto">
        <table className="producto-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio (USD)</th>
              <th>Stock</th>
              <th>Categoría ID</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="loading">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : paginatedProductos.length > 0 ? (
              paginatedProductos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion || "Sin descripción"}</td>
                  <td>${producto.precio.toFixed(2)}</td>
                  <td>{producto.stock_disponible}</td>
                  <td>{producto.categoria_id}</td>
                  <td>
                    {producto.imagen_producto ? (
                      <img
                        src={producto.imagen_producto}
                        alt={producto.nombre}
                        className="product-image"
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn info" onClick={() => handleDetailsClick(producto)}>
                        <Info className="icon" />
                      </button>
                      <button className="action-btn edit" onClick={() => handleEditClick(producto)}>
                        <Edit className="icon" />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(producto.id, producto.nombre)}>
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-products">No hay productos disponibles.</td>
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

      {modalOpen && selectedProducto && (
        <ProductoDetailsForm
          producto={selectedProducto}
          onClose={handleCloseModal}
        />
      )}

      {editModalOpen && selectedProducto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Editar Producto</h2>
            <ProductoEditForm
              producto={selectedProducto}
              onClose={handleCloseEditModal}
            />
            <button className="cancel-btn" onClick={handleCloseEditModal}>Cancelar</button>
          </div>
        </div>
      )}

      {createModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Crear Producto</h2>
            <ProductoCreateForm onClose={handleCloseCreateModal} />
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ProductoTable;