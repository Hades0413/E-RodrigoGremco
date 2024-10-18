import type { Producto } from "../../../services/productoService";
import { X } from 'lucide-react';
import "../../../styles/producto/ProductoDetailsForm.css";
interface ProductoDetailsFormProps {
  producto: Producto;
  onClose: () => void;
}

export default function ProductoDetailsForm({ producto, onClose }: ProductoDetailsFormProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Detalles del Producto</h2>
        <button className="close-btn" onClick={onClose}>
          <X className="icon" />
        </button>
        <div className="product-details">
          <p><strong>ID:</strong> {producto.id}</p>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion || "Sin descripción"}</p>
          <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
          <p><strong>Stock Disponible:</strong> {producto.stock_disponible}</p>
          <p><strong>Categoría ID:</strong> {producto.categoria_id}</p>
          {producto.imagen_producto && (
            <div className="product-image">
              <p><strong>Imagen del Producto:</strong></p>
              <img src={producto.imagen_producto} alt={producto.nombre} />
            </div>
          )}
        </div>
        <button className="cancel-btn-details" onClick={onClose}>Cerrar</button>
      </div>
     
    </div>
  );
}