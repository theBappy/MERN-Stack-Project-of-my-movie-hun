import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-md">
      <section className="flex justify-between items-center px-6 py-4">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2" size={26} />
          <span className="hidden sm:block">Home</span>
        </Link>

        {/* User Section */}
        <div className="relative flex items-center">
          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white focus:outline-none"
              >
                <span className="mr-2">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>
              
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl">
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2" size={26} />
                <span className="hidden sm:block">Login</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2" size={26} />
                <span className="hidden sm:block">Register</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;