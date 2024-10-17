import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { Producto } from "../../../services/productoService";
import Swal from "sweetalert2";

interface ProductoEditFormProps {
  producto: Producto;
  onClose: () => void;
}

const ProductoEditForm: React.FC<ProductoEditFormProps> = ({
  producto,
  onClose,
}) => {
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
      [name]: value,
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="ID" name="id" value={formData.id} disabled />
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleInputChange}
      />
      <TextField
        label="Precio"
        name="precio"
        type="number"
        value={formData.precio}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Stock Disponible"
        name="stock_disponible"
        type="number"
        value={formData.stock_disponible}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Imagen del Producto"
        name="imagen_producto"
        value={formData.imagen_producto}
        onChange={handleInputChange}
      />
      <TextField
        label="Categoría ID"
        name="categoria_id"
        type="number"
        value={formData.categoria_id}
        onChange={handleInputChange}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Actualizar Producto
      </Button>

      {formData.imagen_producto && (
        <img
          src={formData.imagen_producto}
          alt="Imagen del Producto"
          style={{ marginTop: "16px", maxWidth: "100%", height: "auto" }}
        />
      )}
    </Box>
  );
};

export default ProductoEditForm;
