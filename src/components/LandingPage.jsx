// LandingPage.jsx
// A modern, animated landing page for an online voting platform using React, GSAP, Framer Motion, and Tailwind CSS.
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { howItWorks, features, testimonials } from "../testData/testData.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const navigate = useNavigate();

  const handlelogInclick = () => {
    navigate("/login")
  }


  const handleSignupClick = () => {
    navigate("/signup")
  }

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex flex-col relative overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
      {/* Navbar */}
      <nav className="w-full z-20 px-4 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-extrabold text-xl text-indigo-700 tracking-tight">
            E-Vote
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#features"
            className="text-indigo-700 font-medium hover:text-indigo-900 transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-indigo-700 font-medium hover:text-indigo-900 transition"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-indigo-700 font-medium hover:text-indigo-900 transition"
          >
            Testimonials
          </a>
        </div>
        <div className="flex gap-2">
          <button 
          onClick={handlelogInclick}
           className="flex items-center gap-1 px-4 py-2 rounded-full border border-indigo-600 text-indigo-700 font-semibold hover:bg-indigo-50 transition">
            <FiLogIn /> Login
          </button>
          <button
          onClick={handleSignupClick}
           className="flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            <FiUserPlus /> Sign Up
          </button>
        </div>
      </nav>
      <div className="h-20 md:h-24" />
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-w-screen  flex flex-col items-center justify-center flex-1 px-4 py-16 text-center relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0-z-10 bg-gradient-to-br from-indigo-200/60 via-white/60 to-blue-100/60 rounded-3xl blur-2xl"
        />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg"
        >
          Vote Online, Securely & Effortlessly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl"
        >
          Empowering democracy with a modern, secure, and transparent online
          voting platform.
        </motion.p>
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </motion.a>
        <motion.img
          src="/vite.svg"
          alt="Voting Illustration"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-40 md:w-64 mx-auto mt-10 opacity-70 select-none pointer-events-none"
        />
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="py-12 px-4 bg-white rounded-t-3xl shadow-2xl mt-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          Why Choose E-Vote?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              ref={(el) => (featuresRef.current[idx] = el)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-indigo-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center border border-indigo-100 hover:scale-105 hover:shadow-xl transition-transform"
            >
              <div className="mb-3">
                <span className=" w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl text-indigo-600 shadow">
                  {String.fromCodePoint(0x1f512 + idx)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* How It Works Section */}
      <section
        id="how"
        className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-100"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-md flex flex-col items-center text-center border border-indigo-100 hover:scale-105 hover:shadow-xl transition-transform"
            >
              {step.icon}
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          What Our Users Say
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-indigo-50 rounded-xl p-6 shadow-md flex flex-col items-center text-center border border-indigo-100 hover:scale-105 hover:shadow-xl transition-transform"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-3 border-4 border-indigo-200 shadow"
              />
              <p className="text-gray-700 italic mb-2">"{t.text}"</p>
              <span className="font-semibold text-indigo-700">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-gray-500 text-sm bg-gradient-to-br from-indigo-100 to-blue-50 border-t border-indigo-200">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-indigo-700 transition">
            <svg width="24" height="24" fill="currentColor" className="inline">
              <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z" />
            </svg>
          </a>
          <a href="#" className="hover:text-indigo-700 transition">
            <svg width="24" height="24" fill="currentColor" className="inline">
              <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C18.36 20.07 22 16.41 22 12c0-5.5-4.46-9.96-9.96-9.96z" />
            </svg>
          </a>
          <a href="#" className="hover:text-indigo-700 transition">
            <svg width="24" height="24" fill="currentColor" className="inline">
              <path d="M21.54 7.2c-.13-.47-.52-.8-.99-.8h-2.13c-.47 0-.86.33-.99.8l-1.7 6.13-1.7-6.13c-.13-.47-.52-.8-.99-.8H5.45c-.47 0-.86.33-.99.8l-2.13 7.7c-.13.47.02.97.38 1.25.36.28.86.28 1.22 0l1.7-1.23 1.7 1.23c.36.28.86.28 1.22 0l1.7-1.23 1.7 1.23c.36.28.86.28 1.22 0l1.7-1.23 1.7 1.23c.36.28.86.28 1.22 0 .36-.28.51-.78.38-1.25l-2.13-7.7z" />
            </svg>
          </a>
        </div>
        &copy; {new Date().getFullYear()} Online Voting Platform. All rights
        reserved.
      </footer>
    </div>
  );
}
