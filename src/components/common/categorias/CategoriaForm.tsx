import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateCategoria } from "../../../services/categoriaService";
import { Folder, Save } from 'lucide-react'; 
import "../../../styles/categoria/CategoriaForm.css";

interface CategoriaFormProps {
  categoria: { firebaseId: string; id: number; nombre: string };
  onClose: () => void;
  onCreate: (nombre: string) => void;
  isCreating: boolean;
  isViewing?: boolean;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  categoria,
  onClose,
  onCreate,
  isCreating,
  isViewing = false,
}) => {
  const [nombre, setNombre] = useState<string>(categoria.nombre);

  useEffect(() => {
    if (isCreating) {
      setNombre("");
    } else {
      setNombre(categoria.nombre);
    }
  }, [categoria, isCreating]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating) {
      onCreate(nombre);
    } else {
      try {
        await updateCategoria(categoria.firebaseId, nombre);
        onClose();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Categoría actualizada con éxito",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        onClose();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al actualizar la categoría. Inténtalo de nuevo.",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {isCreating
            ? "Crear Categoría"
            : isViewing
            ? "Detalles de Categoría"
            : "Editar Categoría"}
        </h2>
        <form onSubmit={handleSubmit} className="categoria-form">
          {!isCreating && (
            <div className="form-group">
              <label htmlFor="id">
                <Folder className="icon" />
                <span>ID de Categoría</span>
              </label>
              <input
                id="id"
                type="text"
                value={categoria.id}
                disabled
                className="disabled"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="nombre">
              <Folder className="icon" />
              <span>Nombre de Categoría</span>
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={isViewing}
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>
          <div className="button-group">
            {!isViewing && (
              <button type="submit" className="submit-btn">
                <Save className="icon" />
                {isCreating ? "Crear Categoría" : "Guardar Cambios"}
              </button>
            )}
            <button type="button" className="cancel-btn-categoria" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;
