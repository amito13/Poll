import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
const Home = () => {
  const { theme } = useTheme();
  return (
    <div
        className={`min-h-screen transition-all duration-300

        ${
          theme === "dark"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`} >

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <div className="inline-block px-4 py-2 rounded-full border border-orange-500/20 bg-zinc-900 text-orange-400 mb-6">
          Modern Polling Platform
        </div>

        <h1 className="text-6xl font-bold leading-tight mb-6">

          Create Interactive
          <span className="text-orange-500">
            {" "}Polls
          </span>
          <br />
          In Minutes

        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">

          Build beautiful polls, collect responses,
          and visualize analytics with real-time
          insights.

        </p>

        <div className="flex items-center justify-center gap-4">

          <Link
            to="/create"
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Create Poll
          </Link>

          <Link
            to="/register"
            className="border border-zinc-700 hover:border-orange-500 transition-all duration-200 px-8 py-4 rounded-2xl font-semibold text-lg"
          >
            Get Started
          </Link>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          <div className={`border rounded-2xl p-8 transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-zinc-900 border-orange-500/10"
                    : "bg-orange-50 border-orange-200"
                }`}>

            <h3 className="text-2xl font-bold mb-4">
              Dynamic Polls
            </h3>

            <p className={`leading-relaxed

                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}>
              Create fully customizable polls with
              unlimited questions and options.
            </p>

          </div>

          <div  className={`border rounded-2xl p-8 transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-zinc-900 border-orange-500/10"
                    : "bg-orange-50 border-orange-200"
                }`}>

            <h3 className="text-2xl font-bold mb-4">
              Real-time Analytics
            </h3>

            <p className={`leading-relaxed

                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}>
              Visualize vote distribution with
              interactive charts and dashboards.
            </p>

          </div>

          <div className={`border rounded-2xl p-8 transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-zinc-900 border-orange-500/10"
                    : "bg-orange-50 border-orange-200"
                }`}>

            <h3 className="text-2xl font-bold mb-4">
              Public Sharing
            </h3>

            <p className={`leading-relaxed

                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-700"
                }`}>
              Share poll links instantly and collect
              responses from anyone.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;