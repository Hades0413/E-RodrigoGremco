import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchProductos, deleteProducto } from "../services/productoService";
import type { Producto } from "../services/productoService";
import ProductoDetailsForm from "../components/common/productos/ProductoDetailsForm";
import ProductoEditForm from "../components/common/productos/ProductoEditForm";
import ProductoCreateForm from "../components/common/productos/ProductoCreateForm";
import SearchTable from "../components/common/SearchTable";
import {
  Info,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/producto/Producto.css";
import "../styles/common/SearchTable.css";

const Producto: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const loadProductos = useCallback(async () => {
    setLoading(true);
    try {
      const productosData = await fetchProductos();
      const productosOrdenados = productosData.sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
      setFilteredProductos(productosOrdenados);
      setTotalPages(Math.ceil(productosOrdenados.length / itemsPerPage));
    } catch (error) {
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  const handleSearch = useCallback((filteredData: Producto[]) => {
    setFilteredProductos(filteredData);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, []);

  const handleCreateClick = () => {
    setCreateModalOpen(true);
  };

  const handleEditClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setEditModalOpen(true);
  };

  const handleProductoUpdated = async () => {
    await loadProductos();
    setEditModalOpen(false);
    setSelectedProducto(null);
  };

  const handleDetailsClick = (producto: Producto) => {
    setSelectedProducto(producto);
    setModalOpen(true);
  };

  const handleDeleteClick = async (producto: Producto) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el producto "${producto.nombre}" con ID ${producto.id}?`,
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
        await deleteProducto(producto.firebaseDocId!);
        await loadProductos();

        Swal.fire({
          title: "¡Eliminado!",
          text: `El producto "${producto.nombre}" fue eliminado correctamente.`,
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

  const handleProductoCreated = async () => {
    await loadProductos();
    setCreateModalOpen(false);
  };

  const paginatedProductos = filteredProductos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="producto-container">
      <h1 className="page-title">Gestión de Productos</h1>

      <div className="search-and-create">
        <button className="create-btn" onClick={handleCreateClick}>
          <Plus className="icon" size={20} />
          Crear Producto
        </button>

        <SearchTable
          data={productos}
          onSearch={handleSearch}
          placeholder="Buscar productos..."
        />
      </div>

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
                      <button
                        className="action-btn info"
                        onClick={() => handleDetailsClick(producto)}
                      >
                        <Info className="icon" />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditClick(producto)}
                      >
                        <Edit className="icon" />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteClick(producto)}
                      >
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-products">
                  No hay productos disponibles.
                </td>
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
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
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
              onProductoUpdated={handleProductoUpdated}
            />
            <button className="cancel-btn" onClick={handleCloseEditModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {createModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Crear Producto</h2>
            <ProductoCreateForm
              onClose={handleCloseCreateModal}
              onProductoCreated={handleProductoCreated}
            />
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

export default Producto;
