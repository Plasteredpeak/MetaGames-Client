import React from "react";
import {
  FaStar,
  FaStarHalf,
  FaPlaystation,
  FaXbox,
  FaSteam,
} from "react-icons/fa6";

const GameCard = ({ game, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="game-card transform cursor-pointer overflow-hidden  rounded-lg shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="card-image h-48 w-full object-cover"
      />
      <div className="card-content p-4">
        <h2 className="card-title mb-2 text-xl font-bold">{game.name}</h2>
        <div className="flex items-center justify-between">
          <div className="card-rating flex items-center justify-center text-yellow-500">
            {[...Array(Math.floor(game.rating))].map((_, index) => (
              <FaStar key={index} className="mr-1 text-lg" />
            ))}
            {game.rating % 1 >= 0.5 && <FaStarHalf className="mr-1" />}
            <p className="ml-1 text-sm text-secondary">{game.rating}/5</p>
          </div>

          <div className="card-platforms flex">
            {(() => {
              let playstationAdded = false;
              let xboxAdded = false;

              return game.platforms.map((platform) => (
                <div key={platform.platform.id}>
                  {!playstationAdded &&
                    platform.platform.slug.includes("playstation") && (
                      <>
                        <FaPlaystation className="mr-1 text-lg text-blue-600" />
                        {(playstationAdded = true)}
                      </>
                    )}
                  {!xboxAdded && platform.platform.slug.includes("xbox") && (
                    <>
                      <FaXbox className="mr-1 text-lg text-green-600" />
                      {(xboxAdded = true)}
                    </>
                  )}
                  {platform.platform.slug === "pc" && (
                    <FaSteam className="mr-1 text-lg text-secondary" />
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
