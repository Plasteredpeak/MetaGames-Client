import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";

const authRoutes = [
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
];

const routes = [
  ...authRoutes,
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/game/:id", element: <GamePage /> },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
