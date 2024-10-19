import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import type { Producto } from "../../../services/productoService";
import Swal from "sweetalert2";
import {
  X,
  Gamepad,
  FileText,
  DollarSign,
  Package,
  Image,
  Tag,
} from "lucide-react";

interface ProductoEditFormProps {
  producto: Producto;
  onClose: () => void;
  onProductoUpdated: (updatedProducto: Producto) => void; // Nueva propiedad
}

export default function ProductoEditForm({
  producto,
  onClose,
  onProductoUpdated, // Recibiendo la nueva propiedad
}: ProductoEditFormProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Producto>(producto);

  useEffect(() => {
    setFormData(producto);
    setLoading(false);
  }, [producto]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "precio" ||
        name === "stock_disponible" ||
        name === "categoria_id"
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

      // Notificar al componente padre sobre la actualización
      onProductoUpdated({ ...formData, firebaseDocId: producto.firebaseDocId });

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

  if (loading)
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Editar Producto</h2>
        <button className="close-btn" onClick={onClose}>
          <X className="icon" />
        </button>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="nombre">
                <Gamepad className="icon" />
                <span>Nombre</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="categoria_id">
                <Tag className="icon" />
                <span>Categoría ID</span>
              </label>
              <input
                type="number"
                id="categoria_id"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">
              <FileText className="icon" />
              <span>Descripción</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="precio">
                <DollarSign className="icon" />
                <span>Precio</span>
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="stock_disponible">
                <Package className="icon" />
                <span>Stock</span>
              </label>
              <input
                type="number"
                id="stock_disponible"
                name="stock_disponible"
                value={formData.stock_disponible}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="imagen_producto">
              <Image className="icon" />
              <span>Imagen del Producto</span>
            </label>
            <input
              type="text"
              id="imagen_producto"
              name="imagen_producto"
              value={formData.imagen_producto}
              onChange={handleInputChange}
            />
            {formData.imagen_producto && (
              <img
                src={formData.imagen_producto}
                alt="Vista previa del producto"
                className="image-preview"
                style={{
                  maxWidth: "150px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "12px",
                }}
              />
            )}
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Actualizar Producto
            </button>
            <button
              type="button"
              className="cancel-btn-producto"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
