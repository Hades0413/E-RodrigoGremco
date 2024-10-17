// CategoriaCreate.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  fetchLastCategoryId,
  createCategoria,
} from "../services/categoriaService";

const CategoriaCreate = () => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [lastId, setLastId] = useState<number>(1);

  useEffect(() => {
    const getLastId = async () => {
      try {
        const id = await fetchLastCategoryId();
        setLastId(id);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      }
    };

    getLastId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la categoría es obligatorio");
      return;
    }

    try {
      await createCategoria(nombre, lastId);
      alert("Categoría añadida correctamente con ID numérico");

      setNombre("");
      setError("");
      setLastId(lastId + 1);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Crear Nueva Categoría
      </Typography>

      <TextField
        label="Nombre de la Categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        fullWidth
        error={Boolean(error)}
        helperText={error}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Añadir Categoría
      </Button>
    </Box>
  );
};

export default CategoriaCreate;
