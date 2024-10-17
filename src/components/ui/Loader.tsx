// src/Components/ui/Loader.tsx
import React from "react";
import { Atom } from "react-loading-indicators";
import "../../styles/loader/Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Atom color="#622e76" size="medium" />
    </div>
  );
};

export default Loader;
