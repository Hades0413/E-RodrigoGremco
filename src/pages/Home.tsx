import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import Loader from "../components/ui/Loader";
import "../styles/Style.css";
import ProductoListar from "../components/common/productos/ProductoListar";

const Home: React.FC = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>yara causa</h1>
          <ProductoListar />
        </div>
      )}
    </>
  );
};

export default Home;