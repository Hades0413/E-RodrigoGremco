import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import type { Producto } from "../../../services/productoService";
import Swal from "sweetalert2";
import { X } from 'lucide-react';

interface ProductoEditFormProps {
  producto: Producto;
  onClose: () => void;
}

export default function ProductoEditForm({ producto, onClose }: ProductoEditFormProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Producto>(producto);

  useEffect(() => {
    setFormData(producto);
    setLoading(false);
  }, [producto]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "precio" || name === "stock_disponible" || name === "categoria_id" 
        ? parseInt(value, 10) 
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!producto.firebaseDocId) {
      setError("El ID del documento de Firebase es necesario.");
      return;
    }

    try {
      const productoRef = doc(db, "productos", producto.firebaseDocId);
      await updateDoc(productoRef, { ...formData });

      Swal.fire({
        title: "Éxito!",
        text: "El producto fue editado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onClose();
    } catch (err) {
      setError("Error al actualizar el producto.");
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Editar Producto</h2>
        <button className="close-btn" onClick={onClose}>
          <X className="icon" />
        </button>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={formData.id} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock_disponible">Stock Disponible</label>
            <input
              type="number"
              id="stock_disponible"
              name="stock_disponible"
              value={formData.stock_disponible}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagen_producto">Imagen del Producto</label>
            <input
              type="text"
              id="imagen_producto"
              name="imagen_producto"
              value={formData.imagen_producto}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria_id">Categoría ID</label>
            <input
              type="number"
              id="categoria_id"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleInputChange}
              required
            />
          </div>


          <div className="button-group">
            <button type="submit" className="submit-btn">Actualizar Producto</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
       
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

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
          position: relative;
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

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #e0b0ff;
          cursor: pointer;
          font-size: 1.5rem;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .form-group input {
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid #e0b0ff;
          background-color: rgba(255, 255, 255, 0.1);
          color: #e0b0ff;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .submit-btn, .cancel-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
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

        .product-image {
          margin-top: 1rem;
          text-align: center;
        }

        .product-image img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
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

        .error-message {
          background-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          text-align: center;
        }

        .icon {
          width: 24px;
          height: 24px;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .button-group {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}