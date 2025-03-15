import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(()=>{
        const fetchEmployees = async () => {
         try {
           const response = await axios.get(`https://ems-serverside.vercel.app/api/employee/${id}`,{
            headers:{
               "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
           })
           
           
           
           if(response.data.success){
            setEmployee(response.data.employee)
           }
         } catch (error) {
          if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
          }
         } 
        }
        fetchEmployees();
      },[])

  return (
    <>{employee ? (
      <div className="relative left-44 top-20 h-fit  rounded-2xl bg-gray-800 p-8">
      <div className="w-full max-w-[75vw] bg-gray-700 shadow-lg rounded-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="w-full h-24 bg-pink-300"></div>
        
        <div className="px-8 pb-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Section: Avatar & Role */}
            <div className="flex-shrink-0 text-center md:text-left -mt-16">
              <div className="ring-4 ring-pink-300 rounded-full inline-block">
                <img
                  src={`https://raw.githubusercontent.com/KBM2795/EMS-Server/refs/heads/main/public/uploads/${employee.userId.profileimg}`}
                  alt="Profile Avatar"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-gray-700"
                />
              </div>
              <div className="mt-4 bg-pink-200 p-4 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">{employee.userId.name}</h2>
                <p className="text-gray-700 text-md mt-1">Employee ID: {employee.employeeId}</p>
              </div>
            </div>
    
            {/* Right Section: Info Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Designation Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10l1.5-2.5A2 2 0 016 7h12a2 2 0 011.5.5L21 10M12 12v4m-4 0h8m-4-8V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Designation</p>
                    <p className="text-gray-800 font-bold">{employee.designation}</p>
                  </div>
                </div>
              </div>
    
              {/* Department Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Department</p>
                    <p className="text-gray-800 font-bold">{employee.department.dep_name}</p>
                  </div>
                </div>
              </div>
    
              {/* Email Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12h2a2 2 0 002-2V7a2 2 0 00-2-2h-2M8 12H6a2 2 0 01-2-2V7a2 2 0 012-2h2m0 0l4 4m0 0l4-4m-4 4v6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Email</p>
                    <p className="text-gray-800 font-bold truncate max-w-xs">{employee.userId.email}</p>
                  </div>
                </div>
              </div>
    
              {/* Date of Birth Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Date of Birth</p>
                    <p className="text-gray-800 font-bold">{new Date(employee.dob).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
    
              {/* Marital Status Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.146 10.63l-5.217 5.217a4 4 0 01-5.656 0L4.146 10.63A7 7 0 0110 4a7 7 0 0110.146 6.63z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Marital Status</p>
                    <p className="text-gray-800 font-bold">{employee.maritalStatus || 'Not Provided'}</p>
                  </div>
                </div>
              </div>
    
              {/* Gender Card */}
              <div className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-300 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium text-sm">Gender</p>
                    <p className="text-gray-800 font-bold">{employee.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    ): <div className='relative left-[30vw] top-[30vh]  w-[30vw]'><img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="" /></div>}</>
  )
}

export default Profile
