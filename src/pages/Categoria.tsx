import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchCategorias, deleteCategoria, createCategoria, fetchLastCategoryId } from "../services/categoriaService";
import CategoriaForm from "../components/common/categorias/CategoriaForm";
import { Info, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/categoria/Categoria.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const categoriasList = await fetchCategorias();
        setCategorias(categoriasList);
        setTotalPages(Math.ceil(categoriasList.length / itemsPerPage));
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
        setCategorias((prev) => {
          const updatedCategorias = prev.filter((c) => c.id !== id);
          setTotalPages(Math.ceil(updatedCategorias.length / itemsPerPage));
          return updatedCategorias;
        });
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
      setTotalPages(Math.ceil(newCategorias.length / itemsPerPage));
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedCategorias = categorias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="categoria-container">
      <h1 className="page-title">Gestión de Categorías</h1>
      <button className="create-btn" onClick={handleCreateClick}>
        <Plus className="icon" /> Crear Categoría
      </button>
      <div className="table-container-categoria">
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
            ) : paginatedCategorias.length > 0 ? (
              paginatedCategorias.map((categoria) => (
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
            <button className="cancel-btn-categoria" onClick={handleCloseModal}>Cancelar</button>
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
}