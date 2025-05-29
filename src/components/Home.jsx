import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import { partyColors } from '../testData/states.js';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: 'spring', stiffness: 80 }
  }),
};


const Home = () => {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLeaderClick = (leader) => {
      console.log(leader);
    navigate(`/home/${leader._id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/home", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setLeaders(response.data.leaders);
        }
      } catch (error) {
        setError(error.message || "Unknown error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen min-w-screen  bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
      {error && <div className="text-red-600 font-semibold mb-4">Error: {error}</div>}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Leaders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {leaders.map((leader, i) => (
              <motion.div
                key={leader._id?.$oid || i}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                onClick={() => handleLeaderClick(leader)}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100 hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">{leader.neta}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${partyColors[leader.party] || 'bg-gray-400'}`}>
                    {leader.party}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    State: <span className="font-medium">{leader.state}</span>
                  </span>
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {leader.electionType}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
