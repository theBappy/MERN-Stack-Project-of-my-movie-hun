import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../redux/api/genre.js";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetail },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?.id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "genre") {
      setMovieData((prevData) => ({
        ...prevData,
        genre: value, 
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields.");
        return;
      }
      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);
        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetail);
          toast.error("Failed to upload image.");
          return;
        }
        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie added to database.");
      }
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="container mt-20 ml-15 flex justify-center items-center">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              className="border px-4 py-2 mt-2 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              className="border px-4 py-2 mt-2 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              className="border px-4 py-2 mt-2 w-full"
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast(comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              className="border px-4 py-2 mt-2 w-full"
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              className="border px-4 py-2 mb-4 mt-2 w-full"
              onChange={handleChange}
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                display: !selectedImage ? "none" : "block",
              }}
            />
          </label>
        </div>

        <button
          type="button"
          disabled={isCreatingMovie || isUploadingImage}
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          {" "}
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
