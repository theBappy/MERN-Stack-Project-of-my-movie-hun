import { useDeleteCommentMutation, useGetAllMoviesQuery } from '../../redux/api/movies.js'
import { toast } from 'react-toastify'

const AllComments = () => {
    const { data: movies, refetch, isLoading } = useGetAllMoviesQuery();
    const [deleteComment] = useDeleteCommentMutation();

    const handleDeleteComment = async (movieId, reviewId) => {
        try {
            await deleteComment({ movieId, reviewId });
            toast.success("Comment deleted successfully");
            refetch();
        } catch (error) {
            console.error("Error deleting comment: ", error);
            toast.error("Failed to delete comment");
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-400">Loading comments...</p>;
    }

    const moviesWithReviews = movies?.filter(movie => Array.isArray(movie.reviews) && movie.reviews.length > 0);

    return (
        <div className="mt-20 px-6">
            {moviesWithReviews?.length > 0 ? (
                moviesWithReviews.map((movie) => (
                    <section 
                        className="flex flex-col justify-center items-center w-full" 
                        key={movie._id}
                    >
                        {movie.reviews.map((review) => (
                            <div 
                                key={review._id}
                                className="bg-[#1a1a1a] p-5 rounded-lg w-full max-w-lg mt-6 shadow-md"
                            >
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <strong className="text-gray-300">
                                        {review.name || "Anonymous"}
                                    </strong>
                                    <p className="text-sm text-gray-400">
                                        {review?.createdAt ? review.createdAt.substring(0, 10) : "N/A"}
                                    </p>
                                </div>
                                <p className="my-4 text-gray-300">{review.comment || "No comment provided."}</p>

                                <button 
                                    className="text-red-500 hover:text-red-400 transition duration-200 font-medium text-sm"
                                    onClick={() => handleDeleteComment(movie._id, review._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </section>
                ))
            ) : (
                <p className="text-gray-500 text-center">No reviews available.</p>
            )}
        </div>
    );
};

export default AllComments;