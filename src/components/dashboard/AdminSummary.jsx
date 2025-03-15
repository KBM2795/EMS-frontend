import React, { useEffect, useState } from 'react';
import { Users, Briefcase, DollarSign, FileText, XCircle, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState({});
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setSummary(response.data);
        }
        
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setDepLoading(false);
      }
    };
    fetchSummary();
    console.log(summary)
  }, []);

  if (depLoading) {
    return (
      <div className="relative left-[30vw] top-[30vh] w-[30vw]">
        <img
          src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="p-4 h-fit m-10 w-full bg-white">
      <h2 className="text-3xl font-bold mb-10 m-5  text-gray-800">Employees Availability</h2>
      <div className="grid grid-cols-1 m-3 md:grid-cols-3 gap-4 mb-10">
        {/* Total Employees */}
        <div className="flex items-center  p-4 bg-gray-800 border-l-4 border-pink-500 rounded-xl shadow hover:shadow-lg transition-all">
          <div className="mr-4 p-3 bg-pink-200 rounded-lg">
            <Users className="w-10 h-10 text-pink-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-pink-300">Total Employees</p>
            <p className="text-3xl font-bold text-pink-200">{summary?.totalEMployees || 0}</p>
          </div>
        </div>
        {/* Total Departments */}
        <div className="flex items-center p-4 bg-gray-800 border-l-4 border-pink-500 rounded-xl shadow hover:shadow-lg transition-all">
          <div className="mr-4 p-3 bg-pink-200 rounded-lg">
            <Briefcase className="w-10 h-10 text-pink-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-pink-300">Total Departments</p>
            <p className="text-3xl font-bold text-pink-200">{summary?.totalDepartments || 0}</p>
          </div>
        </div>
        {/* Monthly Payment */}
        <div className="flex items-center p-4 bg-gray-800 border-l-4 border-pink-500 rounded-xl shadow hover:shadow-lg transition-all">
          <div className="mr-4 p-3 bg-pink-200 rounded-lg">
            <DollarSign className="w-10 h-10 text-pink-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-pink-300">Monthly Payment</p>
            <p className="text-3xl font-bold text-pink-200">Rs.{summary?.totalSalary || 0}</p>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg rounded-3xl w-full mb-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Leave Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Leave Applied */}
          <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-all">
            <div className="mr-4 p-2 bg-purple-100 rounded-lg">
              <FileText className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Leave Applied</p>
              <p className="text-2xl font-bold text-gray-900">{summary.leaveSummary?.appliedFor || 0}</p>
            </div>
          </div>
          {/* Leave Rejected */}
          <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-all">
            <div className="mr-4 p-2 bg-red-100 rounded-lg">
              <XCircle className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Leave Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{summary.leaveSummary?.rejected || 0}</p>
            </div>
          </div>
          {/* Leave Accepted */}
          <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-all">
            <div className="mr-4 p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Leave Accepted</p>
              <p className="text-2xl font-bold text-gray-900">{summary.leaveSummary?.approved || 0}</p>
            </div>
          </div>
          {/* Leave Pending */}
          <div className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition-all">
            <div className="mr-4 p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Leave Pending</p>
              <p className="text-2xl font-bold text-gray-900">{summary.leaveSummary?.pending || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
