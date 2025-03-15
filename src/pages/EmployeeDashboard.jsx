import React from 'react'
import {useAuth} from '../context/authContext'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/employeeDashboard/NavBar'
import Sidebar from '../components/employeeDashboard/sidebar'


const EmployeeDashboard = () => {
  const {user} = useAuth()
  return(
  <div className='h-full w-full overflow-hidden' >
  <NavBar />
  <div className='flex flex-row bg-gray-100 h-fit '>
  <Sidebar/>
  <Outlet />
  </div>
 
 </div>
  )
}

export default EmployeeDashboard