import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div 
      className="min-h-screen flex flex-col bg-gradient-to-r from-pink-500 to-purple-900 text-white relative"
      style={{
        backgroundImage: "url('/assets/img4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-0"></div>

      <div className="flex flex-col items-center justify-center flex-grow z-10 relative mt-[27rem]">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          CAMPUS EVENTS ON THE GO!
        </h1>
        <h2 className="text-gray-500 font-bold mb-8 text-center px-4 py-2 rounded-lg">
          RSVP AND MANAGE UNFORGETTABLE CAMPUS EVENTS
        </h2>

        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-white text-pink-500 px-6 py-3 rounded-full shadow-lg hover:bg-pink-100 transition-all">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-white text-pink-500 px-6 py-3 rounded-full shadow-lg hover:bg-pink-100 transition-all">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
