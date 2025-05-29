import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../context/UserProvider";
import { ToastContainer, toast } from 'react-toastify';

const LeaderInfo = () => {
  const { id } = useParams();
  const { user,userLoading } = useContext(userContext);
  const [showVoteConfirm, setShowVoteConfirm] = useState(false);
  const [leaderData, setLeaderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  
      
  // Check voting status on page load or when electionType changes
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/hasVoted",
          {
            voterId: user._id,
            electionType: leaderData.electionType,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setHasVoted(res.data.hasVoted);
      } catch (err) {
        console.error(err);
      }
    };
    
      checkVoteStatus();
    
  }, [user._id, leaderData.electionType,user]);


  // Fetch leader data based on ID
  // This function will be called when the component mounts
  const fetchNeta = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/getNeta/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // You can set leaderData from response here if needed
      setLeaderData(res.data.leader);
      setLoading(false);
    } catch (error) {
      console.error("Err:while fetching neta form Id", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeta();
  }, [id,user]);


  // this function handle votes 
  const handleVoteConfirm = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/vote",
        {
          voterId: user._id,
          netaId: id,
          electionType: leaderData.electionType,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        console.log("Vote confirmed successfully:", res.data);
        setHasVoted(true);
        setShowVoteConfirm(false);
        toast.success("Vote casted successfully!");
      }
    } catch (error) {
      console.error("Error confirming vote:", error);
      toast.error("Error confirming vote. Please try again.");
    }
  };

  if(userLoading){
     return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-blue-700 text-lg font-semibold animate-pulse">
              Loading leader info...
            </span>
          </div>
        </div>
      );
  }

  if (loading ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-blue-700 text-lg font-semibold animate-pulse">
              Loading leader info...
            </span>
          </div>
        </div>
      );
    }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-200 rounded-full opacity-30 blur-2xl animate-pulse z-0"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-300 rounded-full opacity-20 blur-2xl animate-pulse z-0"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fadeInUp">
          {/* Avatar with unique seed, gender, and age */}
          <div className="relative mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                leaderData.neta || "Leader"
              )}&gender=${
                leaderData.gender ? leaderData.gender.toLowerCase() : "male"
              }&age=${leaderData.age || 30}`}
              alt="Leader Avatar"
              className="w-28 h-28 rounded-full shadow-lg border-4 border-blue-200"
            />
            {/* Party badge */}
            <span className="absolute -bottom-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white">
              {leaderData.party && leaderData.party.includes("(")
                ? `(${leaderData.party.split("(")[1]}`
                : leaderData.party?.split(" ")[0]}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">
            {leaderData.neta}
          </h2>
          {/* Age & Gender */}
          <div className="mb-2 flex items-center gap-4">
            <span className="text-base font-semibold text-gray-600 flex items-center gap-1">
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              {leaderData.age} yrs
            </span>
            <span className="text-base font-semibold text-gray-600 flex items-center gap-1">
              <svg
                className="w-5 h-5 text-pink-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
              {leaderData.gender}
            </span>
          </div>
          {/* State flag placeholder */}
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block w-7 h-5 bg-gradient-to-r from-green-400 to-blue-400 rounded shadow-inner border border-blue-200"></span>
            <span className="text-base font-semibold text-gray-600">
              {leaderData.state}
            </span>
          </div>
          <div className="w-full flex flex-col gap-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Party</span>
              <span className="font-bold text-gray-800">
                {leaderData.party}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Election Type</span>
              <span className="font-bold text-gray-800">
                {leaderData.electionType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Aadhar</span>
              <span className="font-bold text-gray-800">
                {leaderData.aadhar}
              </span>
            </div>
          </div>
          <button
            className={`mt-4 px-8 py-3 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-200
            ${
              hasVoted
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => setShowVoteConfirm(true)}
            disabled={hasVoted}
          >
            {hasVoted ? "Already Voted" : "Vote"}
          </button>
        </div>
        {/* Vote confirmation overlay */}
        {showVoteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 text-center animate-popIn">
              <h3 className="text-xl font-bold mb-6">
                Confirm your vote for{" "}
                <span className="text-blue-700">{leaderData.neta}</span>?
              </h3>
              <div className="flex justify-center gap-6">
                <button
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all"
                  onClick={() => {
                    setShowVoteConfirm(false);
                    handleVoteConfirm();
                  }}
                >
                  Confirm
                </button>
                <button
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all"
                  onClick={() => setShowVoteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(.23,1.01,.32,1); }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s; }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-popIn { animation: popIn 0.5s; }
      `}</style>
    </div>
  );
};

export default LeaderInfo;
