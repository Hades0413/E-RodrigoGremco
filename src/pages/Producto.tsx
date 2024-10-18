import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchProductos, deleteProducto } from "../services/productoService";
import type { Producto } from "../services/productoService";
import ProductoDetailsForm from "../components/common/productos/ProductoDetailsForm";
import ProductoEditForm from "../components/common/productos/ProductoEditForm";
import ProductoCreateForm from "../components/common/productos/ProductoCreateForm";
import { Info, Edit, Trash2, Plus } from 'lucide-react';

const ProductoTable: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
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
    <div className="producto-container">
      <h1 className="page-title">Gestión de Productos</h1>

      <button className="create-btn" onClick={handleCreateClick}>
        <Plus className="icon" />
        Crear Producto
      </button>

      <div className="table-container">
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
            ) : productos.length > 0 ? (
              productos.map((producto) => (
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
                <td colSpan={8} className="no-products">No hay productos disponibless.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

        .producto-container {
          background: linear-gradient(145deg, #2e1e4f 0%, #4a2a7a 100%);
          min-height: 100vh;
          color: #e0b0ff;
          padding: 2rem;
        }

        .page-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #fff;
          text-shadow: 0 0 10px #9932CC, 0 0 20px #9932CC;
          letter-spacing: 2px;
        }

        .create-btn {
          background-color: #9932CC;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .create-btn:hover {
          background-color: #8B008B;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(153, 50, 204, 0.4);
        }

        .table-container {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .producto-table {
          width: 100%;
          border-collapse: collapse;
        }

        .producto-table th,
        .producto-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .producto-table th {
          background-color: rgba(153, 50, 204, 0.2);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .producto-table tr:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .product-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn.info {
          color: #3498db;
        }

        .action-btn.edit {
          color: #f39c12;
        }

        .action-btn.delete {
          color: #e74c3c;
        }

        .icon {
          width: 20px;
          height: 20px;
        }

        .loading {
          text-align: center;
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #9932CC;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .no-products {
          text-align: center;
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(145deg, #2e1e4f 0%, #4a2a7a 100%);
          border-radius: 20px;
          padding: 2rem;
          color: #e0b0ff;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #fff;
          text-shadow: 0 0 10px #9932CC, 0 0 20px #9932CC;
          letter-spacing: 2px;
        }

        .cancel-btn {
          background-color: #4a2a7a;
          color: #e0b0ff;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background-color: #3a1a6a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(74, 42, 122, 0.4);
        }

        .error-message {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .error-message button {
          background-color: #e74c3c;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .error-message button:hover {
          background-color: #c0392b;
        }

        @media (max-width: 768px) {
          .producto-container {
            padding: 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .producto-table th,
          .producto-table td {
            padding: 0.75rem 0.5rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductoTable;