import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../../../store/auth.slice";

export default function Header() {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-black/25 fixed w-full z-20 top-0 start-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logo.png"
              className="size-15 rounded-4xl"
              alt="Movie"
            />
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">
              CineMax
            </span>
          </NavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
            {user ? (
              <>
                <span
                  className="text-white font-bold rounded-lg text-sm px-4 py-2 hover:text-orange-700 cursor-pointer"
                  onClick={() => navigate("/profile")}
                  title="Personal Infomation"
                >
                  {`Hi, ${user.taiKhoan}`}
                </span>

                <button
                  onClick={handleLogOut}
                  className="text-orange-700 bg-white border border-orange-700 hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                >
                  Login
                </NavLink>
                <NavLink
                  to="./register"
                  className="text-orange-700 bg-white border border-orange-700 hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
                >
                  Register
                </NavLink>
              </>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent  md:dark:bg-gray-900 ">
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? "my-active"
                      : "block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="about"
                  className={({ isActive }) =>
                    isActive
                      ? "my-active"
                      : "block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contact"
                  className={({ isActive }) =>
                    isActive
                      ? "my-active"
                      : "block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
