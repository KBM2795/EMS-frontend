import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/employeeDashboard/NavBar'
import Sidebar from '../components/employeeDashboard/sidebar'
import { Menu, X } from 'lucide-react'

const EmployeeDashboard = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className='h-full w-full overflow-hidden'>
      <NavBar />
      
      {/* Mobile Toggle Button - On the left side */}
      <button 
        className='md:hidden fixed z-50 bottom-4 left-4 bg-purple-700 text-white p-3 rounded-full shadow-lg'
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <div className='flex flex-row bg-gray-100 h-fit'>
        {/* Sidebar with responsive classes */}
        <div 
          className={`
            fixed md:relative z-40 
            ${sidebarOpen ? 'left-0' : '-left-full'} 
            md:left-0 transition-all duration-300 ease-in-out
            h-screen shadow-lg md:shadow-none
          `}
        >
          <Sidebar />
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main content with responsive margin */}
        <div className='flex-1 w-full md:w-auto overflow-auto p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
