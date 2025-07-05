import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const Register = () => {
  const { setIsAuth,setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [name, email, phone, password].some((field) => {
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

    let response = await fetch("http://localhost:9000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (response.ok) {
      response = await response.json();
      console.log(response.message);
      alert(response.message + "!");
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");
      setIsAuth(true);
      setUser(response.data)
      // navigate("/login");
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
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

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
          <label htmlFor="phone" className="block text-gray-700 font-medium">
            Phone Number
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
