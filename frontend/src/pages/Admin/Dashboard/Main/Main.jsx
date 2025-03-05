import RealTimeCard from "./RealTimeCard";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies.js";
import { useGetUsersQuery } from "../../../../redux/api/users.js";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);

  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="p-6">
      {/* Main Dashboard Section */}
      <section className="flex flex-wrap justify-between items-start">
        {/* Left Section - Stats & Cards */}
        <div className="ml-20 mt-8 w-3/4">
          {/* Secondary Cards Section */}
          <div className="ml-[20%]  flex gap-6">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="15.7k more than usual"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="743.8 more than usual"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="412+ more than usual"
            />
          </div>

          {/* Section Title */}
          <div className="ml-[20%] mt-10 mb-4">
            <h2 className="text-2xl font-semibold text-blue-800">Top Content</h2>
            <p className="text-sm text-gray-500">Most engaged movies</p>
          </div>

          {/* Top Movies Section */}
          <div className="grid ml-[20%]  grid-cols-3 gap-6">
            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Real-Time Analytics */}
        <div className="ml-[20%] w-1/4">
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
