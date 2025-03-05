import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre.js";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm.jsx";
import Modal from "../../components/Modal.jsx";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Genre name is required");
      return;
    }
    try {
      const result = await createGenre({ name }).unwrap();
      setName("");
      toast.success(`${result.name} created successfully!`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create genre, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName.trim()) {
      toast.error("Genre name is required!");
      return;
    }
    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName },
      }).unwrap();

      toast.success(`${result.name} updated successfully!`);
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update genre, try again.");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      await deleteGenre({ id: selectedGenre._id }).unwrap();
      toast.success(`${selectedGenre.name} deleted successfully!`);
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete genre, try again.");
    }
  };

  const openModal = (genre) => {
    setSelectedGenre(genre);
    setUpdatingName(genre.name);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGenre(null);
    setUpdatingName("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Manage Genres</h1>

      {/* Genre Form */}
      <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

      {/* Genre List */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
            onClick={() => openModal(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalVisible} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Genre</h2>
        <GenreForm
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdateGenre}
          buttonText="Update"
        />
        <button
          className="bg-red-500 text-white py-2 px-4 mt-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200 w-full"
          onClick={handleDeleteGenre}
        >
          Delete Genre
        </button>
      </Modal>
    </div>
  );
};

export default GenreList;
