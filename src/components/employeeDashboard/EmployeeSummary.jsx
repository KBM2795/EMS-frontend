import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext'

const EmployeeSummary = () => {
  const [employee, setEmployee] = useState({});
  const [leaveStatus, setLeaveStatus] = useState({
    totalLeaves: 0,
    leavesTaken: 0,
    remainingLeaves: 0,
  });
  const [salaryStatus, setSalaryStatus] = useState([]);
  const {user} = useAuth()


  
  
  useEffect(() => {

    const fetchLeaveStatus = async () => {
      try {
         const id = user._id;
        const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        
        const total = response.data.leave.length;
        const leavesTaken = response.data.leave.filter(leave => leave.status === 'Approved').length;
        const remainingLeaves = response.data.leave.length - leavesTaken;

        if (response.data.success) {
          setLeaveStatus({
            totalLeaves: total,
            leavesTaken: leavesTaken, 
            remainingLeaves: remainingLeaves,
          });
        }
      } catch (error) {
        console.error("Error fetching leave status:", error);
      }
    };

    const fetchSalaryStatus = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/api/salary/latest/${user._id}`,
            {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
 
        
      
        console.log(response.data.salary);
       
        if (response.data.success) {
          setSalaryStatus(response.data.salary);
          
        }
      } catch (error) {
        console.error("Error fetching salary status:", error);
      }
    };

    
    fetchLeaveStatus();
    fetchSalaryStatus();
    
    
  }, []);

  return (
    <div className="min-h-[80vh] w-full  p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-pink-400 tracking-wider">
        Welcome, {user.name}
      </h2>
      
      {/* Leave Status Card */}
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 mb-6 border-l-4 border-pink-500 transform transition-all duration-300 hover:scale-102 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Leave Status</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-300">Total Leaves</p>
            <p className="text-2xl font-bold text-white">{leaveStatus.totalLeaves}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-300">Leaves Taken</p>
            <p className="text-2xl font-bold text-pink-400">{leaveStatus.leavesTaken}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-300">Remaining</p>
            <p className="text-2xl font-bold text-green-400">{leaveStatus.remainingLeaves}</p>
          </div>
        </div>
        
        {/* Progress bar for leaves */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-pink-500 to-pink-300 h-4 rounded-full" 
              style={{ width: `${(leaveStatus.leavesTaken / leaveStatus.totalLeaves) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Salary Status Card */}
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 border-l-4 border-pink-500 transform transition-all duration-300 hover:scale-102 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Salary Status</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between bg-gray-700 p-4 rounded-lg">
            <span className="text-gray-300">Basic Salary</span>
            <span className="font-semibold text-white">{salaryStatus?.basicSalary || 0}</span>
          </div>
          <div className="flex justify-between bg-gray-700 p-4 rounded-lg">
            <span className="text-gray-300">Allowances</span>
            <span className="font-semibold text-pink-400">{salaryStatus?.allowance || 0}</span>
          </div>
          <div className="flex justify-between bg-gray-700 p-4 rounded-lg">
            <span className="text-gray-300">Deductions</span>
            <span className="font-semibold text-red-400">{salaryStatus?.dedustion || 0}</span>
          </div>
          <div className="flex justify-between bg-gray-700 p-4 rounded-lg">
            <span className="text-gray-300">Last Pay Date</span>
            <span className="font-semibold text-white">{new Date(salaryStatus?.paydate || 0).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-900 p-4 rounded-lg flex justify-between items-center">
          <span className="text-lg text-gray-300">Net Salary</span>
          <span className="text-2xl font-bold text-pink-400">{salaryStatus?.netSalary || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
