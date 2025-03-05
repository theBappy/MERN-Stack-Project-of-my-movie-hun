const SecondaryCard = ({ pill, content, info }) => {
    return (
      <div className="relative bg-transparent mr-2 w-[16rem] h-[13rem] mt-15 rounded-xl shadow-lg bg-gradient-to-b from-sky-400 to-blue-600 transition-transform transform hover:scale-105">
        {/* Pill Badge with better contrast */}
        <div className="absolute z-10 -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-700 rounded-full py-2 px-6 text-xs font-semibold shadow-md border border-blue-300">
          {pill}
        </div>
  
        {/* Main Content */}
        <div className="flex items-center justify-center h-full">
          <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">{content}</h2>
        </div>
  
        {/* Info Text */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white opacity-90">
          {info}
        </div>
  
        {/* Soft Overlay for Depth */}
        <div className="absolute inset-0 bg-black/5 rounded-xl"></div>
      </div>
    );
  };
  
  export default SecondaryCard;
  