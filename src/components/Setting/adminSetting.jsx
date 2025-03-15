import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'



const adminSetting = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [setting,setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState()

  const handleChange = (e)=>{
     const {name , value} = e.target;
      setSetting({...setting, [name] : value})
  }


  const handleSubmit = async (e)=> {
      e.preventDefault();
      if(setting.newPassword !== setting.confirmPassword) {
          setError("Password not match");
      }else{
        try {
          
          const response = await axios.put(
            "http://localhost:3000/api/setting/change-password",
            setting,
            {
              headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          if(response.data.success ){
             navigate("/admin-dashboard");
             setError("");
          }else{
            setError(response.data.error)
          }

        } catch (error) {
          if(error.response && !error.response.data.success) {
            setError(error.response.data.error)
        }
      }
  }
}
  return (
    
    <div className="p-10 bg-gray-100 w-full flex justify-center items-center">
    <div className="max-w-4xl mx-auto bg-pink-100 shadow-md rounded-lg p-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
      {error !== 0 &&(
        <h3 className='text-red-500 m-3'> {error} </h3>
       )}
      <p className="text-center text-gray-600 mb-6">Update your password securely</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Old Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            name="oldPassword"
            onChange={handleChange}
            placeholder="Enter old password"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            name="newPassword"
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Re-enter new password"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2.5 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default adminSetting