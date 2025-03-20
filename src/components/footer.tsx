import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const handleSignin = () => {  
        navigate('/signin')
    };

    const handleAbout = () =>{
        navigate('/about')
    };
    const handleUnderDevelop = () => {
        alert("Under Development")
    };
  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-red-700  text-white text-sm py-4 px-6">
      {/* Language Selection*/}
      <div className="flex justify-center space-x-4 mb-2">
        <span>English (US)</span>
        <span>Filipino</span>
        <span>Bisaya</span>
        <button className="border px-2 py-0.5 rounded-md">+</button>
      </div>
      <hr className="border-t border-gray-300 mx-6" />

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-2">
        <span className="cursor-pointer" onClick={handleSignin}>Sign In</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop} >Privacy Policy</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop}>Privacy Center</span>
        <span className="cursor-pointer" onClick={handleAbout}>About</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop}>Cookies</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop} >Ad Choices</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop} >Terms</span>
        <span className="cursor-pointer" onClick={handleUnderDevelop}>Help</span>
      </div>

      {/* Copyright - Aligned to Left */}
      <div className="text-left mt-2 pl-6">
        <h1>ClassEE © 2025</h1>
      </div>
    </footer>
  );
};

export default Footer;
