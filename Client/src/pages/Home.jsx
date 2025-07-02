import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Discover a seamless way to manage your tasks, explore services, and
          stay connected. Designed to be fast, modern, and user-friendly.
        </p>
        <button
          onClick={() => {
            navigate("/menu");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
