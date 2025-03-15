import React, { useState, useEffect } from 'react';
import {Search,  Calendar, Clock, FileText, CheckCircle, XCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';


const LeaveApplication = () => {
    const navigate = useNavigate();
    const {user} = useAuth()
    const [leaveHistory, setleaveHistory] = useState([]);
  

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        
        const id = user._id;
        const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        
        

        if (response.data.success) {
            setleaveHistory(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchLeaves();
  }, []);




  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'text-green-600';
      case 'Rejected': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

return (
    <div className="w-full h-[80vh] m-4 bg-white p-6 overflow-auto ">
        
        
        <div>
        <div className="flex flex-col  sm:flex-row gap-64 m-5">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Leave History</h2>
            
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
                     
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <button 
                    onClick={() => navigate("/employee-dashboard/leaves/apply")}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center justify-center transition-all"
                >
                    <Calendar className="w-5 h-5 mr-2" />
                    Apply Leave
                </button>
            </div>
            <div className="overflow-auto ">
                <table className="w-full rounded-xl overflow-auto shadow-md">
                    <thead className="bg-pink-500 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left">Type</th>
                            <th className="py-4 px-6 text-left">From</th>
                            <th className="py-4 px-6 text-left">To</th>
                            <th className="py-4 px-6 text-left">Description</th>
                            <th className="py-4 px-6 text-left">Applied Date</th>
                            <th className="py-4 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map((leave) => (
                            <tr key={leave.id} className="border-b border-gray-200 hover:bg-pink-50">
                                <td className="py-4 px-6">{leave.type}</td>
                                <td className="py-4 px-6">{new Date(leave.from).toLocaleDateString()}</td>
                                <td className="py-4 px-6">{new Date(leave.to).toLocaleDateString()}</td>
                                <td className="py-4 px-6">{leave.description}</td>
                                <td className="py-4 px-6">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        {getStatusIcon(leave.status)}
                                        <span className={`ml-2 ${getStatusColor(leave.status)}`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default LeaveApplication;