import React from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();
    const {user} = useAuth()
  return (
    <div className="w-full bg-gray-900 text-white flex justify-between items-center px-6 py-5">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-3xl font-bold ">EM System <span className="text-green-500 text-2xl ml-10">[{user.name}]</span></span>
      </div>

      {/* Right Side - Button */}
      <button 
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login")
      }}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  )
};

export default NavBar