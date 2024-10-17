import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  updateCategoria,
  createCategoria,
} from "../../../services/categoriaService";
import Swal from "sweetalert2";

interface CategoriaFormProps {
  categoria: { firebaseId: string; id: number; nombre: string };
  onClose: () => void;
  onCreate: (nombre: string) => void;
  isCreating: boolean;
  isViewing?: boolean;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  categoria,
  onClose,
  onCreate,
  isCreating,
  isViewing = false,
}) => {
  const [nombre, setNombre] = useState<string>(categoria.nombre);

  useEffect(() => {
    if (isCreating) {
      setNombre("");
    } else {
      setNombre(categoria.nombre);
    }
  }, [categoria, isCreating]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating) {
      onCreate(nombre);
    } else {
      try {
        await updateCategoria(categoria.firebaseId, nombre);
        onClose();
        setTimeout(async () => {
          await Swal.fire(
            "Éxito",
            "Categoría actualizada con éxito",
            "success"
          );
        });
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        onClose();
        setTimeout(async () => {
          await Swal.fire(
            "Error",
            "Error al actualizar la categoría. Inténtalo de nuevo.",
            "error"
          );
        });
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h1>
        {isCreating
          ? "Crear Categoría"
          : isViewing
          ? "Detalles de Categoría"
          : "Editar Categoría"}
      </h1>
      <form onSubmit={handleSubmit}>
        {!isCreating && (
          <TextField
            label="ID de Categoría"
            value={categoria.id}
            disabled
            fullWidth
            margin="normal"
          />
        )}
        <TextField
          label="Nombre de Categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isViewing}
        />
        {!isViewing && (
          <Button type="submit" variant="contained" color="primary">
            {isCreating ? "Crear" : "Guardar Cambios"}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default CategoriaForm;
