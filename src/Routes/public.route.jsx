import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PublicRoute = () => {
  let token = localStorage.getItem("BackToBasic-token");
  console.log(token);
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
  
};

export default PublicRoute;

