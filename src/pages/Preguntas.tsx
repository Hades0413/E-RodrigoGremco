import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Grow,
  Tooltip,
  IconButton,
} from "@mui/material";
import CodiconAccount from "../components/icons/CodiconAccount";
import ShoppingCart from "../components/icons/Shoppingcart";
import Security from "../components/icons/Premium";
import Gamepad from "../components/icons/GamepadIcon";
import Build from "../components/icons/Build";
import Help from "../components/icons/Help";
import SearchIcon from "../components/icons/SearchIcon";
import  Info from '../components/icons/Build';
import Mascota from "../assets/img/payaso.png";// Asegúrate de tener esta imagen

const categories = [
  {
    name: "Cuenta y seguridad",
    icon: <CodiconAccount style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Gestiona tu cuenta y configura opciones de seguridad",
  },
  {
    name: "Tienda RodrigoGremco",
    icon: <ShoppingCart style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Explora nuestros productos y ofertas especiales",
  },
  {
    name: "Servicios premium",
    icon: <Security style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Descubre los beneficios de nuestros servicios premium",
  },
  {
    name: "Juegos",
    icon: <Gamepad style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Encuentra información sobre tus juegos favoritos",
  },
  {
    name: "Hardware y reparaciones",
    icon: <Build style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Soluciona problemas técnicos y obtén ayuda con reparaciones",
  },
  {
    name: "Ayuda general",
    icon: <Help style={{ fontSize: 35, marginRight: "15px" }} />,
    description: "Resuelve dudas generales sobre nuestros servicios",
  },
];

const Preguntas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#2a2a2a", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: "100vh",
        p: 4,
        color: "white",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grow in={true} timeout={1000}>
          <Box
            sx={{
              backgroundImage: "linear-gradient(45deg, #6a11cb 0%, #a046fc 100%)",
              borderRadius: 2,
              p: 4,
              color: "white",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
              boxShadow: '0 4px 20px rgba(106, 17, 203, 0.4)',
            }}
          >
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Soporte técnico de RodrigoGremco
              </Typography>
              <Typography variant="h6">¿Cómo podemos ayudarte?</Typography>
            </Box>
            <Box
              component="img"
              src={Mascota}
              alt="Mascota RodrigoGremco"
              sx={{
                mt: isMobile ? 2 : 0,
                width: "auto",
                height: "200px",
                filter: "saturate(1.2) drop-shadow(0 0 7px white)",
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05) rotate(5deg)',
                },
              }}
            />
          </Box>
        </Grow>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en RodrigoGremco.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a046fc",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />

        <Typography variant="h5" gutterBottom>
          Buscar ayuda por categorías
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {categories.map((category, index) => (
            <Grow in={true} timeout={500 * (index + 1)} key={category.name}>
              <Tooltip title={category.description} arrow>
                <Box
                  sx={{
                    flex: "1 1 calc(33.333% - 20px)",
                    minWidth: "250px",
                    backgroundColor: "rgb(74 74 74 / 80%)",
                    borderRadius: "8px",
                    color: "white",
                    textAlign: "center",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgb(74 74 74 / 90%)",
                      transform: "translateY(-5px)",
                      boxShadow: '0 4px 20px rgba(160, 70, 252, 0.4)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {category.icon}
                    <Typography variant="h6">{category.name}</Typography>
                  </CardContent>
                </Box>
              </Tooltip>
            </Grow>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Información sobre Tienda RodrigoGremco
          </Typography>
          <Card 
            sx={{ 
              backgroundColor: "rgba(42, 42, 42, 0.8)", 
              color: "white",
              transition: "all 0.3s ease",
              '&:hover': {
                backgroundColor: "rgba(53, 53, 53, 0.9)",
                transform: "translateY(-5px)",
                boxShadow: '0 4px 20px rgba(160, 70, 252, 0.4)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cómo hacer compras online en Tienda RodrigoGremco
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)", 
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  '&:hover': {
                    color: "white",
                  },
                }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Haz clic para contraer" : "Haz clic para expandir"} y ver instrucciones detalladas sobre cómo realizar compras en nuestra tienda online.
              </Typography>
              {expanded && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    1. Navega por nuestro catálogo de productos.<br/>
                    2. Selecciona los artículos que deseas comprar.<br/>
                    3. Añade los productos al carrito de compras.<br/>
                    4. Procede al checkout y elige tu método de pago preferido.<br/>
                    5. Confirma tu pedido y espera la confirmación por correo electrónico.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Nuestra ubicación
            <Tooltip title="Abrimos a las 3:30PM, esto empezó un lunes 09/07/2023" arrow>
              <IconButton size="small" sx={{ ml: 1, color: 'white' }}>
                <Info />
              </IconButton>
            </Tooltip>
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "400px",
              backgroundColor: "rgba(42, 42, 42, 0.8)",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3902.784661107314!2d-77.063773!3d-11.989397000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDU5JzIxLjgiUyA3N8KwMDMnNDkuNiJX!5e0!3m2!1ses-419!2spe!4v1729227052449!5m2!1ses-419!2spe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Preguntas;