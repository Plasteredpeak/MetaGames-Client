import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";

const routes = [
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/game/:id", element: <GamePage /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
