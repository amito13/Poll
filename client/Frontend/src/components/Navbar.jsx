import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

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

    <motion.nav

      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}

      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300

      ${
        theme === "dark"
          ? "bg-black/60 border-orange-500/10"
          : "bg-white/70 border-orange-200"
      }`}
    >

      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.1,
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
          >
            <span className="text-white font-black text-xl">
              P
            </span>
          </motion.div>

          <div>

            <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              PollX
            </h1>

            <p className="text-xs text-gray-500 -mt-1">
              Live Polling Platform
            </p>

          </div>

        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-3">

          <Link
            to="/"
            className={`hidden md:flex px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105

            ${
              theme === "dark"
                ? "text-gray-300 hover:bg-zinc-900 hover:text-orange-400"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            Home
          </Link>

          {token ? (

            <div className="flex items-center gap-3">

              {/* CREATE BUTTON */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >

                <Link
                  to="/create"
                  className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white h-12 px-7 rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-orange-500/30 transition-all duration-300"
                >

                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></span>

                  <span className="relative z-10">
                    + Create Poll
                  </span>

                </Link>

              </motion.div>

              {/* LOGOUT */}
              <button

                onClick={() => {

                  localStorage.removeItem("token");

                  window.location.href = "/login";

                }}

                className={`h-12 px-6 rounded-2xl transition-all duration-300 border backdrop-blur-xl hover:scale-105

                ${
                  theme === "dark"
                    ? "bg-zinc-900/60 border-zinc-700 hover:border-red-500 hover:bg-red-500/10"
                    : "bg-white border-orange-200 hover:border-red-500 hover:bg-red-50"
                }`}
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="flex items-center gap-3">

              {/* LOGIN */}
              <Link

                to="/login"

                className={`h-12 px-6 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105

                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-zinc-900 hover:text-orange-400"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                Login
              </Link>

              {/* REGISTER */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >

                <Link

                  to="/register"

                  className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-6 h-12 rounded-2xl font-bold flex items-center justify-center shadow-xl shadow-orange-500/30 transition-all duration-300"
                >
                  Register
                </Link>

              </motion.div>

            </div>

          )}

          {/* THEME BUTTON */}
          <motion.button

            whileHover={{
              rotate: 180,
              scale: 1.1,
            }}

            transition={{ duration: 0.5 }}

            onClick={toggleTheme}

            className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-lg transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-900/70 border-zinc-700 hover:border-orange-500"
                : "bg-white border-orange-200 hover:border-orange-500"
            }`}
          >

            {theme === "dark" ? "☀️" : "🌙"}

          </motion.button>

        </div>

      </div>

    </motion.nav>

  );

};

export default Navbar;