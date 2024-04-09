import React, { useEffect, useState } from "react";

import { getGames } from "../services/igdb.services";

import Loader from "../components/Loader";
import GameCard from "../components/GameCard";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);

  const navigate = useNavigate();

  const fetchGames = async () => {
    const gameResults = await getGames();
    setGames(gameResults);
    setIsLoading(false);
    console.log(games);
  };

  const fetchMoreGames = async () => {
    if (games.next) {
      setBottomLoading(true);
      console.log(games.next);
      const gameResults = await getGames(games.next);
      console.log(gameResults);
      setGames({
        ...gameResults,
        results: [...games.results, ...gameResults.results],
      });
      setBottomLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="mx-4 my-2">
      <h1 className="mt-4 text-3xl font-bold text-secondary">All Games</h1>
      <div className="m-4 grid min-h-[90vh] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {isLoading ? (
          <div className="col-span-4 flex items-center justify-center">
            <Loader />
          </div>
        ) : games.length === 0 ? (
          <div className="flex h-48 items-center justify-center">
            <p>No games found.</p>
          </div>
        ) : (
          games.results.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => navigate(`/game/${game.id}`, { state: { game } })}
            />
          ))
        )}
      </div>
      {!isLoading && (
        <div className="m-2 flex items-center justify-center">
          <button
            className="btn btn-secondary btn-outline"
            onClick={() => fetchMoreGames()}
          >
            {bottomLoading && <span class="loading loading-spinner"></span>}
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
