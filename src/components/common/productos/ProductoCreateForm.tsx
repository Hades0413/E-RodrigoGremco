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
import "../../../styles/producto/ProductoCreateForm.css";

interface ProductoCreateFormProps {
  onClose: () => void;
  onProductoCreated: (producto: Producto) => void;
}

const ProductoCreateForm: React.FC<ProductoCreateFormProps> = ({
  onClose,
  onProductoCreated,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      onProductoCreated(productoConId); // Llama al callback para actualizar la lista
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
