import React, { useState, useEffect } from "react";
import {
  fetchNextProductId,
  createProducto,
} from "../services/productoService";

const ProductoCreate = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stockDisponible, setStockDisponible] = useState("");
  const [imagenProducto, setImagenProducto] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [productoId, setProductoId] = useState<number>(1);

  useEffect(() => {
    const fetchAndSetProductos = async () => {
      try {
        const nextId = await fetchNextProductId();
        setProductoId(nextId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetProductos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !precio || !stockDisponible || categoriaId === null) {
      alert("Por favor, rellena todos los campos requeridos");
      return;
    }

    const nuevoProducto = {
      id: productoId,
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock_disponible: parseInt(stockDisponible, 10),
      imagen_producto: imagenProducto,
      fecha_adicion: new Date().toISOString(),
      categoria_id: categoriaId,
    };

    const success = await createProducto(nuevoProducto);
    if (success) {
      alert("Producto añadido correctamente");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStockDisponible("");
      setImagenProducto("");
      setCategoriaId(null);
      setProductoId(productoId + 1);
    } else {
      alert("Error al añadir producto");
    }
  };

  return (
    <div>
      <h2>Añadir Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Disponible</label>
          <input
            type="number"
            value={stockDisponible}
            onChange={(e) => setStockDisponible(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen del Producto (URL)</label>
          <input
            type="text"
            value={imagenProducto}
            onChange={(e) => setImagenProducto(e.target.value)}
          />
        </div>
        <div>
          <label>ID de la Categoría</label>
          <input
            type="number"
            value={categoriaId || ""}
            onChange={(e) => setCategoriaId(Number(e.target.value) || null)}
            required
          />
        </div>
        <button type="submit">Añadir Producto</button>
      </form>
    </div>
  );
};

export default ProductoCreate;
