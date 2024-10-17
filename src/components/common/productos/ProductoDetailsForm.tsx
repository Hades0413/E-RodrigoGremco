import React from "react";
import { Button, Box, Typography, Paper, Modal } from "@mui/material";
import type { Producto } from "../../../services/productoService"; // Import de solo tipo

interface ProductoDetailsFormProps {
  producto: Producto;
  onClose: () => void; // Prop para manejar el cierre del modal
}

const ProductoDetailsForm: React.FC<ProductoDetailsFormProps> = ({
  producto,
  onClose,
}) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{ padding: 2, maxWidth: 600, margin: "auto", marginTop: "100px" }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Detalles del Producto
          </Typography>
          <Typography variant="h6">ID: {producto.id}</Typography>
          <Typography variant="h6">Nombre: {producto.nombre}</Typography>
          <Typography variant="h6">
            Descripción: {producto.descripcion || "Sin descripción"}
          </Typography>
          <Typography variant="h6">
            Precio: ${producto.precio.toFixed(2)}
          </Typography>
          <Typography variant="h6">
            Stock Disponible: {producto.stock_disponible}
          </Typography>
          <Typography variant="h6">
            Categoría ID: {producto.categoria_id}
          </Typography>
          {producto.imagen_producto && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Imagen del Producto:</Typography>
              <img
                src={producto.imagen_producto}
                alt={producto.nombre}
                style={{ width: "150px", height: "150px" }}
              />
            </Box>
          )}
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose} // Llama a la función para cerrar el modal
            >
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ProductoDetailsForm;
