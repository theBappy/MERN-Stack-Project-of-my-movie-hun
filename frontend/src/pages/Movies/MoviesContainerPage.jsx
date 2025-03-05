import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies.js";

import { useFetchGenresQuery } from "../../redux/api/genre.js";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between p-6">
      {/* Sidebar Navigation */}
      <nav className="flex flex-row lg:flex-col gap-4 lg:w-1/4 w-full mb-6 lg:mb-0">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out p-3 w-full lg:w-auto rounded text-lg font-semibold 
              ${selectedGenre === g._id ? "bg-gray-300" : "hover:bg-gray-200"}
            `}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <section className="flex flex-col w-full lg:w-3/4 gap-8">
        <div>
          <h1 className="text-xl font-bold mb-4">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div>
          <h1 className="text-xl font-bold mb-4">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div>
          <h1 className="text-xl font-bold mb-4">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
