import React from "react";
import { useState } from "react";
import { FaCalendarAlt, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "student" && password === "student") {
        localStorage.setItem("role", "Student");
        navigate("/dashboard");
        } 
        else if(username === "instructor" && password === "instructor"){
            localStorage.setItem("role", "Instructor");
            navigate("/dashboard");
        }
        else {
        alert("Invalid credentials. Please try again.");
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log("Google login clicked");
    };

  return (
    
    <div className="relative flex justify-center items-start min-h-screen bg-gradient-to-br from-[#F09B9B] to-[#D25D5D] pt-10 before:absolute before:inset-0 before:bg-[url('/src/assets/noisebackground.png')] before:opacity-10 before:pointer-events-none backdrop-blur-xl">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-opacity-70 backdrop-blur-md p-10 rounded-xl shadow-lg text-center w-[350px] h-auto">
        {/* Logo and Title */}
            <h1 className="text-white text-2xl font-bold mb-2 flex flex-col items-center">
                <span className="text-3xl text-black"> <FaCalendarAlt /> </span>
                <span className="text-black">classSEE</span>
            </h1>

            <p className="text-white text-lg font-semibold mb-6">Login</p>

            {/* Input Fields */}
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-transparent border-b border-white text-white focus:outline-none placeholder-gray-200"
                />
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"} // 👁️ Toggle password visibility
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-transparent border-b border-white text-white focus:outline-none placeholder-gray-200 pr-10"
                    />
                    <span
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-800 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-start">
                <p className="text-sm text-red-800 mt-2 cursor-pointer hover:underline"> Forgot Password? </p>
            </div>

            {/* Login Buttons */}
            <button onClick={handleLogin} className="cursor-pointer mt-6 w-full bg-red-800 hover:bg-red-700 text-white font-bold py-2 rounded-full shadow-md transition" > LOGIN </button>

            {/* Google Login Button */}
            <button onClick={handleGoogleLogin} className="mt-4 w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 font-bold py-2 rounded-full shadow-md flex items-center justify-center space-x-2 transition" > <FaGoogle className="text-red-800" /> <span>Login with Google</span> </button>
        </div>

      {/* Footer */}
        <footer className="absolute bottom-20 md:bottom-20 text-xs text-black font-bold opacity-80 w-full text-center">
            <p className="flex flex-wrap justify-center gap-4 md:gap-20">
                <span>ALAMANI</span>
                <span>ARROGANTE</span>
                <span>ASIS</span>
                <span>DE CASTRO</span>
                <span>TINGSON</span>
            </p>
        </footer>

    </div>
  );
};

export default Login;
