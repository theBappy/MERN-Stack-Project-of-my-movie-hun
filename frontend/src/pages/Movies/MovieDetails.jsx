import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa"; 
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies.js";
import MovieTabs from "./MovieTabs.jsx";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id: movieId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully!");
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-white font-semibold hover:underline inline-block"
        >
          &larr; Go Back
        </Link>
      </div>

      {/* Movie Image and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Movie Image */}
        <div className="flex justify-center">
          <img
            src={movie?.image}
            className="w-full max-w-lg rounded-lg shadow-lg"
            alt={movie?.name}
          />
        </div>

        {/* Movie Information */}
        <div>
          <h2 className="text-4xl font-extrabold mb-4">{movie?.name}</h2>
          <p className="text-lg text-gray-400 mb-6">{movie?.detail}</p>
          <p className="text-xl font-semibold">Releasing Date: {movie?.year}</p>

          {/* Movie Cast */}
          {movie?.cast && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Cast:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {movie.cast.map((c, index) => (
                  <li key={index}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Star Rating (Static for all movies) */}
          <div className="mt-4 flex items-center space-x-1">
            <label htmlFor="rating" className="font-bold"> IMDB Ratings:</label>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500 ml-1" />
            ))}   
          </div>
        </div>
      </div>

      {/* Movie Tabs - Reviews & Ratings */}
      <div className="mt-12">
        <MovieTabs
          submitHandler={submitHandler}
          rating={rating}
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
