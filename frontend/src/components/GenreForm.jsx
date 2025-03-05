const GenreForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="py-3 px-4 border border-gray-300 rounded-lg w-full md:w-[40rem]
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter genre name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-5 rounded-lg 
                hover:bg-teal-600 transition-all duration-200 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              {buttonText}
            </button>
  
            {handleDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-5 rounded-lg
                  hover:bg-red-600 transition-all duration-200 ease-in-out 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default GenreForm;
  