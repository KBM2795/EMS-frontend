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
        const response = await axios.get('https://ems-serverside.vercel.app/api/dashboard/summary', {
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
  }, []);

  if (depLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="p-4 w-full bg-white">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Employees Availability</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[{
          label: 'Total Employees',
          value: summary?.totalEMployees || 0,
          Icon: Users,
        }, {
          label: 'Total Departments',
          value: summary?.totalDepartments || 0,
          Icon: Briefcase,
        }, {
          label: 'Monthly Payment',
          value: `Rs.${summary?.totalSalary || 0}`,
          Icon: DollarSign,
        }].map(({ label, value, Icon }, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-800 border-l-4 border-pink-500 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <div className="mr-4 p-3 bg-pink-200 rounded-lg">
              <Icon className="w-10 h-10 text-pink-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-pink-300">{label}</p>
              <p className="text-3xl font-bold text-pink-200">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg rounded-3xl w-full mb-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Leave Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{
            label: 'Leave Applied',
            value: summary.leaveSummary?.appliedFor || 0,
            Icon: FileText,
            bg: 'bg-purple-100',
          }, {
            label: 'Leave Rejected',
            value: summary.leaveSummary?.rejected || 0,
            Icon: XCircle,
            bg: 'bg-red-100',
          }, {
            label: 'Leave Accepted',
            value: summary.leaveSummary?.approved || 0,
            Icon: CheckCircle,
            bg: 'bg-green-100',
          }, {
            label: 'Leave Pending',
            value: summary.leaveSummary?.pending || 0,
            Icon: Clock,
            bg: 'bg-yellow-100',
          }].map(({ label, value, Icon, bg }, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className={`mr-4 p-3 ${bg} rounded-lg`}>
                <Icon className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
