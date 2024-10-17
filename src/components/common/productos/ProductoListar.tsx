import React, { useEffect, useState } from "react";
import { fetchProductos } from "../../../services/productoService";
import ProductCard from "./ProductoCard";
import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

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
      console.log("Intentando conectarse a la colección 'categorias'...");
      const querySnapshot = await getDocs(collection(db, "categorias"));
      console.log("Conexión exitosa a la colección 'categorias'.");

      const categoriasArray = querySnapshot.docs.map((doc) => ({
        id: doc.data().id,
        nombre: doc.data().nombre,
      })) as Categoria[];

      console.log(
        "Categorías obtenidas:",
        JSON.stringify(categoriasArray, null, 2)
      );
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
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h2>Lista de Productos</h2>
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
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductoListar;
