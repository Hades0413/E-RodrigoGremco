import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { LoadingProvider } from "./context/LoadingContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoaderWrapper from "./components/ui/LoaderWrapper";
import "@sweetalert2/theme-dark/dark.css";
import Users from "./pages/Users";
import Producto from "./pages/Producto";
import Categoria from "./pages/Categoria";
import Preguntas from "./pages/Preguntas";
import Goats from "./pages/Goats"; // Añade esta línea para importar el componente Goats
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protected/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <>
                  <LoaderWrapper />
                  <Layout />
                </>
              }
            >
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/producto"
                element={
                  <ProtectedRoute>
                    <Producto />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categoria"
                element={
                  <ProtectedRoute>
                    <Categoria />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/preguntas"
                element={
                  <ProtectedRoute>
                    <Preguntas />
                  </ProtectedRoute>
                }
              />
              {/* Añade esta nueva ruta para el componente Goats */}
              <Route
                path="/goats"
                element={
                  <ProtectedRoute>
                    <Goats />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;