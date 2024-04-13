import React, { useEffect, useState } from "react";

import GameCard from "../components/GameCard";

import Web3 from "web3";
import { getGameById } from "../services/igdb.services";
import { gameABI } from "../utils/contract.abi";

const contractAddress = import.meta.env.VITE_GAME_CONTRACT_ADDRESS;

const MyGames = () => {
  const [games, setGames] = useState([]);

  const getGamesFromBlockchain = async () => {
    const web3 = new Web3(window.ethereum);
    //     'ethereum.enable()' is deprecated and may be removed in the future. Please use the 'eth_requestAccounts' RPC method instead.
    // For more information

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const contract = new web3.eth.Contract(gameABI, contractAddress);

    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0]);
    const games = await contract.methods.getGamesByOwner(accounts[0]).call();
    console.log(games);
    // retuns an object with the following structure{
    //   "0": [
    //     "1"
    //   ],
    //   "1": [
    //     "testGame"
    //   ],
    //   "2": [
    //     "12"
    //   ],
    //   "__length__": 3
    // }

    //use the gameIds to get the games from the igdb api
    const gamesArray = games[0];
    const gamesInfo = [];
    for (const gameId of gamesArray) {
      const game = await getGameById(gameId);
      gamesInfo.push(game);
    }
    console.log(gamesInfo);
    setGames(gamesInfo);
  };

  useEffect(() => {
    getGamesFromBlockchain();
  }, []);

  return (
    <div className="mx-8 my-4">
      <h1 className="mt-4 text-3xl font-bold text-secondary">My Games</h1>
      <div className="m-4 grid min-h-[90vh] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {games.length === 0 ? (
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-xl">No games found</p>
          </div>
        ) : (
          games.map((game) => <GameCard key={game.id} game={game} />)
        )}
      </div>
    </div>
  );
};

export default MyGames;
