import { useGetUsersQuery } from "../../../../redux/api/users.js";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-full h-auto bg-gradient-to-b from-sky-500 to-blue-600 text-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {/* Header Section */}
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="text-lg">
        You have {visitors?.length} new users, watching your content.
      </p>
    </div>
  );
};

export default PrimaryCard;
