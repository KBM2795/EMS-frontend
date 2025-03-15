import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center px-6 py-5">
        {/* Left Side - Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold">EM System <span className="text-green-500 text-2xl ml-10">[{user.name}]</span></span>
        </div>
        {/* Right Side - Button */}
        <button 
          onClick={handleLogout}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">EM System</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-4 py-3 bg-gray-800 shadow-lg">
            <div className="flex flex-col space-y-4">
              <div className="text-green-500 font-medium">[{user.name}]</div>
              <button 
                onClick={handleLogout}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default NavBar;
