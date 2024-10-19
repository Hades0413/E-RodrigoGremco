import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

import SportsEsports from "../../icons/SportsEsports";
import AttachMoney from "../../icons/AttachMoney";
import Inventory from "../../icons/Inventory";
import Event from "../../icons/Event";
import Category from "../../icons/Category";

import "../../../styles/producto/ProductoCard.css";

interface ProductCardProps {
  nombre: string;
  descripcion: string;
  precio: number;
  stock_disponible: number;
  imagen_producto: string;
  fecha_adicion: string;
  categoria_id: number;
  categoria_nombre: string;
}

const ProductoCard: React.FC<ProductCardProps> = ({
  nombre,
  descripcion,
  precio,
  stock_disponible,
  imagen_producto,
  fecha_adicion,
  categoria_id,
  categoria_nombre,
}) => {
  return (
    <Card
      sx={{
        width: 345,
        margin: "0 auto",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        background: "linear-gradient(145deg, #2e1e4f 0%, #4a2a7a 100%)",
        color: "#e0b0ff",
        borderRadius: "16px",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 0 25px rgba(224, 176, 255, 0.5)",
        },
      }}
    >
      <Box className=".image-container-game" sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          className="product-image"
          loading="lazy"
          image={imagen_producto}
          alt={nombre}
          sx={{ height: 194, objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(46, 30, 79, 0.8) 0%, rgba(46, 30, 79, 0) 100%)",
            zIndex: 1,
          }}
        />
        <Chip
          icon={<SportsEsports />}
          label={categoria_nombre}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(224, 176, 255, 0.2)",
            color: "#e0b0ff",
            zIndex: 2,
          }}
        />
      </Box>
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 2,
            color: "#e0b0ff",
          }}
        >
          {nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: "#c0a0e0", marginBottom: 2 }}>
          {descripcion}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Box component="span" sx={{ marginRight: 1 }}>
            <AttachMoney style={{ color: "#e0b0ff" }} />
          </Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#e0b0ff" }}
          >
            ${precio.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Box component="span" sx={{ marginRight: 1 }}>
            <Inventory style={{ color: "#e0b0ff" }} />
          </Box>
          <Typography variant="body2" sx={{ color: "#c0a0e0" }}>
            Stock disponible: {stock_disponible}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Box component="span" sx={{ marginRight: 1 }}>
            <Event style={{ color: "#e0b0ff" }} />
          </Box>
          <Typography variant="caption" sx={{ color: "#c0a0e0" }}>
            Fecha de adición: {new Date(fecha_adicion).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Box component="span" sx={{ marginRight: 1 }}>
            <Category style={{ color: "#e0b0ff" }} />
          </Box>
          <Typography variant="caption" sx={{ color: "#c0a0e0" }}>
            ID de categoría: {categoria_id}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SportsEsports />}
          sx={{
            backgroundColor: "#9932CC",
            color: "#ffffff",
            marginTop: 2,
            width: "100%",
            "&:hover": {
              backgroundColor: "#8B008B",
            },
          }}
        >
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductoCard;
