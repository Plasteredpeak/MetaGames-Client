import React, {
  useEffect,
  useState,
  componentDidMount,
  componentWillUnmount,
} from "react";

import { getGames } from "../services/igdb.services";

import {
  FaStar,
  FaStarHalf,
  FaPlaystation,
  FaXbox,
  FaSteam,
} from "react-icons/fa6";
import Loader from "../components/Loader";

export default function Home() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);

  const fetchGames = async () => {
    const gameResults = await getGames();

    // {
    //   count: 865674,
    //   next: 'https://api.rawg.io/api/games?key=0b78f68d901045509e9fbb8f25c45387&page=2',
    //   previous: null,
    //   results: [
    //     {
    //       id: 13537,
    //       slug: 'half-life-2',
    //       name: 'Half-Life 2',
    //       released: '2004-11-16',
    //       tba: false,
    //       background_image: 'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg',
    //       rating: 4.49,
    //       rating_top: 5,
    //       ratings: [Array],
    //       ratings_count: 3818,
    //       reviews_text_count: 17,
    //       added: 14506,
    //       added_by_status: [Object],
    //       metacritic: 96,
    //       playtime: 7,
    //       suggestions_count: 555,
    //       updated: '2024-04-08T04:03:43',
    //       user_game: null,
    //       reviews_count: 3842,
    //       saturated_color: '0f0f0f',
    //       dominant_color: '0f0f0f',
    //       platforms: [Array],
    //       parent_platforms: [Array],
    //       genres: [Array],
    //       stores: [Array],
    //       clip: null,
    //       tags: [Array],
    //       esrb_rating: [Object],
    //       short_screenshots: [Array]
    //     },
    //     {
    //       id: 4286,
    //       slug: 'bioshock',
    //       name: 'BioShock',
    //       released: '2007-08-21',
    //       tba: false,
    //       background_image: 'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg',
    //       rating: 4.36,
    //       rating_top: 5,
    //       ratings: [Array],
    //       ratings_count: 3219,
    //       reviews_text_count: 25,
    //       added: 13756,
    //       added_by_status: [Object],
    //       metacritic: 96,
    //       playtime: 3,
    //       suggestions_count: 646,
    //       updated: '2024-04-04T20:51:17',
    //       user_game: null,
    //       reviews_count: 3260,
    //       saturated_color: '0f0f0f',
    //       dominant_color: '0f0f0f',
    //       platforms: [Array],
    //       parent_platforms: [Array],
    //       genres: [Array],
    //       stores: [Array],
    //       clip: null,
    //       tags: [Array],
    //       esrb_rating: [Object],
    //       short_screenshots: [Array]
    //     },
    //     {
    //       id: 32,
    //       slug: 'destiny-2',
    //       name: 'Destiny 2',
    //       released: '2017-09-06',
    //       tba: false,
    //       background_image: 'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
    //       rating: 3.53,
    //       rating_top: 4,
    //       ratings: [Array],
    //       ratings_count: 2582,
    //       reviews_text_count: 19,
    //       added: 13572,
    //       added_by_status: [Object],
    //       metacritic: 82,
    //       playtime: 5,
    //       suggestions_count: 1223,
    //       updated: '2024-04-09T00:51:55',
    //       user_game: null,
    //       reviews_count: 2607,
    //       saturated_color: '0f0f0f',
    //       dominant_color: '0f0f0f',
    //       platforms: [Array],
    //       parent_platforms: [Array],
    //       genres: [Array],
    //       stores: [Array],
    //       clip: null,
    //       tags: [Array],
    //       esrb_rating: [Object],
    //       short_screenshots: [Array]
    //     },
    //     {
    //       id: 58175,
    //       slug: 'god-of-war-2',
    //       name: 'God of War (2018)',
    //       released: '2018-04-20',
    //       tba: false,
    //       background_image: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
    //       rating: 4.57,
    //       rating_top: 5,
    //       ratings: [Array],
    //       ratings_count: 4695,
    //       reviews_text_count: 71,
    //       added: 13398,
    //       added_by_status: [Object],
    //       metacritic: 94,
    //       playtime: 13,
    //       suggestions_count: 594,
    //       updated: '2024-04-08T18:40:45',
    //       user_game: null,
    //       reviews_count: 4795,
    //       saturated_color: '0f0f0f',
    //       dominant_color: '0f0f0f',
    //       platforms: [Array],
    //       parent_platforms: [Array],
    //       genres: [Array],
    //       stores: [Array],
    //       clip: null,
    //       tags: [Array],
    //       esrb_rating: [Object],
    //       short_screenshots: [Array]
    //     },
    //   ],
    //   seo_title: 'All Games',
    //   seo_description: '',
    //   seo_keywords: '',
    //   seo_h1: 'All Games',
    //   noindex: false,
    //   nofollow: false,
    //   description: '',
    //   filters: {
    //     years: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object]
    //     ]
    //   },
    //   nofollow_collections: [ 'stores' ]
    // }
    // };
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
      <h1 className="mt-4 text-3xl font-bold text-primary-dark">All Games</h1>
      <div className="m-4 grid min-h-[90vh] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {isLoading ? (
          <div className="col-span-3 flex items-center justify-center">
            <Loader />
          </div>
        ) : games.length === 0 ? (
          <div className="flex h-48 items-center justify-center">
            <p>No games found.</p>
          </div>
        ) : (
          games.results.map((game) => (
            <div
              key={game.id}
              className="game-card transform overflow-hidden rounded-lg bg-gray-200 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="card-image h-48 w-full object-cover"
              />
              <div className="card-content p-4">
                <h2 className="card-title mb-2 text-xl font-bold">
                  {game.name}
                </h2>
                <div className="flex items-center  justify-between">
                  <div className="card-rating flex items-center justify-center text-yellow-500">
                    {[...Array(Math.floor(game.rating))].map((_, index) => (
                      <FaStar key={index} className="mr-1 text-lg" />
                    ))}
                    {game.rating % 1 >= 0.5 && <FaStarHalf className="mr-1" />}
                    <p className="ml-1 text-sm text-primary-dark">
                      {game.rating}/5
                    </p>
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
                          {!xboxAdded &&
                            platform.platform.slug.includes("xbox") && (
                              <>
                                <FaXbox className="mr-1 text-lg text-green-600" />
                                {(xboxAdded = true)}
                              </>
                            )}
                          {platform.platform.slug === "pc" && (
                            <FaSteam className="mr-1 text-lg text-primary-dark" />
                          )}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="m-2 flex items-center justify-center">
        <button
          className="mr-4 rounded-md bg-primary-dark p-3 px-2 text-gray-100"
          onClick={() => fetchMoreGames()}
        >
          Load More
        </button>
        <div className="w-12">{bottomLoading && <Loader />}</div>
      </div>
    </div>
  );
}
