import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MyRouteMiddleware = ({ fallbackPath }) => {
  const  isAuthenticated = sessionStorage.getItem("isAuthenticated")
  if (isAuthenticated === "true") {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} />;
  }
};

export default MyRouteMiddleware;
