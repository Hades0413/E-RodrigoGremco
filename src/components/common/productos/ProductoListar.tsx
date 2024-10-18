import React, { useEffect, useState } from "react";
import { fetchProductos } from "../../../services/productoService";
import ProductCard from "./ProductoCard";
import { Box, Skeleton, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import "../../../styles/producto/ProductoListar.css";

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock_disponible: number;
  imagen_producto?: string;
  fecha_adicion: string;
  categoria_id: number;
}

interface Categoria {
  id: number;
  nombre: string;
}

const ProductoListar: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const categoriasArray = querySnapshot.docs.map((doc) => ({
        id: doc.data().id,
        nombre: doc.data().nombre,
      })) as Categoria[];
      setCategorias(categoriasArray);
    } catch (err) {
      console.error("Error al obtener las categorías: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productosData = await fetchProductos();
      setProductos(productosData);
      await fetchCategorias();
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCategoriaNombre = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nombre : "Sin categoría";
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          padding: 2,
        }}
      >
        {Array.from(new Array(12)).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={345}
            height={400}
            sx={{ backgroundColor: "#d6d6d6", borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          marginTop: 5,
          fontWeight: "bold",
          textAlign: "center",
          color: "#ffffff",
          textShadow: "0 0 10px #9932CC, 0 0 20px #9932CC, 0 0 30px #9932CC",
          marginBottom: "2rem",
          fontFamily: "Orbitron, sans-serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          // Responsiveness
          fontSize: {
            xs: "1.5rem", // Tamaño más pequeño en pantallas móviles
            sm: "2rem", // Tamaño en pantallas pequeñas
            md: "3rem", // Tamaño medio en tablets
            lg: "4rem", // Tamaño mayor en pantallas grandes
          },
        }}
      >
        LISTADO DE PRODUCTOS
      </Typography>

      {productos.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            padding: 2,
          }}
        >
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              nombre={producto.nombre}
              descripcion={producto.descripcion || "Sin descripción"}
              precio={producto.precio}
              stock_disponible={producto.stock_disponible}
              imagen_producto={producto.imagen_producto || ""}
              fecha_adicion={producto.fecha_adicion}
              categoria_id={producto.categoria_id}
              categoria_nombre={getCategoriaNombre(producto.categoria_id)}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#fff" }}>
          No hay productos disponibles.
        </Typography>
      )}
    </div>
  );
};

export default ProductoListar;
