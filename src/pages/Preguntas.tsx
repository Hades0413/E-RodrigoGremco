import React from 'react';
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
} from '@mui/material';
// Importa los iconos correctamente si no admiten 'sx', aplica estilos de otra forma.
import CodiconAccount from '../components/icons/CodiconAccount';
import ShoppingCart from '../components/icons/Shoppingcart';
import Security from '../components/icons/Premium';
import Gamepad from '../components/icons/GamepadIcon';
import Build from '../components/icons/Build';
import Help from '../components/icons/Help';
import SearchIcon from '../components/icons/SearchIcon';

import Mascota from '../assets/img/payaso.png';


const categories = [
  { name: 'Cuenta y seguridad', icon: <CodiconAccount style={{ fontSize: 35, marginRight: '15px' }} /> },
  { name: 'Tienda RodrigoGremco', icon: <ShoppingCart style={{ fontSize: 35, marginRight: '15px' }} /> },
  { name: 'Servicios premium', icon: <Security style={{ fontSize: 35, marginRight: '15px' }} /> },
  { name: 'Juegos', icon: <Gamepad style={{ fontSize: 35, marginRight: '15px' }} /> },
  { name: 'Hardware y reparaciones', icon: <Build style={{ fontSize: 35, marginRight: '15px' }} /> },
  { name: 'Ayuda general', icon: <Help style={{ fontSize: 35, marginRight: '15px' }} /> },
];

const Preguntas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#1a1a1a', minHeight: '100vh', p: 4, color: 'white' }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{
          backgroundImage: 'linear-gradient(45deg, #6a11cb 0%, #a046fc 100%)',
          borderRadius: 2,
          p: 4,
          color: 'white',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Soporte técnico de RodrigoGremco
            </Typography>
            <Typography variant="h6">
              ¿Cómo podemos ayudarte?
            </Typography>
          </Box>
        <Box
  component="img"
  src={Mascota}
  alt="Mascota RodrigoGremco"
  sx={{ mt: isMobile ? 2 : 0, width: 'auto', height: '200px', filter: 'saturate(1.2) drop-shadow(0 0 7px white)' }} // Ajusta '100px' al tamaño deseado
/>


        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en RodrigoGremco.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Elimina el uso de sx en el icono para evitar el error */}
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#a046fc',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        <Typography variant="h5" gutterBottom>
          Buscar ayuda por categorías
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
        {categories.map((category) => (
  <Box
    key={category.name}
    sx={{
      flex: '1 1 calc(33.333% - 20px)',
      minWidth: '250px',
      backgroundColor: '#2a2a2a',
      borderRadius: '8px',
      color: 'white',
      textAlign: 'center',
      p: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease', // Añadir transición suave
      '&:hover': {
        backgroundColor: '#353535',
      },
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {category.icon}
      <Typography variant="h6">{category.name}</Typography>
    </CardContent>
  </Box>
))}

        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Información sobre Tienda RodrigoGremco
          </Typography>
          <Card sx={{ backgroundColor: '#2a2a2a', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cómo hacer compras online en Tienda RodrigoGremco
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', cursor:'pointer' }}  >
                Haz clic para expandir y ver instrucciones detalladas sobre cómo realizar compras en nuestra tienda online.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Nuestra ubicación
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '400px',
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <iframe
  width="100%"
  height="100%"
  style={{ borderRadius: '8px' }}
  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3903.812583977866!2d-77.05410276952496!3d-11.91812756798125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x9105d04d91764a35%3A0x585f303a906d17c4!2sLYCAN%20GAMES%20SHOP%2C%20Altura%20Parque%20Zonal%20Sinchi%20Rica%2C%20Lima%2007%2C%20Comas%20LIMA%2007!3m2!1d-11.9196346!2d-77.0526312!5e0!3m2!1ses-419!2spe!4v1729012891227!5m2!1ses-419!2spe"
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
