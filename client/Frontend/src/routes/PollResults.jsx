  import React from 'react'
  import { useState } from 'react'
  import { useEffect } from 'react'
  import {useParams} from 'react-router-dom'
  import axios from 'axios'
  import { useTheme } from "../context/ThemeContext";
  import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
  const PollResults = () => {
    const { theme } = useTheme();
    const {slug} = useParams()
    const [results, setResults] = useState(null)
    useEffect(() => {
      const fetchResult = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/polls/${slug}/results`)
          console.log(response.data)
          setResults(response.data)
          
        } catch (error) {
          console.error('Error fetching poll results:', error)
        }
      }

      fetchResult()
    }, [slug])

    return (
  <div
    className={`min-h-screen transition-all duration-300

    ${
      theme === "dark"
        ? "bg-black text-white"
        : "bg-white text-black"
    }`}
  >

    {results?.poll && (

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <div
            className={`rounded-2xl p-6 border transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-900 border-orange-500/10"
                : "bg-orange-50 border-orange-200"
            }`}
          >

            <p
              className={`mb-2

              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Total Questions
            </p>

            <h2 className="text-4xl font-bold text-orange-500">
              {results.results.length}
            </h2>

          </div>

          <div
            className={`rounded-2xl p-6 border transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-900 border-orange-500/10"
                : "bg-orange-50 border-orange-200"
            }`}
          >

            <p
              className={`mb-2

              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Poll Status
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              Active
            </h2>

          </div>

          <div
            className={`rounded-2xl p-6 border transition-all duration-300

            ${
              theme === "dark"
                ? "bg-zinc-900 border-orange-500/10"
                : "bg-orange-50 border-orange-200"
            }`}
          >

            <p
              className={`mb-2

              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Analytics
            </p>

            <h2 className="text-4xl font-bold text-orange-500">
              Live
            </h2>

          </div>

        </div>

        {/* POLL HEADER */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">
            {results.poll.title}
          </h1>

          <p
            className={`text-lg

            ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {results.poll.description}
          </p>

        </div>

        {/* QUESTIONS */}

        <div className="space-y-8">

          {results.results.map((question) => {

            const totalVotes =
              question.options.reduce(
                (acc, option) =>
                  acc + option.votes,
                0
              );

            return (

              <div
                key={question.questionId}
                className={`rounded-2xl p-6 border transition-all duration-300

                ${
                  theme === "dark"
                    ? "bg-zinc-900 border-orange-500/10"
                    : "bg-orange-50 border-orange-200"
                }`}
              >

                <h2 className="text-2xl font-bold mb-6">
                  {question.question}
                </h2>

                <div className="space-y-5">

                  {question.options.map((option) => {

                    const percentage =
                      totalVotes === 0
                        ? 0
                        : (
                            (option.votes / totalVotes) * 100
                          ).toFixed(0);

                    return (

                      <div
                        key={option.optionId}
                        className={`rounded-2xl p-5 border transition-all duration-300

                        ${
                          theme === "dark"
                            ? "bg-zinc-950 border-zinc-800"
                            : "bg-white border-orange-100"
                        }`}
                      >

                        <div className="flex justify-between items-center mb-3">

                          <span className="font-medium text-lg">
                            {option.text}
                          </span>

                          <span className="text-orange-500 font-bold">
                            {option.votes} votes • {percentage}%
                          </span>

                        </div>

                        <div
                          className={`w-full rounded-full h-3 overflow-hidden

                          ${
                            theme === "dark"
                              ? "bg-black"
                              : "bg-orange-100"
                          }`}
                        >

                          <div
                            className="bg-orange-500 h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    );

                  })}

                </div>

                {/* PIE CHART */}

                <div
                  className={`h-72 mt-8 rounded-2xl p-4 border transition-all duration-300

                  ${
                    theme === "dark"
                      ? "bg-zinc-950 border-zinc-800"
                      : "bg-white border-orange-100"
                  }`}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={question.options}
                        dataKey="votes"
                        nameKey="text"
                        outerRadius={100}
                      >

                        {question.options.map(
                          (_, index) => (

                            <Cell
                              key={index}
                              fill={
                                index % 2 === 0
                                  ? "#ff7b00"
                                  : "#cc5500"
                              }
                            />

                          )
                        )}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    )}

  </div>
);
  }

  export default PollResults
