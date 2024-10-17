import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { LoadingProvider } from "./context/LoadingContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoaderWrapper from "./components/ui/LoaderWrapper";
import "@sweetalert2/theme-dark/dark.css";
import "@sweetalert2/theme-dark/dark.css";
import Users from "./pages/Users";
import Producto from "./pages/Producto";
import Categoria from "./pages/Categoria";

function App() {
  return (
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
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/producto" element={<Producto />} />
            <Route path="/categoria" element={<Categoria />} />
          </Route>
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
