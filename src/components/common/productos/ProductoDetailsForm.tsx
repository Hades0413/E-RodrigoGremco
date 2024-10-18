import type { Producto } from "../../../services/productoService";
import { X } from 'lucide-react';

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
        <button className="cancel-btn" onClick={onClose}>Cerrar</button>
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

        .product-details {
          margin-bottom: 2rem;
        }

        .product-details p {
          margin-bottom: 0.5rem;
        }

        .product-image {
          margin-top: 1rem;
          display:flex;
        }

        .product-image img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-top: 0.5rem;
        }

        .cancel-btn {
          background-color: #4a2a7a;
          color: #e0b0ff;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background-color: #3a1a6a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(74, 42, 122, 0.4);
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
        }
      `}</style>
    </div>
  );
}