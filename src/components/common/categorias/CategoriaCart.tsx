import React from "react";
import { Box } from "@mui/material";

interface Categoria {
  id: number;
  nombre: string;
}

interface CategoriaCartProps {
  categorias: Categoria[];
}

const CategoriaCart: React.FC<CategoriaCartProps> = ({ categorias }) => {
  return (
    <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <h4>Categorías</h4>
      {categorias.map((categoria) => (
        <Box
          key={categoria.id}
          sx={{
            margin: 1,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <h6>{categoria.nombre}</h6>
          <span>ID: {categoria.id}</span>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriaCart;
