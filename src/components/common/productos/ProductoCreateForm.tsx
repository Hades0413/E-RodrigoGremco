import React, { useState } from "react";
import Swal from "sweetalert2";
import { createProducto, fetchNextProductId, Producto } from "../../../services/productoService";
import FileDescription from "../../icons/Inventory";
import { Gamepad, DollarSign, Package, Image } from 'lucide-react';
import Category from "../../icons/Category";

interface ProductoCreateFormProps {
  onClose: () => void;
}

const ProductoCreateForm: React.FC<ProductoCreateFormProps> = ({ onClose }) => {
  const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, "id" | "fecha_adicion">>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock_disponible: 0,
    categoria_id: 0,
    imagen_producto: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumberInput = name === "precio" || name === "stock_disponible" || name === "categoria_id";
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: isNumberInput ? Number(value) : value,
    }));
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await fetchNextProductId();
    const productoConId = {
      ...nuevoProducto,
      id,
      fecha_adicion: formatDate(new Date()),
    };
    const success = await createProducto(productoConId);
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se ha creado correctamente.",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } else {
      console.error("Error al crear el producto.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el producto.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="producto-form">
          <div className="form-group">
            <label htmlFor="nombre">
              <Gamepad className="icon" />
              <span>Nombre del Producto</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={nuevoProducto.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ingrese el nombre del producto"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">
              <FileDescription className="icon" />
              <span>Descripción</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={nuevoProducto.descripcion}
              onChange={handleInputChange}
              placeholder="Ingrese la descripción del producto"
            />
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="precio">
                <DollarSign className="icon" />
                <span>Precio (USD)</span>
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                required
                placeholder="Ingrese el precio"
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="stock_disponible">
                <Package className="icon" />
                <span>Stock Disponible</span>
              </label>
              <input
                id="stock_disponible"
                name="stock_disponible"
                type="number"
                value={nuevoProducto.stock_disponible}
                onChange={handleInputChange}
                required
                placeholder="Ingrese el stock"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="categoria_id">
                <Category className="icon" />
                <span>ID de Categoría</span>
              </label>
              <input
                id="categoria_id"
                name="categoria_id"
                type="number"
                value={nuevoProducto.categoria_id}
                onChange={handleInputChange}
                required
                placeholder="ID de categoría"
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="imagen_producto">
                <Image className="icon" />
                <span>URL de la Imagen</span>
              </label>
              <input
                id="imagen_producto"
                name="imagen_producto"
                type="text"
                value={nuevoProducto.imagen_producto}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
              />
            </div>
          </div>
         {nuevoProducto.imagen_producto && (
  <img
    src={nuevoProducto.imagen_producto}
    alt="Vista previa del producto"
    className="image-preview"
    style={{
      maxWidth: '100px', 
      height: 'auto',
      display: 'block', // Asegúrate de que sea un bloque para centrarlo
      margin: '1rem auto' // Margen superior e inferior y centrado horizontal
    }}
  />
)}


          <div className="button-group">
            <button type="submit" className="submit-btn">Crear Producto</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
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
          max-width: 600px;
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

        .producto-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .half-width {
          flex: 1;
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

        input, textarea {
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid #9932CC;
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(153, 50, 204, 0.5);
          background-color: rgba(255, 255, 255, 0.15);
        }

        input::placeholder, textarea::placeholder {
          color: #a080c0;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .image-preview {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin-top: 1rem;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
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
            font-size: 1rem;
          }

          label {
            font-size: 0.8rem;
          }

          input, textarea, .submit-btn, .cancel-btn {
            font-size: 0.7rem;
          }

          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductoCreateForm;