import React, { useEffect, useState } from "react";

import GameCard from "../components/GameCard";
import Loader from "../components/Loader";

import Web3 from "web3";

import { getGameById } from "../services/igdb.services";
import { gameABI } from "../utils/contract.abi";

const contractAddress = import.meta.env.VITE_GAME_CONTRACT_ADDRESS;

const MyGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  const getGamesFromBlockchain = async () => {
    setLoading(true);
    const web3 = new Web3(window.ethereum);

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const contract = new web3.eth.Contract(gameABI, contractAddress);

    const accounts = await web3.eth.getAccounts();

    const games = await contract.methods.getGamesByOwner(accounts[0]).call();

    //use the gameIds to get the games from the igdb api
    const gamesArray = games[0];
    const gamesInfo = [];
    for (const gameId of gamesArray) {
      const game = await getGameById(gameId);
      gamesInfo.push(game);
    }

    setGames(gamesInfo);
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userAddress")) {
      setCheckLogin(true);
      getGamesFromBlockchain();
    }
  }, []);

  return (
    <div className="mx-8 my-4">
      <h1 className="mt-4 text-3xl font-bold text-secondary">My Games</h1>
      {loading ? (
        <div className="flex min-h-[90vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="m-4 grid min-h-[90vh] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
          {games?.length === 0 ? (
            <div className="col-span-4 flex items-center justify-center">
              {checkLogin ? (
                <p className="text-xl">No games found</p>
              ) : (
                <p className="text-xl">Please login to view your games</p>
              )}
            </div>
          ) : (
            games.map((game) => <GameCard key={game.id} game={game} />)
          )}
        </div>
      )}
    </div>
  );
};

export default MyGames;
