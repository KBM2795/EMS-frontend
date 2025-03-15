import React, { useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle, XCircle, Users } from 'lucide-react';
import { useAuth } from '../../context/authContext'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
    const {user} = useAuth()
    const [leaveData, setLeaveData] = useState({
        userId: user._id,
        type: '',
        from: '',
        to: '',
        description: '',

      });
      const navigate = useNavigate();


       const handleChange = (e) => {   
          const {name,value} = e.target
            setLeaveData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }

        const handleSubmit =async(e) => {
            e.preventDefault();
            try {
                console.log(leaveData);
                
                const response = await axios.post('http://localhost:3000/api/leave/apply',
                     leaveData, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                          }
                })  
                
                if (response.data.success) {
                    navigate('/employee-dashboard/leaves')
                    alert('Leave application submitted successfully!')
                }
            } catch (error) {
                
            }
        }
  return (
    <div className="mb-8 w-full m-4 h-[80vh]">
        <h2 className="text-3xl font-semibold text-gray-800  relative left-28 mt-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r w-3/4 relative left-28 top-10 from-pink-50 to-pink-100 p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Leave Type</label>
              <select 
              onChange={handleChange}
              name='type'
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
                <option value="">Select leave type</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Personal">Personal Leave</option>
                <option value="Vacation">Vacation</option>
              </select>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
           
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">From Date</label>
              <input 
              onChange={handleChange}
              name='from'
              type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">To Date</label>
              <input 
              onChange={handleChange}
                name='to'
              type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
          </div>
          
          <div className="mb-4">
            <label 
            
            className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea 
            onChange={handleChange}
            name='description'
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Reason for leave..."></textarea>
          </div>
          
          <div className="flex justify-end">
            <button 
        
            className="bg-pink-600 text-white w-full px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md">
              Submit Request
            </button>
          </div>
        </div>
        </form>
      </div>
  )
}

export default ApplyLeave