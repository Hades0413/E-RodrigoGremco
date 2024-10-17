import React from "react";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";

const Layout: React.FC = () => {
  const { loading } = useLoading();

  return (
    <div className={loading ? "loading" : ""}>
      <Nav />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
