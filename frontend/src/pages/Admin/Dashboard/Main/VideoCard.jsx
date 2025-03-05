const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex ml-5 items-center w-[90%] mt-5 bg-gradient-to-b from-sky-500 to-blue-600 rounded-lg p-4 shadow-md hover:scale-105 transition-transform">
      {/* Image Section */}
      <div>
        <img src={image} alt="Card Image" className="h-16 w-16 rounded-md object-cover" />
      </div>

      {/* Text Section */}
      <div className="ml-4 flex-grow">
        <h2 className="text-xl text-white font-semibold">{title}</h2>
        <p className="text-sm text-gray-200 mb-2">{date}</p>
      </div>

      {/* Comments Section */}
      <div className="text-white text-lg font-semibold">
        {comments}
      </div>
    </div>
  );
};

export default VideoCard;
