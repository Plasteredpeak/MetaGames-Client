import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = () => {
    let games = JSON.parse(localStorage.getItem("cart")) || [];

    games = games.map((game) => {
      game.price = calculatePrice(game.playtime, game.rating);

      return game;
    });

    setCart(games);
  };

  const calculatePrice = (playtime, rating) => {
    const basePricePerHour = 0.01;
    const playtimeFactor = playtime * basePricePerHour;
    const ratingFactor = rating * (basePricePerHour * 5);
    const totalPrice = playtimeFactor + ratingFactor;
    return parseFloat(totalPrice.toFixed(2));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((game) => game.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    let total = 0;
    cart.forEach((game) => {
      total += game.price;
    });

    setTotal(parseFloat(total.toFixed(2)));
  }, [cart]);

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
                        {game.price} ETH
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          className="btn btn-error btn-sm text-white"
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
                    <td className="border px-4 py-2 text-center">
                      {total} ETH
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
