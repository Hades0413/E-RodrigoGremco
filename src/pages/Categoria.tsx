import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchCategorias, deleteCategoria, createCategoria, fetchLastCategoryId } from "../services/categoriaService";
import CategoriaForm from "../components/common/categorias/CategoriaForm";
import { Info, Edit, Trash2, Plus } from 'lucide-react';

interface CategoriaType {
  firebaseId: string;
  id: number;
  nombre: string;
}

export default function CategoriaTable() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const categoriasList = await fetchCategorias();
        setCategorias(categoriasList);
      } catch (error) {
        setError("Error al obtener las categorías.");
      } finally {
        setLoading(false);
      }
    };
    obtenerCategorias();
  }, []);

  const handleCreateClick = () => {
    setIsCreating(true);
    setModalOpen(true);
  };

  const handleEditClick = (categoria: CategoriaType) => {
    setSelectedCategoria(categoria);
    setIsCreating(false);
    setIsViewing(false);
    setModalOpen(true);
  };

  const handleDetailsClick = (categoria: CategoriaType) => {
    setSelectedCategoria(categoria);
    setIsCreating(false);
    setIsViewing(true);
    setModalOpen(true);
  };

  const handleDeleteClick = async (categoria: CategoriaType) => {
    const { firebaseId, id, nombre } = categoria;
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar la categoría "${nombre}" con ID ${id}?`,
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
        await deleteCategoria(firebaseId);
        setCategorias((prev) => prev.filter((c) => c.id !== id));
        Swal.fire({
          title: "¡Eliminado!",
          text: `La categoría "${nombre}" fue eliminada correctamente.`,
          icon: "success",
        });
      } catch (error) {
        setError("Error al eliminar la categoría.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategoria(null);
    setIsCreating(false);
    setIsViewing(false);
  };

  const handleCreate = async (nombre: string) => {
    try {
      const lastId = await fetchLastCategoryId();
      await createCategoria(nombre, lastId);
      const newCategorias = await fetchCategorias();
      setCategorias(newCategorias);
      Swal.fire({
        icon: "success",
        title: "Categoría creada",
        text: "La categoría se ha creado con éxito.",
      });
      handleCloseModal();
    } catch (error) {
      setError("Error al crear la categoría.");
    }
  };

  return (
    <div className="categoria-container">
      <h1 className="page-title">Gestión de Categorías</h1>
      <button className="create-btn" onClick={handleCreateClick}>
        <Plus className="icon" /> Crear Categoría
      </button>
      <div className="table-container">
        <table className="categoria-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="loading">
                  <div className="spinner"></div>
                </td>
              </tr>
            ) : categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn info" onClick={() => handleDetailsClick(categoria)}>
                        <Info className="icon" />
                      </button>
                      <button className="action-btn edit" onClick={() => handleEditClick(categoria)}>
                        <Edit className="icon" />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(categoria)}>
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-categorias">No hay categorías disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              {isCreating ? "Crear Categoría" : isViewing ? "Detalles de Categoría" : "Editar Categoría"}
            </h2>
            <CategoriaForm
              categoria={selectedCategoria || { firebaseId: "", id: 0, nombre: "" }}
              onClose={handleCloseModal}
              onCreate={handleCreate}
              isCreating={isCreating}
              isViewing={isViewing}
            />
            <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
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

        .categoria-container {
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

        .categoria-table {
          width: 100%;
          border-collapse: collapse;
        }

        .categoria-table th,
        .categoria-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .categoria-table th {
          background-color: rgba(153, 50, 204, 0.2);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .categoria-table tr:hover {
          background-color: rgba(255, 255, 255, 0.05);
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

        .no-categorias {
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
          .categoria-container {
            padding: 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .categoria-table th,
          .categoria-table td {
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
}