import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getGames = async (next) => {
  try {
    if (next) {
      const response = await axios.get(next);
      return response.data;
    }
    const response = await axios.get(`${backendUrl}/games`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch games. please reload");
  }
};

export const getGamesByGenre = async (genre) => {
  try {
    const response = await axios.get(`${backendUrl}/games/?genres=${genre}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch games by genre. please reload");
  }
};

export const searchGamesByGenre = async (genre, queryString) => {
  try {
    const response = await axios.get(
      `${backendUrl}/games?genres=${genre}&search=${queryString}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to search games by genre. please reload");
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${backendUrl}/games/genres`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch genres. please reload");
  }
};

export const searchGames = async (queryString) => {
  try {
    const response = await axios.get(
      `${backendUrl}/games?search=${queryString}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to search games. please reload");
  }
};

export const getGameById = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/games/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch game by ID. please reload");
  }
};
