import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function OtpVerify() {
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleOtpChange = (e, idx) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newArr = [...otpArr];
      newArr[idx] = val;
      setOtpArr(newArr);
      if (val && idx < 5) {
        inputRefs.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otpArr[idx] === "") {
        if (idx > 0) inputRefs.current[idx - 1]?.focus();
      } else {
        const newArr = [...otpArr];
        newArr[idx] = "";
        setOtpArr(newArr);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (paste.length === 6) {
      setOtpArr(paste.split(""));
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpArr.join("");
    if (!otp) return toast.error("Please enter OTP");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/verifyOtp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(res.data);
      navigate("/login");
      toast.success("OTP verified successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">No email found. Please sign up again.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <ToastContainer position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-pink-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">
          Verify OTP
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-pink-600">
            Enter OTP sent to <span className="text-pink-500">{email}</span>
          </label>
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {otpArr.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputRefs.current[idx] = el)}
                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white shadow"
                required
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-bold hover:from-pink-600 hover:to-purple-600 transition mb-2 shadow-lg"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
