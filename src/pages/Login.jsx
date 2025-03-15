import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      if (response.data.success && response.data.token) {
        login(response.data.user, response.data.token);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        setError("Invalid credentials");
        localStorage.removeItem("token");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Server error");
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">EM System : Better Task Management</h1>
          <img src="https://pixelwibes.com/template/my-task/html/dist/assets/images/login-img.svg" alt="Task Board" className="mt-6 w-72 ml-24" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-purple-900 p-10 text-white rounded-l-lg">
        <div className="w-80 p-8 bg-white shadow-lg rounded-lg text-gray-900">
          <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>
          <p className="text-center text-sm text-gray-600 mb-4">Free access to our dashboard</p>

          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <div className="flex items-center border rounded-lg bg-gray-200 px-3">
                <FaUser className="text-gray-600" />
                <input
                  type="email"
                  className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="flex items-center border rounded-lg bg-gray-200 px-3">
                <FaLock className="text-gray-600" />
                <input
                  type="password"
                  className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-purple-600 hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
