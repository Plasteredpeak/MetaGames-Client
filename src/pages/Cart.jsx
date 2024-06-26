import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Web3 from "web3";
import { gameABI, tokenABI } from "../utils/contract.abi";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [freeTokens, setFreeTokens] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event("cartAccessed"));
  }, []);

  const addTokens = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const contractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;

      const contract = new web3.eth.Contract(tokenABI, contractAddress);

      await contract.methods.requestTokens(100).send({
        from: accounts[0],
      });

      toast.success("You have received a 100 GT tokens. ");
      setFreeTokens(true);
      window.dispatchEvent(new Event("login"));
    } catch (error) {
      console.error("Failed to enable Ethereum:", error);
      toast.error("Failed to enable Ethereum");
    }
  };

  const getCart = () => {
    let games = JSON.parse(localStorage.getItem("cart")) || [];

    games = games.map((game) => {
      game.price = calculatePrice(game.playtime, game.rating);

      return game;
    });

    setCart(games);
  };

  const calculatePrice = (playtime, rating) => {
    const basePricePerHour = 0.05;
    const playtimeFactor = Math.floor(playtime * (basePricePerHour * 10));
    const ratingFactor = Math.floor(rating * (basePricePerHour * 50));
    const totalPrice = playtimeFactor + ratingFactor;
    return totalPrice;
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((game) => game.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (updatedCart.length === 0) {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    let total = 0;
    cart.forEach((game) => {
      total += game.price;
    });

    setTotal(total);
  }, [cart]);

  const getPayment = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        const contractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;

        const contract = new web3.eth.Contract(tokenABI, contractAddress);

        //transfer tokens to the owner
        await contract.methods.transferTokens(total).send({
          from: accounts[0],
        });

        toast.success(`Payment of ${total} GT tokens successful`);
        return true;
      } catch (error) {
        console.log("Failed to enable Ethereum:", error);
        return false;
      }
    }
  };

  const buyGame = async () => {
    setLoading(true);
    const web3 = new Web3(window.ethereum);
    try {
      const paid = await getPayment();
      if (!paid) {
        toast.error("Payment failed");
        setLoading(false);
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const contractAddress = import.meta.env.VITE_GAME_CONTRACT_ADDRESS;

      const contract = new web3.eth.Contract(gameABI, contractAddress);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      for (const game of cart) {
        try {
          await contract.methods
            .addGame(game.id.toString(), game.name, game.price.toString())
            .send({
              from: account,
            });
          removeFromCart(game.id);
        } catch (error) {
          console.error(`Failed to add game ${game.id}:`, error);
          toast.error(`Failed to add game ${game.id}`);
        }
      }

      toast.success("Games purchased successfully");
      localStorage.setItem("cart", JSON.stringify([]));
      setCart([]);

      window.dispatchEvent(new Event("login"));
    } catch (error) {
      console.error("Failed to enable Ethereum:", error);
      toast.error("Failed to enable Ethereum");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="mx-10 min-h-[90vh] py-8">
          <h1 className="mb-8 text-4xl font-bold">Cart</h1>
          <p className="text-center text-xl">No games in cart</p>
        </div>
      ) : (
        <div className="mx-10 min-h-[90vh] py-8">
          <h1 className="mb-8 text-4xl font-bold">Cart</h1>
          <div className="flex flex-wrap items-start justify-between">
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-center">Game</th>
                    <th className="border px-4 py-2 text-center">Playtime</th>
                    <th className="border px-4 py-2 text-center">Rating</th>
                    <th className="border px-4 py-2 text-center">Price</th>
                    <th className="border px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((game) => (
                    <tr key={game.id}>
                      <td className="border px-4 py-2 text-center">
                        {game.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {game.playtime}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {game.rating}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {game.price} GT
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          className="btn btn-error btn-sm text-gray-100"
                          onClick={() => removeFromCart(game.id)}
                        >
                          <FaTrashAlt />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-right">
                      Total
                    </td>
                    <td className="border px-4 py-2 text-center">{total} GT</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              className={`flex w-full justify-center ${freeTokens ? "disabled" : ""}`}
            >
              <button
                className="btn btn-secondary mr-2 mt-4"
                onClick={addTokens}
              >
                Get Free Tokens
              </button>
              <button
                className={`btn btn-primary mt-4 ${loading ? "disabled" : ""}`}
                onClick={buyGame}
              >
                {loading && <span className="loading loading-spinner"></span>}
                Buy Games
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
