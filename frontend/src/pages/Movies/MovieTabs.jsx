import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="mt-8">
      {/* Review Form */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <label htmlFor="comment" className="block text-lg font-semibold">
              Write Your Review
            </label>
            <textarea
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              required
              value={comment}
              className="w-full p-3 border rounded-lg text-black"
              placeholder="Share your thoughts about this movie..."
            ></textarea>
            <button
              type="submit"
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-gray-400">
            Please <Link to="/login" className="text-teal-400 hover:underline">Sign In</Link> to write a review.
          </p>
        )}
      </section>

      {/* Reviews Section */}
      <section className="mt-12">
        {!movie?.reviews?.length ? (
          <p className="text-gray-400">No reviews yet. Be the first to write one!</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews?.map((review) => (
              <div
                key={review?._id || Math.random()} 
                className="bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-teal-400">{review?.name || "Anonymous"}</strong>
                  <p className="text-gray-400 text-sm">
                    {review?.createdAt?.substring(0, 10) || "Unknown Date"}
                  </p>
                </div>
                <p className="text-gray-300">{review?.comment || "No comment provided."}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
