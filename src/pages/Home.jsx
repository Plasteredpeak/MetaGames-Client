import React, { useEffect, useState, useCallback } from "react";
import { getGames, searchGames } from "../services/igdb.services";
import Loader from "../components/Loader";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchGames = async () => {
    setIsLoading(true);
    const gameResults = await getGames();
    setGames(gameResults);
    setIsLoading(false);
  };

  const fetchMoreGames = async () => {
    if (games.next) {
      setBottomLoading(true);
      const gameResults = await getGames(games.next);
      setGames({
        ...gameResults,
        results: [...games.results, ...gameResults.results],
      });
      setBottomLoading(false);
    }
  };

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      if (searchQuery === "") {
        fetchGames();
      } else {
        const searchResults = await searchGames(searchQuery);
        setGames(searchResults);
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(search, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="mx-8 my-4">
      <h1 className="mt-4 text-3xl font-bold text-secondary">All Games</h1>
      <div className="m-4 grid min-h-[90vh] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-4 ">
          <label className="input input-secondary mb-4 flex w-1/2 items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="cursor-pointer text-xl" />
          </label>
        </div>
        {isLoading ? (
          <div className="col-span-4 flex items-center justify-center">
            <Loader />
          </div>
        ) : games?.length === 0 ||
          games?.results === undefined ||
          games?.results.length === 0 ? (
          <div className="col-span-4 flex h-48 items-center justify-center">
            <p>No games found.</p>
          </div>
        ) : (
          <>
            {games?.results.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() =>
                  navigate(`/game/${game.id}`, { state: { game } })
                }
              />
            ))}
          </>
        )}
      </div>
      {!isLoading && (
        <div className="my-8 flex items-center justify-center">
          <button
            className="btn btn-outline btn-secondary"
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
