import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
const PollDetails = () => {

  const { slug } = useParams();
  const [selectedAnswers, setSelectedAnswers] =
  useState({})
const [voteSubmitted, setVoteSubmitted] =
  useState(false);

  const [poll, setPoll] = useState(null);

  useEffect(() => {

    const fetchPoll = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/polls/${slug}`
        );

        console.log(response.data);

        setPoll(response.data.poll);

      } catch (error) {
        console.log(error);
      }
    };


    fetchPoll();

    

  }, [slug]);
  useEffect(() => {

  socket.on("pollUpdated", (updatedPoll) => {

    setPoll(updatedPoll);

  });

  return () => {

    socket.off("pollUpdated");

  };

}, []);
  const handleVoteSubmit = async () => {

  try {

    const formattedAnswers =
      Object.entries(selectedAnswers).map(
        ([questionId, optionId]) => ({
          questionId: Number(questionId),
          optionId,
        })
      );

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/polls/${slug}/vote`,
      {
        answers: formattedAnswers,
      }
    );

    console.log(response.data);
    setVoteSubmitted(true);

  } catch (error) {
    console.log(error);
  }
};
  if (voteSubmitted) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="bg-zinc-900 border border-orange-500/20 rounded-2xl p-10 text-center max-w-md w-full">

        <h1 className="text-4xl font-bold mb-4">
          Vote Submitted 🎉
        </h1>

        <p className="text-gray-400 mb-6">
          Thank you for participating in this poll.
        </p>

        <button
          onClick={() => {
            window.location.href =
              `/poll/${slug}/results`;
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 py-3 rounded-xl font-semibold"
        >
          View Results
        </button>

      </div>

    </div>
  );
}
  return (
    <div className="min-h-screen bg-black text-white p-10">
      
      

      
     {poll && (

    <div className="max-w-3xl mx-auto">

    <div className="bg-zinc-900 border border-orange-500/20 rounded-2xl p-8">

      <h1 className="text-4xl font-bold mb-3">
        {poll.title}
      </h1>

      <p className="text-gray-400 mb-8">
        {poll.description}
      </p>

      <div className="space-y-8">

        {poll.questions.map((question) => (

          <div
            key={question.id}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5"
          >

            <h2 className="text-xl font-semibold mb-4">
              {question.title}
            </h2>

            <div className="space-y-3">

              {question.options.map((option) => (

                <button
                  key={option.id}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200

                      ${
                        selectedAnswers[question.id] === option.id
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-black border-zinc-700 hover:border-orange-500"
                      }`}
                       onClick={() => {
                    setSelectedAnswers({
                      ...selectedAnswers,

                      [question.id]: option.id,
                    });
                  }}
                >
                  {option.text}
                </button>

              ))}

            </div>

            

          </div>
    
        ))}
          <button
              onClick={handleVoteSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 py-4 rounded-xl font-semibold text-lg"
            >
              Submit Vote
       </button>
      </div>

    </div>

  </div>

)}

    </div>
  );
};

export default PollDetails;