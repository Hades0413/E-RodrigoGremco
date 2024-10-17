// CategoriaListar.tsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { fetchCategorias } from "../services/categoriaService";
import CategoriaCart from "../components/common/categorias/CategoriaCart";

interface Categoria {
  id: number;
  nombre: string;
}

const CategoriaListar = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const categoriasList = await fetchCategorias();
        setCategorias(categoriasList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Captura el error lanzado desde la lógica
        } else {
          setError("Error desconocido"); // Manejo de error no estándar
        }
      }
    };

    getCategorias();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <CategoriaCart categorias={categorias} />
    </Box>
  );
};

export default CategoriaListar;
