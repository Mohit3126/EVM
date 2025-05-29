import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login", // Corrected endpoint
        { email, password }, // Send as data, not in 'data' property
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        console.log("user is ->", response.data.user)
        navigate("/home");
      }

    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200 relative"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 text-center text-blue-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Welcome Back
        </motion.h2>
        <motion.div className="mb-4" whileFocus={{ scale: 1.05 }}>
          <label className="block mb-1 font-semibold text-blue-600">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-blue-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your Email"
            required
          />
        </motion.div>
        <motion.div className="mb-6 relative">
          <label className="block mb-1 font-semibold text-blue-600">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-blue-700  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-blue-400 hover:text-blue-600"
            onClick={() => setShowPassword((v) => !v)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition mb-2 shadow-lg"
          whileTap={{ scale: 0.97 }}
        >
          Login
        </motion.button>
        <motion.div className="text-center mt-4 text-sm text-gray-500">
          <span>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </span>
        </motion.div>
      </motion.form>
    </div>
  );
}
