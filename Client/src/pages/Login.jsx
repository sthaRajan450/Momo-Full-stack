import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [email, password].some((field) => {
        return field?.trim() === "";
      })
    ) {
      alert("All fields are required");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 character");
      return;
    }

    let response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      response = await response.json();

      alert(response.message);
      setPassword("");
      setEmail("");
      setIsAuth(true);
      setUser(response.data);
      navigate("/");
    } else {
      alert("Error Occured!");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
