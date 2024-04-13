import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import Category from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import MyGames from "../pages/MyGames";

const categories = [
  "action",
  "adventure",
  "role-playing-games-rpg",
  "strategy",
  "shooter",
  "casual",
  "simulation",
  "puzzle",
  "racing",
  "sports",
  "board-games",
  "educational",
];

const authRoutes = [
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
];

const routes = [
  ...authRoutes,
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/game/:id", element: <GamePage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/my-games", element: <MyGames /> },
  ...categories.map((category) => ({
    path: `/game/${category}`,
    element: <Category genre={category} />,
  })),
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
