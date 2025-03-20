import React from "react";
import classEE_logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-gradient-to-r from-gray-700 to-red-700 text-white shadow-md">
      {/* Logo Section - Left on Mobile, Centered on Larger Screens */}
      <div className="flex md:w-full md:justify-center">
        <img src={classEE_logo} alt="ClassEE Logo" className="h-10 md:h-12" />
      </div>

      {/* Sign Out Button (Visible only if "role" Exists) */}
      {role && (
        <button
          onClick={handleSignOut}
          className="absolute right-6 hover:bg-white hover:text-red-800 text-white font-semibold py-2 px-2 rounded-md transition-all text-sm border-2 b-white"
        >
          Sign Out
        </button>
      )}
    </header>
  );
};

export default Header;
