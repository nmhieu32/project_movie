import { NavLink, useNavigate } from "react-router-dom";
import Avt from "./avt";
import {
  FaFilm,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setProfile } from "../../../store/user.slice";
import {clearUser} from '../../../store/auth.slice'

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // ✅ Clear localStorage / sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // ✅ Clear Redux state user
    dispatch(setProfile(null));
dispatch(clearUser());
    // ✅ Redirect về login
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-[20%] h-dvh bg-[#252746] text-white p-6 flex flex-col justify-between">
      {/* Top: Avatar + menu */}
      <div>
        <div className="mb-8">
          <Avt />
        </div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-[#2F315A] ${
                  isActive ? "bg-[#3F416A]" : ""
                }`
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="movie-manager"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-[#2F315A] ${
                  isActive ? "bg-[#3F416A]" : ""
                }`
              }
            >
              <FaFilm /> Movie Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to="user-manager"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-[#2F315A] ${
                  isActive ? "bg-[#3F416A]" : ""
                }`
              }
            >
              <FaUser /> User Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to="user-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-[#2F315A] ${
                  isActive ? "bg-[#3F416A]" : ""
                }`
              }
            >
              <FaUserCircle /> Profile
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom: Logout */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}
