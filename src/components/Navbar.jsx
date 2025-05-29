import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useContext(userContext);

  const navigate = useNavigate();
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (user?.name) {
      setInitials(getInitials(user.name));
    }
  }, [user]);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean) // remove empty strings
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleAvatarClick = () => {
    navigate(`/home/user/${user._id}`)
  }
  return (
    <nav className="sticky top-0 z-50 min-h-16 bg-gradient-to-r from-black via-gray-900 to-gray-800 flex justify-between items-center shadow-lg px-4 py-2">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick theme="colored" />
      <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
        <img
          className="h-10 w-10 object-contain drop-shadow-lg transition-transform duration-200 hover:scale-105"
          src="/vite.svg"
          alt="Vite Logo"
        />
        <span className="text-2xl font-extrabold text-white tracking-wide select-none hidden sm:inline">EVM Portal</span>
      </div>
      {/* Centered navigation links can go here if needed */}
      <div className="flex items-center gap-4">
        {/* Example nav link (uncomment if needed)
        <a href="/about" className="text-white font-medium hover:text-amber-400 transition-colors duration-150 hidden md:inline">About</a>
        */}
        <div
          onClick={handleAvatarClick}
          className="h-10 w-10 bg-amber-700 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md border-2 border-amber-400 cursor-pointer transition-transform duration-200 hover:scale-110 hover:border-white"
          title={user?.name || "User"}
        >
          {initials}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
