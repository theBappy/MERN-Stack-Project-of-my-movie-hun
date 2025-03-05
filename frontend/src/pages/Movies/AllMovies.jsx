import { useGetAllMoviesQuery } from "../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../redux/api/genre.js";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies.js";
import { useEffect } from "react";
import MovieCard from "./MovieCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.webp";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice.js";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMoviesYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <section
        className="relative w-full h-[40rem] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black opacity-80"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4">The Movies Hub</h1>
          <p className="text-lg md:text-2xl">Cinematic Odyssey: Unveiling the Magic of Movies</p>
        </div>
      </section>

      <div className="w-full z-10 max-w-4xl mt-[-4rem] p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search Movie..."
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          className="p-3 border rounded-lg text-gray-700 focus:outline-none"
          onChange={(e) => handleGenreClick(e.target.value)}
        >
          <option value="">Genres</option>
          {genres?.map((genre) => (
            <option key={genre._id} value={genre._id}>{genre.name}</option>
          ))}
        </select>
        <select
          className="p-3 border rounded-lg text-gray-700 focus:outline-none"
          onChange={(e) => handleYearChange(e.target.value)}
        >
          <option value="">Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          className="p-3 border rounded-lg text-gray-700 focus:outline-none"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="new">New Movies</option>
          <option value="top">Top Movies</option>
          <option value="random">Random Movies</option>
        </select>
      </div>

      <section className="w-full max-w-6xl mt-10 flex flex-wrap justify-center gap-6">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default AllMovies;
