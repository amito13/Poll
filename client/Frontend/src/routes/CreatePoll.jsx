import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
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
        "http://localhost:5000/api/polls",
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

      const slug = response.data.poll.slug;

      setCreatedPollLink(
        `http://localhost:5173/poll/${slug}`
      );

    } catch (error) {
      toast.error(
  error?.response?.data?.message ||
  "Failed to create poll"
);
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-all duration-300

      ${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Create Poll
        </h1>

        <p className="text-gray-400 mb-8">
          Build interactive polls with custom questions
        </p>

        <div
          className={`rounded-2xl p-6 space-y-6 border transition-all duration-300

          ${
            theme === "dark"
              ? "bg-zinc-900 border-orange-500/20"
              : "bg-orange-50 border-orange-200"
          }`}
        >

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
            className={`w-full p-4 rounded-xl outline-none transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-950 border-zinc-700"
                : "bg-white border-orange-200"
            }
            border`}
          />

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
            className={`w-full p-4 rounded-xl outline-none resize-none transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-950 border-zinc-700"
                : "bg-white border-orange-200"
            }
            border`}
          />

          <input
            type="date"
            value={pollData.expiresAt}
            onChange={(e) =>
              setPollData({
                ...pollData,
                expiresAt: e.target.value,
              })
            }
           className={`w-full p-4 rounded-xl outline-none transition-all duration-300

${
  theme === "dark"
    ? "bg-zinc-950 border-zinc-700 scheme-dark"
    : "bg-white border-orange-200"
}
border`}
          />

          {pollData.questions.map(
            (question, questionIndex) => (

              <div
                key={questionIndex}
                className={`rounded-2xl p-5 space-y-4 border transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-800"
                    : "bg-white border-orange-200"
                }`}
              >

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
                  className={`w-full p-3 rounded-xl outline-none transition-all duration-300

                  ${
                    theme === "dark"
                      ? "bg-black border-zinc-700"
                      : "bg-orange-50 border-orange-200"
                  }
                  border`}
                />

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
  <Trash2 size={20} />
            </button>

                <div className="space-y-3">

                  {question.options.map(
                    (option, optionIndex) => (

                      <div
                        key={optionIndex}
                        className="space-y-2"
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
                          className={`w-full p-3 rounded-xl outline-none transition-all duration-300

                          ${
                            theme === "dark"
                              ? "bg-black border-zinc-700"
                              : "bg-orange-50 border-orange-200"
                          }
                          border`}
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
  <Trash2 size={18} />
                      </button>

                      </div>

                    )
                  )}

                </div>

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
                  className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-4 py-2 rounded-xl text-sm font-medium text-white"
                >
                  + Add Option
                </button>

              </div>

            )
          )}

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
            className="bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 px-5 py-3 rounded-xl text-white"
          >
            + Add Question
          </button>

          <button
            onClick={handleCreatePoll}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-6 py-3 rounded-xl font-semibold text-white"
          >
            Create Poll
          </button>

        </div>

      </div>

      {createdPollLink && (

        <div
          className={`max-w-3xl mx-auto mt-6 rounded-2xl p-6 border transition-all duration-300

          ${
            theme === "dark"
              ? "bg-zinc-900 border-orange-500/20"
              : "bg-orange-50 border-orange-200"
          }`}
        >

          <h2 className="text-2xl font-bold mb-3">
            Poll Created Successfully 🎉
          </h2>

          <p className="text-gray-400 mb-4">
            Share this link with participants
          </p>

          <div className="flex gap-3">

            <input
              type="text"
              value={createdPollLink}
              readOnly
              className={`flex-1 p-3 rounded-xl outline-none transition-all duration-300

              ${
                theme === "dark"
                  ? "bg-black border-zinc-700"
                  : "bg-white border-orange-200"
              }
              border`}
            />

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  createdPollLink
                  
                );
                toast.error(
                  error?.response?.data?.message ||
                  "Failed to create poll"
                );
              }}
              className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 px-5 rounded-xl font-semibold text-white"
            >
              Copy
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default CreatePoll;