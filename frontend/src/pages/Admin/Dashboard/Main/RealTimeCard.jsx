import { useGetUsersQuery } from "../../../../redux/api/users.js";
import PrimaryCard from "./PrimaryCard.jsx";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[30rem] ml-10 mt-10 bg-gradient-to-b from-gray-900 to-gray-700 rounded-xl shadow-lg p-6 text-white">
      {/* Header Section */}
      <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
      <p className="text-sm text-gray-300">Live updates on user activity</p>

      {/* Divider */}
      <div className="border-t my-6 border-gray-600 opacity-50"></div>

      {/* Visitor Count */}
      <h2 className="text-4xl font-extrabold">{visitors?.length}</h2>
      <p className="text-sm text-gray-300">Total Active Users</p>

      {/* Subsection Divider */}
      <div className="border-t my-6 border-gray-600 opacity-50"></div>

      {/* Additional Info */}
      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
