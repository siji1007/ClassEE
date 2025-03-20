import React from "react";
import background from '../assets/background.jpg';
import calendar_maroon from '../assets/calendar_maroon.png';

const Home: React.FC = () => {
    return (
    <div className="min-h-screen flex flex-col items-center">
        <div className="w-full h-[50vh] md:h-1/2">
            <img src={background} alt="Camarines Norte State College" className="w-full h-full object-cover" />
        </div>

  
        {/*Start Content Section */}
        <div className="text-center max-w-5xl mt-6 px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center mt-6 px-4 space-y-6 md:space-y-0 md:space-x-6">
                {/* Left Section - Title & Paragraph */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
                    <h1 className="text-2xl md:text-3xl font-bold"> ClassEE - Class Schedule </h1>
                    <p className="text-gray-600 text-sm md:text-base mt-4">
                        Keeping track of class schedules and finding facilities every day can be difficult, 
                        and both instructors and students sometimes forget. This web system offers a 
                        convenient way to manage and stay on top of your class schedule effortlessly!
                    </p>
                </div>
                {/* End of left section */}

                {/* Right Section - Calendar Image */}
                <div className="flex justify-center">
                    <img src={calendar_maroon} alt="Class Schedule Icon" className="w-48 md:w-64 lg:w-80 max-w-lg" />
                </div>
                {/* End of Right section */}

            </div>
        </div>
    </div>
    );
};

export default Home;
