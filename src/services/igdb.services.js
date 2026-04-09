import axios from "axios";
import { toast } from "react-toastify";

const rawgApiKey = import.meta.env.VITE_RAWG_API_KEY;
const rawgBaseUrl = "https://api.rawg.io/api";

const rawgClient = axios.create({
  baseURL: rawgBaseUrl,
  headers: {
    "content-type": "application/json",
  },
});

const hasApiKey = () => {
  if (!rawgApiKey) {
    toast.error("Missing VITE_RAWG_API_KEY in .env");
    return false;
  }

  return true;
};

export const getGames = async (next) => {
  try {
    if (!hasApiKey()) return { results: [], next: null, previous: null };

    if (next) {
      const response = await axios.get(next);
      return response.data;
    }

    const response = await rawgClient.get("/games", {
      params: { key: rawgApiKey },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch games. please reload");
    return { results: [], next: null, previous: null };
  }
};

export const getGamesByGenre = async (genre) => {
  try {
    if (!hasApiKey()) return { results: [], next: null, previous: null };

    if (genre?.startsWith("http")) {
      const response = await axios.get(genre);
      return response.data;
    }

    const response = await rawgClient.get("/games", {
      params: {
        key: rawgApiKey,
        genres: genre,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch games by genre. please reload");
    return { results: [], next: null, previous: null };
  }
};

export const searchGamesByGenre = async (genre, queryString) => {
  try {
    if (!hasApiKey()) return { results: [], next: null, previous: null };

    const response = await rawgClient.get("/games", {
      params: {
        key: rawgApiKey,
        genres: genre,
        search: queryString,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to search games by genre. please reload");
    return { results: [], next: null, previous: null };
  }
};

export const getGenres = async () => {
  try {
    if (!hasApiKey()) return { results: [] };

    const response = await rawgClient.get("/genres", {
      params: { key: rawgApiKey },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch genres. please reload");
    return { results: [] };
  }
};

export const searchGames = async (queryString) => {
  try {
    if (!hasApiKey()) return { results: [], next: null, previous: null };

    const response = await rawgClient.get("/games", {
      params: {
        key: rawgApiKey,
        search: queryString,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to search games. please reload");
    return { results: [], next: null, previous: null };
  }
};

export const getGameById = async (id) => {
  try {
    if (!hasApiKey()) return null;

    const response = await rawgClient.get(`/games/${id}`, {
      params: { key: rawgApiKey },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch game by ID. please reload");
    return null;
  }
};
