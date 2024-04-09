import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getGames = async (next) => {
  if (next) {
    const response = await axios.get(next);
    console.log(response.data);
    return response.data;
  }
  const response = await axios.get(`${backendUrl}/games`);
  return response.data.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${backendUrl}/games/genres`);
  return response.data.data;
};
