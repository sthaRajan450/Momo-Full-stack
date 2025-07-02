import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ compo }) => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuth && !isLoading) {
    useEffect(() => {
      navigate("/login");
    }, [isAuth, isLoading, navigate]);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return compo;
};

export default ProtectedRoutes;
