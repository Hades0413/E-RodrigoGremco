import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
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

const ProductCard: React.FC<ProductCardProps> = ({
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
        transition: "transform 0.3s",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className="image-container" style={{ position: "relative" }}>
        <CardMedia
          component="img"
          className="product-image"
          image={imagen_producto}
          alt={nombre}
          sx={{ height: 194, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            zIndex: 2,
          }}
        ></div>
      </div>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {nombre}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginBottom: 2 }}
        >
          {descripcion}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Precio: ${precio.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Stock disponible: {stock_disponible}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Fecha de adición: {new Date(fecha_adicion).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          ID de categoría: {categoria_id}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Categoría: {categoria_nombre}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            color: "white",
            marginTop: 2,
            width: "100%",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
