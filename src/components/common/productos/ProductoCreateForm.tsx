import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  createProducto,
  fetchNextProductId,
  Producto,
} from "../../../services/productoService";
import FileDescription from "../../icons/Inventory";
import { Gamepad, DollarSign, Package, Image } from "lucide-react";
import Category from "../../icons/Category";
import { storage } from "../../../firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../../../styles/producto/ProductoCreateForm.css";

interface ProductoCreateFormProps {
  onClose: () => void;
  onProductoCreated: (producto: Producto) => void;
  categorias: { id: number; nombre: string }[];
}

const ProductoCreateForm: React.FC<ProductoCreateFormProps> = ({
  onClose,
  onProductoCreated,
  categorias,
}) => {
  const [nuevoProducto, setNuevoProducto] = useState<
    Omit<Producto, "id" | "fecha_adicion">
  >({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock_disponible: 0,
    categoria_id: 0,
    imagen_producto: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const isNumberInput =
      name === "precio" ||
      name === "stock_disponible" ||
      name === "categoria_id";
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: isNumberInput ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Crear una URL de vista previa para la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await fetchNextProductId();

    if (selectedImage) {
      const imageUrl = await uploadImage(selectedImage);
      const productoConId = {
        ...nuevoProducto,
        id,
        imagen_producto: imageUrl,
        fecha_adicion: formatDate(new Date()),
      };
      const success = await createProducto(productoConId);
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Producto creado",
          text: "El producto se ha creado correctamente.",
          confirmButtonText: "Aceptar",
          background: "#000",
          color: "#fff",
        });
        onProductoCreated(productoConId);
        onClose();
      } else {
        console.error("Error al crear el producto.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al crear el producto.",
          confirmButtonText: "Aceptar",
          background: "#000",
          color: "#fff",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, seleccione una imagen.",
        confirmButtonText: "Aceptar",
        background: "#000",
        color: "#fff",
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
          <div className="form-group half-width">
            <label htmlFor="categoria_id">
              <Category className="icon" />
              <span>Categoría</span>
            </label>
            <select
              className="form-group half-width selectcategoria"
              id="categoria_id"
              name="categoria_id"
              value={nuevoProducto.categoria_id}
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
          <div className="form-group">
            <label htmlFor="imagen_producto">
              <Image className="icon" />
              <span>Seleccionar Imagen</span>
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Vista previa"
              className="image-preview"
              style={{
                maxWidth: "100px",
                height: "auto",
                display: "block",
                margin: "1rem auto",
              }}
            />
          )}
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Crear Producto
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
};

export default ProductoCreateForm;
