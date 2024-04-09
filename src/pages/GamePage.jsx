import React from "react";
import { useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaCirclePlus } from "react-icons/fa6";

const GamePage = () => {
  const location = useLocation();
  const game = location.state?.game;
  console.log(game);

  return (
    <div className="mx-10 min-h-[90vh] py-8">
      {game && (
        <>
          <h1 className="mb-8 text-4xl font-bold">{game.name}</h1>
          <div className="flex flex-wrap items-start justify-between">
            <div className="flex w-full flex-col  p-4 md:w-1/2 lg:w-1/3 xl:w-2/5">
              <Carousel
                arrows
                responsive={{
                  desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 1,
                  },
                  tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 1,
                  },
                  mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                  },
                }}
                sliderClass=""
                slidesToSlide={1}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                transitionDuration={700}
                customTransition={"transform 700ms ease-in-out"}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
              >
                {game.short_screenshots.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt={game.name}
                    className="w-full rounded-md shadow-md"
                  />
                ))}
              </Carousel>
              <button className=" btn btn-outline btn-primary mt-4 w-full self-center">
                <FaCirclePlus className="mr-2 text-xl" />
                Add to Cart
              </button>
            </div>
            <div className="w-full p-4 md:w-1/2 lg:w-2/3 xl:w-3/5">
              <div className="mb-8">
                <p className="mb-2 text-lg">
                  <span className="font-semibold">Released:</span>{" "}
                  {game.released}
                </p>
                <p className="mb-2 text-lg">
                  <span className="font-semibold">Rating:</span> {game.rating}/5
                </p>
                <p className="mb-2 text-lg">
                  <span className="font-semibold">Playtime:</span>{" "}
                  {game.playtime} hours
                </p>
              </div>
              <div className="mb-2">
                <h2 className="mb-2 text-xl font-semibold">Genres:</h2>
                <div className="flex flex-wrap">
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-md mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <h2 className="mb-2 text-xl font-semibold">Platforms:</h2>
                <div className="flex max-w-xl flex-wrap">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform.platform.id}
                      className="text-md mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1"
                    >
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <h2 className="mb-2 text-xl font-semibold">Stores:</h2>
                <div className="flex flex-wrap">
                  {game.stores.map((store) => (
                    <a
                      key={store.id}
                      href={
                        store.store.domain.includes("http")
                          ? store.store.domain
                          : "https://" + store.store.domain
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                      {store.store.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
