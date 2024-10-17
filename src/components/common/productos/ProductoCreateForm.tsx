import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";
import {
  createProducto,
  fetchNextProductId,
} from "../../../services/productoService";
import { Producto } from "../../../services/productoService";

interface ProductoCreateFormProps {
  onClose: () => void;
}

const ProductoCreateForm: React.FC<ProductoCreateFormProps> = ({ onClose }) => {
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

  const [imagenUrl, setImagenUrl] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagenUrl(url);
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      imagen_producto: url,
    }));
  };

  // Función para formatear la fecha
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
    >
      <h1>Crear Producto</h1>
      <TextField
        name="nombre"
        label="Nombre"
        variant="outlined"
        required
        value={nuevoProducto.nombre}
        onChange={handleInputChange}
      />
      <TextField
        name="descripcion"
        label="Descripción"
        variant="outlined"
        value={nuevoProducto.descripcion}
        onChange={handleInputChange}
      />
      <TextField
        name="precio"
        label="Precio (USD)"
        type="number"
        variant="outlined"
        required
        value={nuevoProducto.precio}
        onChange={handleInputChange}
      />
      <TextField
        name="stock_disponible"
        label="Stock Disponible"
        type="number"
        variant="outlined"
        required
        value={nuevoProducto.stock_disponible}
        onChange={handleInputChange}
      />
      <TextField
        name="categoria_id"
        label="ID de Categoría"
        type="number"
        variant="outlined"
        required
        value={nuevoProducto.categoria_id}
        onChange={handleInputChange}
      />
      <TextField
        name="imagen_producto"
        label="URL de la Imagen"
        variant="outlined"
        value={imagenUrl}
        onChange={handleImageUrlChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Crear Producto
      </Button>

      {imagenUrl && (
        <img
          src={imagenUrl}
          alt="Producto"
          style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }}
        />
      )}
    </Box>
  );
};

export default ProductoCreateForm;
