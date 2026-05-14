import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CreatePoll = () => {

  const { theme } = useTheme();

  const [createdPollLink, setCreatedPollLink] =
    useState("");

  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    expiresAt: "",
    questions: [
      {
        title: "",
        required: true,
        options: ["", ""],
      },
    ],
  });

  const handleCreatePoll = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/polls`,
        {
          ...pollData,
          allowAnonymous: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Poll created successfully!"
      );

      const slug =
        response.data.poll.slug;

      setCreatedPollLink(
        `${window.location.origin}/poll/${slug}`
      );

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to create poll"
      );

    }

  };

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        createdPollLink
      );

      toast.success(
        "Poll link copied!"
      );

    } catch (error) {

      toast.error(
        "Failed to copy link"
      );

    }

  };

  return (

    <div
      className={`relative overflow-hidden min-h-screen px-4 py-12 transition-all duration-500

      ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        className="max-w-4xl mx-auto relative z-10"
      >

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent mb-3">
            Create Poll
          </h1>

          <p className="text-gray-400 text-lg">
            Build interactive polls with custom questions
          </p>

        </div>

        {/* MAIN CARD */}
        <div
          className={`rounded-3xl p-8 backdrop-blur-2xl shadow-2xl border transition-all duration-300

          ${
            theme === "dark"
              ? "bg-zinc-900/70 border-orange-500/10"
              : "bg-white/80 border-orange-200"
          }`}
        >

          {/* TITLE */}
          <input
            type="text"
            placeholder="Poll Title"
            value={pollData.title}
            onChange={(e) =>
              setPollData({
                ...pollData,
                title: e.target.value,
              })
            }

            className={`w-full p-4 rounded-2xl outline-none transition-all duration-300 border focus:scale-[1.01] mb-5

            ${
              theme === "dark"
                ? "bg-black/70 border-zinc-800 focus:border-orange-500"
                : "bg-white border-orange-200 focus:border-orange-500"
            }`}
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Poll Description"
            rows="4"
            value={pollData.description}
            onChange={(e) =>
              setPollData({
                ...pollData,
                description: e.target.value,
              })
            }

            className={`w-full p-4 rounded-2xl outline-none resize-none transition-all duration-300 border focus:scale-[1.01] mb-5

            ${
              theme === "dark"
                ? "bg-black/70 border-zinc-800 focus:border-orange-500"
                : "bg-white border-orange-200 focus:border-orange-500"
            }`}
          />

          {/* DATE */}
          <input
            type="date"
            value={pollData.expiresAt}
            onChange={(e) =>
              setPollData({
                ...pollData,
                expiresAt: e.target.value,
              })
            }

            className={`w-full p-4 rounded-2xl outline-none transition-all duration-300 border focus:scale-[1.01] mb-8

            ${
              theme === "dark"
                ? "bg-black/70 border-zinc-800 focus:border-orange-500 scheme-dark"
                : "bg-white border-orange-200 focus:border-orange-500"
            }`}
          />

          {/* QUESTIONS */}
          <div className="space-y-8">

            {pollData.questions.map(
              (question, questionIndex) => (

                <motion.div

                  key={questionIndex}

                  whileHover={{
                    y: -4,
                  }}

                  className={`rounded-3xl p-6 backdrop-blur-xl shadow-xl hover:shadow-orange-500/10 transition-all duration-300 border

                  ${
                    theme === "dark"
                      ? "bg-zinc-950/80 border-zinc-800"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >

                  {/* QUESTION HEADER */}
                  <div className="flex items-center justify-between mb-5">

                    <h2 className="text-2xl font-bold">
                      Question {questionIndex + 1}
                    </h2>

                    <button

                      type="button"

                      onClick={() => {

                        if (
                          pollData.questions.length <= 1
                        ) {
                          return;
                        }

                        const updatedQuestions =
                          pollData.questions.filter(
                            (_, index) =>
                              index !== questionIndex
                          );

                        setPollData({
                          ...pollData,
                          questions: updatedQuestions,
                        });

                      }}

                      className="text-red-400 hover:text-red-500 transition-all duration-200"
                    >
                      <Trash2 size={22} />
                    </button>

                  </div>

                  {/* QUESTION TITLE */}
                  <input
                    type="text"
                    placeholder="Question Title"
                    value={question.title}

                    onChange={(e) => {

                      const updatedQuestions =
                        [...pollData.questions];

                      updatedQuestions[
                        questionIndex
                      ].title = e.target.value;

                      setPollData({
                        ...pollData,
                        questions: updatedQuestions,
                      });

                    }}

                    className={`w-full p-4 rounded-2xl outline-none transition-all duration-300 border focus:scale-[1.01] mb-5

                    ${
                      theme === "dark"
                        ? "bg-black/70 border-zinc-800 focus:border-orange-500"
                        : "bg-white border-orange-200 focus:border-orange-500"
                    }`}
                  />

                  {/* OPTIONS */}
                  <div className="space-y-4">

                    {question.options.map(
                      (option, optionIndex) => (

                        <div
                          key={optionIndex}
                          className="flex items-center gap-3"
                        >

                          <input
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}

                            onChange={(e) => {

                              const updatedQuestions =
                                [...pollData.questions];

                              updatedQuestions[
                                questionIndex
                              ].options[
                                optionIndex
                              ] = e.target.value;

                              setPollData({
                                ...pollData,
                                questions: updatedQuestions,
                              });

                            }}

                            className={`flex-1 p-4 rounded-2xl outline-none transition-all duration-300 border focus:scale-[1.01]

                            ${
                              theme === "dark"
                                ? "bg-black/70 border-zinc-800 focus:border-orange-500"
                                : "bg-white border-orange-200 focus:border-orange-500"
                            }`}
                          />

                          <button

                            type="button"

                            onClick={() => {

                              const updatedQuestions =
                                [...pollData.questions];

                              if (
                                updatedQuestions[
                                  questionIndex
                                ].options.length <= 2
                              ) {
                                return;
                              }

                              updatedQuestions[
                                questionIndex
                              ].options =
                                updatedQuestions[
                                  questionIndex
                                ].options.filter(
                                  (_, index) =>
                                    index !== optionIndex
                                );

                              setPollData({
                                ...pollData,
                                questions: updatedQuestions,
                              });

                            }}

                            className="text-red-400 hover:text-red-500 transition-all duration-200"
                          >
                            <Trash2 size={20} />
                          </button>

                        </div>

                      )
                    )}

                  </div>

                  {/* ADD OPTION */}
                  <button

                    type="button"

                    onClick={() => {

                      const updatedQuestions =
                        [...pollData.questions];

                      updatedQuestions[
                        questionIndex
                      ].options.push("");

                      setPollData({
                        ...pollData,
                        questions: updatedQuestions,
                      });

                    }}

                    className="mt-6 bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-105"
                  >
                    + Add Option
                  </button>

                </motion.div>

              )
            )}

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button

              type="button"

              onClick={() => {

                setPollData({
                  ...pollData,

                  questions: [
                    ...pollData.questions,

                    {
                      title: "",
                      required: true,
                      options: ["", ""],
                    },
                  ],
                });

              }}

              className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-6 py-4 rounded-2xl text-white font-bold hover:scale-105"
            >
              + Add Question
            </button>

            <button

              onClick={handleCreatePoll}

              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-white shadow-xl shadow-orange-500/30 hover:scale-105"
            >
              Create Poll
            </button>

          </div>

        </div>

      </motion.div>

      {/* SUCCESS CARD */}
      {createdPollLink && (

        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className={`max-w-4xl mx-auto mt-8 rounded-3xl p-8 border backdrop-blur-2xl shadow-2xl transition-all duration-300 relative z-10

          ${
            theme === "dark"
              ? "bg-zinc-900/70 border-orange-500/10"
              : "bg-white/80 border-orange-200"
          }`}
        >

          <h2 className="text-3xl font-black mb-3">
            Poll Created Successfully 🎉
          </h2>

          <p className="text-gray-400 mb-6">
            Share this link with participants
          </p>

          <div className="flex gap-4">

            <input
              type="text"
              value={createdPollLink}
              readOnly

              className={`flex-1 p-4 rounded-2xl outline-none transition-all duration-300 border

              ${
                theme === "dark"
                  ? "bg-black/70 border-zinc-800"
                  : "bg-white border-orange-200"
              }`}
            />

            <button

              onClick={handleCopy}

              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 px-6 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/30 hover:scale-105"
            >
              Copy
            </button>

          </div>

        </motion.div>



      )}

    </div>
  );
};

export default CreatePoll;