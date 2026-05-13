import { Link } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
const Navbar = () => {

 const [token, setToken] = useState(
  localStorage.getItem("token")
);

  const { theme, toggleTheme } = useTheme();
        useEffect(() => {

          const checkAuth = () => {

            setToken(
              localStorage.getItem("token")
            );

          };

          window.addEventListener(
            "storage",
            checkAuth
          );

          checkAuth();

          return () => {

            window.removeEventListener(
              "storage",
              checkAuth
            );

          };

        }, []);
  return (
   <nav
    className={`w-full border-b sticky top-0 z-50 transition-all duration-300

    ${
        theme === "dark"
        ? "bg-black border-orange-500/10"
        : "bg-white border-orange-200"
    }`}>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          PollX
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/"
                className={`hover:text-orange-500 transition-all duration-200

                ${
                theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
                >
            Home
          </Link>
      
          {token ? (

            <Link
              to="/create"
              className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-xl font-semibold"
            >
              Create Poll
            </Link>
        
          ) : (

            <div className="flex gap-3">

              <Link
                to="/login"
                className={`transition-all duration-200 hover:text-orange-500 h-12 px-6 flex items-center justify-center
                ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-800"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-xl font-semibold"
              >
                Register
              </Link>

            </div>
            

          )}
          <button
  onClick={toggleTheme}
  className="border border-zinc-700 hover:border-orange-500 transition-all duration-200 px-4 py-2 rounded-xl"
>
  {theme === "dark" ? "☀️" : "🌙"}
</button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;