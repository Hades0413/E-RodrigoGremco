import React from "react";
import { useLoading } from "../../context/LoadingContext";
import Loader from "../ui/Loader";

const LoaderWrapper: React.FC = () => {
  const { loading } = useLoading();
  return loading ? <Loader /> : null;
};

export default LoaderWrapper;
