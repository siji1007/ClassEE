import React from "react";
import { useState, useEffect  } from "react";
import Profile from '../assets/profile.jpg';
import Schedule from "../schedule"; 
import { FaBuilding, FaRegFileAlt, FaUser, FaSearch } from 'react-icons/fa';
import { HiOfficeBuilding, HiMenu, HiX } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

import Test from '../assets/test.jpg';

const Dashboard: React.FC = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [role, setRole] = useState<string | null>("");
    const [rolecrm, setRolecrm] = useState<string | null>("");
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

    const profiles = [
      { id: 1, name: "Alice Guo" },
      { id: 2, name: "Bob Marley" },
      { id: 3, name: "Charlie Pot" },
      { id: 4, name: "David Laid" },
      { id: 5, name: "Eve" },
      { id: 6, name: "Frank Lyn" },
      { id: 7, name: "Grace Pot" },
      { id: 8, name: "Hannah Lie" },
      { id: 9, name: "Isaac Obusan" },
      { id: 10, name: "Jack Chan" },
      { id: 11, name: "Jake Corpus" },
      { id: 12, name: "Gayle Tie" },
  ];
    useEffect(() => {
      // Retrieve role from localStorage on component mount 
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    }, []);

    useEffect(() => {
      // Retrieve the stored room from localStorage when the component mounts
      const storedRoom = localStorage.getItem("facilities");
      if (storedRoom) {
          setSelectedRoom(parseInt(storedRoom, 10));
      }
  }, []);

    useEffect(() => {
        if (role === "Instructor") {
            setRolecrm("Inst.");
        } else {
            setRolecrm("Stud.");
        }
        
    }, [role]);

    
    
    const handleSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    const handleFile = () => {
        alert("Clicked file icon!");
    };
    const handleFacilities = () => {
        alert("Facilities Clicked!");
    };

    const handleRoomClick = (room: number) => {
      setSelectedRoom(room);
      localStorage.setItem("facilities", room.toString());
      window.location.reload();
    };

  
  const handleBack = () => {
    localStorage.removeItem("facilities");
    window.location.reload();
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
            className={`fixed md:relative top-0 left-0 h-full w-3/4 md:w-1/4 bg-gradient-to-br from-[#F09B9B] to-[#D25D5D] 
            text-white flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 transition-transform duration-300 ease-in-out z-10 mt-13 md:mt-0`}
            >

        {/* Close Button (Mobile Only) */}
        <button
          className="absolute top-5 right-2 text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <HiX size={30} />
        </button>

        {/* Top section (Instructor & Courses/Facilities) */}
        <div className="w-full md:max-w-md mx-auto text-white p-4 md:mt-0">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 pb-4">
            <img
              src={Profile} // Connect this to the actual database storage for images
              alt="Profile"
              className="w-14 h-14 rounded-lg border-2 border-white"
            />
            <div>
              <h2 className="text-lg font-bold">Engr. Mark Anthony</h2>
              <p className="text-sm text-gray-200">  {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Guest"}</p>         {/* Put here the role of use account*/}
            </div>
          </div>

          {/* Courses Section */}
          <div className="flex justify-end w-full border-b border-white">
            <h3 className="text-lg font-semibold">COURSES</h3>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            <span className="bg-white text-black px-3 py-1 rounded-full">Calculus II - 1A</span>
            <span className="bg-white text-black px-3 py-1 rounded-full">Physics - 2B</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Thermodynamics</span>
          </div>

          {/* Facilities Section */}
          <div className="mt-4 p-4 bg-gradient-to-br from-white to-gray-200 rounded-lg text-black">
            <h3 className="text-lg font-semibold border-b-2 border-black inline-block mb-2">FACILITIES</h3>
            <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                {[201, 202, 203, 204, 205, 206].map((room) => (
                    <span
                        key={room}
                        className={`flex items-center space-x-1 cursor-pointer p-2 rounded-md ${
                            selectedRoom === room ? "bg-red-800 text-white" : "hover:text-blue-500"
                        }`}
                        onClick={() => handleRoomClick(room)}
                    >
                        <HiOfficeBuilding/>{room}
                    </span>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Section (Announcements) */}
        <div className="bottom-0 h-full text-white p-4 flex flex-col" style={{ backgroundColor: "#350A0A" }}>
          <h3 className="text-lg font-semibold bg-red-900  items-center justify-center flex rounded-lg">ANNOUNCEMENTS</h3>
          <ul className="mt-3 text-sm space-y-3 overflow-auto list-none">
            <li className="flex items-start space-x-2">
              <span className="text-2xl text-white">•</span>
              <div>
                Your proposed schedule for Physics, 9AM to 1PM, BSE 2A has been approved.
                <p className="text-xs opacity-70">May 12, 2024 8:22 AM</p>
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-2xl text-white">•</span>
              <div>
                Room 204 is under maintenance. Please adjust schedules.
                <p className="text-xs opacity-70">Nov 11, 2024 4:37 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-3/4 bg-red-50 p-2">
        {/* Burger Menu (Mobile) */}
        <button
          className="absolute top-15 left-4 md:hidden text-red-900"
          onClick={() => setSidebarOpen(true)}
        >
          <HiMenu size={30} />
        </button>
            {/* Header */}
        <div className="flex flex-col ">
        <div className="flex flex-col w-full">
  {/* Title and Menu Section */}
            <div className="flex flex-col md:flex-row md:justify-between items-center px-4 w-full">
                
                {/* Left Side - Title */}
                <h2 className="text-center md:text-left w-full">
                <span className="font-bold">SY 2024-2025</span> <span>{'>'} 1st Semester : Week 3</span>
                </h2> 

                {/* Right Side - Menu */}
                <div className="flex flex-wrap justify-center md:justify-end items-center w-full text-red-800 border-b-2 border-red-800 mt-2 md:mt-0">
                
                <FaBuilding className="w-6 h-6 cursor-pointer hover:scale-110 duration-300 mx-2" onClick={handleFacilities} />
                <FaRegFileAlt className="w-6 h-6 cursor-pointer hover:scale-110 duration-300 mx-2" onClick={handleFile} />

                <div className="bg-red-300 p-2 text-center mx-2">
                    <FaUser className="w-6 h-6" />
                    <span className="block text-xs font-bold">{rolecrm}</span>
                </div>

                {/* Search Input with Transition */}
                <div className="relative flex items-center mx-2">
                    <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isSearchVisible ? "w-40 opacity-100" : "w-0 opacity-0"
                    }`}
                    >
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-b-2 border-red-800 outline-none px-2 py-1 w-full bg-transparent"
                    />
                    </div>
                    <FaSearch
                    className="w-6 h-6 cursor-pointer ml-2 transition-transform duration-300 hover:scale-110"
                    onClick={handleSearchClick}
                    />
                </div>
                </div>
            </div>
            </div>


        {/* Profile Icons List - Aligned Horizontally */}
        <div className="flex sm:justify-end justify-start pb-2 w-full mt-2 sm:mt-0">
          {selectedRoom && (
            <button className="mr-3 p-2 rounded-full   transition duration-200" onClick={handleBack}>
              <IoIosArrowBack className="text-red-800 text-xl font-bold" />
            </button>
          )}


          
            {/* Main Profile Section */}
            <div className="flex flex-col items-center pr-3 border-r-2 border-red-800">
            <img src={Profile} alt="Main Profile" className="w-12 h-12 rounded-full" />
            <span className="text-red-800 text-[10px] mt-1 font-bold text-center w-full">
              {selectedRoom ? "Room " + selectedRoom : "Mark Anthony"}
            </span>
            </div>


            {/* Scrollable Profiles Section */}
            <div
                className="ml-3 bg-gradient-to-br from-red-300 via-red-400 to-red-800 rounded-lg p-1 
                flex space-x-5 overflow-x-auto flex-nowrap whitespace-nowrap w-full sm:w-auto"
            >
                {profiles.map((profile) => (
                 <div
                 key={profile.id}
                 className={`flex flex-col items-center min-w-[60px] p-1 rounded-lg transition-transform ${
                     (selectedRoom === 201 && profile.name === "Bob Marley") || 
                     (selectedRoom === 202 && profile.name === "Isaac Obusan")  || (selectedRoom === 203 && profile.name === "Eve") 
                         ? "border-4 border-green-500 animate-borderRotate  relative "
                         : ""
                 }`}
             >
                
                        <img
                            src={Profile}
                            alt={`Profile ${profile.id}`}
                            className="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                        <span className="text-white text-[10px] mt-1">{profile.name}</span>
                    </div>
                ))}
            </div>            </div>


        </div>


        {/* Schedule Grid */}
        <div className="bg-white rounded-lg p-6 shadow-md w-full overflow-x-auto">
  {/* Weekday Labels */}

  {/* Schedule Grid */}
        <div className="h-[65vh] overflow-y-auto pb-10">
            <Schedule />
        </div>

        </div>

        {/* End Grid */}
      </div>
    </div>
  );
};

export default Dashboard;
