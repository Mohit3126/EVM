import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(userContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/sendOtp",
        { ...form },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) {
        setLoading(false);
        toast.success("OTP sent to your email");
        navigate("/otp-verify", { state: { email: form.email } });
      }
    } catch (error) {
      toast.error(`Error occurred: ${error.response?.data?.error || error.message}`);
      console.error("Err while creating user", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
        <div className="spinner"></div>
        <style>{`
          .spinner {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-w-screen min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <ToastContainer position="top-right" />
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-pink-200 relative"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 32px 0 rgba(135, 31, 135, 0.17)",
        }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 text-center text-pink-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Create Account
        </motion.h2>
        <motion.div className="mb-4">
          <label className="block mb-1 font-semibold text-pink-600">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full text-pink-400  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Enter your name"
            required
          />
        </motion.div>
        <motion.div className="mb-4">
          <label className="block mb-1 font-semibold text-pink-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full text-pink-400   px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Enter your email"
            required
          />
        </motion.div>
        <motion.div className="mb-4">
          <label className="block mb-1   font-semibold text-pink-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNo"
            value={form.phoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 text-pink-400   border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Enter your phone number"
            required
          />
        </motion.div>
        <motion.div className="mb-6 relative">
          <label className="block mb-1 font-semibold text-pink-600">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 text-pink-400   py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-pink-400 hover:text-pink-600"
            onClick={() => setShowPassword((v) => !v)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold hover:from-pink-600 hover:to-purple-600 transition mb-2 shadow-lg"
          whileTap={{ scale: 0.97 }}
        >
          Sign Up
        </motion.button>
        <motion.div className="text-center mt-4 text-sm text-gray-500">
          <span>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </a>
          </span>
        </motion.div>
      </motion.form>
    </div>
  );
}
