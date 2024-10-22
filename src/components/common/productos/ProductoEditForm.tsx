import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { storage } from "../../../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Producto, Categoria } from "../../../services/productoService";
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
  categorias: Categoria[];
  onClose: () => void;
  onProductoUpdated: (updatedProducto: Producto) => void;
}

export default function ProductoEditForm({
  producto,
  categorias,
  onClose,
  onProductoUpdated,
}: ProductoEditFormProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Producto>(producto);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    setFormData(producto);
    setLoading(false);
  }, [producto]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!producto.firebaseDocId) {
      setError("El ID del documento de Firebase es necesario.");
      return;
    }

    try {
      const productoRef = doc(db, "productos", producto.firebaseDocId);

      // Actualizar el documento en Firestore
      if (selectedImage) {
        // Subir la nueva imagen a Firebase Storage
        const imageRef = ref(storage, `productos/${producto.firebaseDocId}`);
        await uploadBytes(imageRef, selectedImage);

        // Obtener la URL de la imagen
        const imageUrl = await getDownloadURL(imageRef);
        formData.imagen_producto = imageUrl; // Actualiza la URL de la imagen
      }

      await updateDoc(productoRef, { ...formData });

      onProductoUpdated({ ...formData, firebaseDocId: producto.firebaseDocId });

      Swal.fire({
        title: "Éxito!",
        text: "El producto fue editado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#000",
        color: "#fff",
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
                <span>Categoría</span>
              </label>
              <select
                className="form-group half-width selectcategoria"
                id="categoria_id"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
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
              <span>Seleccionar Imagen</span>
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
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
