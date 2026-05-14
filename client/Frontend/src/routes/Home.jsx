import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative overflow-hidden min-h-screen transition-all duration-500
      ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2 rounded-full border border-orange-500/20 bg-zinc-900 text-orange-400 mb-8"
        >
          🚀 Modern Polling Platform
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-6xl md:text-8xl font-black leading-tight mb-8"
        >
          Create Live
          <span className="text-orange-500"> Polls</span>
          <br />
          In Seconds
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12
          ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-700"
          }`}
        >
          Build beautiful polls, collect live responses,
          and visualize analytics in real-time with PollX.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >

          <Link
            to="/create"
            className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300 px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30"
          >
            Create Poll
          </Link>

          <Link
            to="/register"
            className="border border-zinc-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md"
          >
            Get Started
          </Link>

        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >

          {[
            { number: "10K+", label: "Active Users" },
            { number: "50K+", label: "Polls Created" },
            { number: "1M+", label: "Votes Collected" },
            { number: "99%", label: "Uptime" },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2
              ${
                theme === "dark"
                  ? "bg-zinc-900/60 border-orange-500/10"
                  : "bg-white/70 border-orange-200"
              }`}
            >
              <h2 className="text-4xl font-black text-orange-500 mb-2">
                {item.number}
              </h2>

              <p
                className={
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-700"
                }
              >
                {item.label}
              </p>
            </div>
          ))}

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

  <div className="grid md:grid-cols-2 gap-8">

    {[
      {
        status: "Live",
        title: "Live Event Polling",
        yes: "78%",
        no: "22%",
        color: "from-cyan-500/20 to-transparent",
        border: "border-cyan-500/20",
        glow: "shadow-cyan-500/20",
      },

      {
        status: "Trending",
        title: "Instant Team Decisions",
        yes: "92%",
        no: "8%",
        color: "from-green-500/20 to-transparent",
        border: "border-green-500/20",
        glow: "shadow-green-500/20",
      },

      {
        status: "Hot",
        title: "Classroom Interactions",
        yes: "67%",
        no: "33%",
        color: "from-orange-500/20 to-transparent",
        border: "border-orange-500/20",
        glow: "shadow-orange-500/20",
      },

      {
        status: "New",
        title: "Social Community Polls",
        yes: "81%",
        no: "19%",
        color: "from-purple-500/20 to-transparent",
        border: "border-purple-500/20",
        glow: "shadow-purple-500/20",
      },
    ].map((poll, index) => (

      <motion.div
        key={index}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden rounded-3xl border ${poll.border}
        bg-gradient-to-br ${poll.color}
        backdrop-blur-xl p-8 shadow-2xl ${poll.glow}`}
      >

        {/* glow effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>

        {/* status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-black/30 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

          <span className="text-sm text-gray-300">
            {poll.status}
          </span>
        </div>

        {/* title */}
        <h2 className="text-3xl font-bold mb-10 leading-snug">
          {poll.title}
        </h2>

        {/* yes section */}
        <div className="mb-8">

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">
              YES
            </span>

            <span className="font-bold text-xl">
              {poll.yes}
            </span>
          </div>

          <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: poll.yes }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
            />

          </div>

        </div>

        {/* no section */}
        <div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">
              NO
            </span>

            <span className="font-bold text-xl">
              {poll.no}
            </span>
          </div>

          <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: poll.no }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-500"
            />

          </div>

        </div>

      </motion.div>

    ))}

  </div>

</section>
    </div>
  );
};

export default Home;