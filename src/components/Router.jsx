import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const routes = [
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
