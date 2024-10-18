import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateCategoria } from "../../../services/categoriaService";
import { Folder, Save } from 'lucide-react'; 

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
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <style>{`
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
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .modal-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #fff;
          text-shadow: 0 0 10px #9932CC, 0 0 20px #9932CC;
          letter-spacing: 2px;
        }

        .categoria-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          color: #c0a0e0;
          transition: color 0.3s ease;
        }

        label:hover {
          color: #e0b0ff;
        }

        .icon {
          width: 24px;
          height: 24px;
        }

        input {
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid #9932CC;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(153, 50, 204, 0.5);
          background-color: rgba(255, 255, 255, 0.15);
        }

        input::placeholder {
          color: #a080c0;
        }

        input.disabled {
          background-color: rgba(255, 255, 255, 0.05);
          color: #a080c0;
          cursor: not-allowed;
        }

        .button-group {
          display: flex;
          flex-direction: column; /* Cambiar a columna para responsividad */
          gap: 1rem;
        }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn {
          background-color: #9932CC;
          color: #fff;
        }

        .submit-btn:hover {
          background-color: #8B008B;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(153, 50, 204, 0.4);
        }

        .cancel-btn {
          background-color: #4a2a7a;
          color: #e0b0ff;
        }

        .cancel-btn:hover {
          background-color: #3a1a6a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(74, 42, 122, 0.4);
        }

        @media (max-width: 600px) {
          .modal-content {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.75rem;
          }

          label {
            font-size: 1rem;
          }

          input, .submit-btn, .cancel-btn {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoriaForm;
