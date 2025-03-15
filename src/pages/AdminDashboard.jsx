import React from 'react'
import {useAuth} from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import NavBar from '../components/dashboard/NavBar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  const {user} = useAuth()
  
  
  return (
    <div className='h-full w-full overflow-hidden' >
    <NavBar />
    <div className='flex flex-row bg-gray-100 h-fit '>
    <AdminSidebar/>
    <Outlet />
    </div>
   
   </div>
  )
}

export default AdminDashboard