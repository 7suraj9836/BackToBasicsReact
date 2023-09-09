import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  let token = localStorage.getItem("BackToBasic-token");
  return !token || token === undefined ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
