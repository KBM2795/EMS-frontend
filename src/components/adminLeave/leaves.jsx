import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock, FileText, CheckCircle, XCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Leaves = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "appliedAt", direction: "desc" });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("https://ems-serverside.vercel.app/api/leave", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        if (response.data.success) {
          setLeaveHistory(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  const handleApprove = async (leaveId) => {
    try {
      const response = await axios.put(`https://ems-serverside.vercel.app/api/leave/${leaveId}`, 
        { status: "Approved" }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const response = await axios.put(`https://ems-serverside.vercel.app/api/leave/${leaveId}`, 
        { status: "Rejected" }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "text-green-600";
      case "Rejected": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Rejected": return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Apply sorting logic
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...leaveHistory].sort((a, b) => {
    const aValue = new Date(a[sortConfig.key]);
    const bValue = new Date(b[sortConfig.key]);
    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  const filteredLeaves = sortedData.filter((leave) =>
    leave.employeeId.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 md:p-8 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-pink-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Leave History</h2>
        </div>
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table (With Horizontal Scroll on Mobile) */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-md">
        <table className="w-full min-w-[700px] table-auto">
          <thead>
            <tr className="bg-pink-500 text-white">
              {["Employee", "Type", "From", "To", "Description", "Applied Date", "Status", "Actions"].map((header, index) => (
                <th key={index} className="py-4 px-6 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-pink-50">
                  <td className="py-4 px-6 font-medium">{leave.employeeId.employeeId}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">{leave.type}</span>
                  </td>
                  <td className="py-4 px-6">{new Date(leave.from).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{new Date(leave.to).toLocaleDateString()}</td>
                  <td className="py-4 px-6 max-w-xs truncate">{leave.description}</td>
                  <td className="py-4 px-6">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{getStatusIcon(leave.status)}
                      <span className={`ml-2 ${getStatusColor(leave.status)} font-medium`}>
                        {leave.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(leave._id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </button>
                      <button onClick={() => handleReject(leave._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="py-8 px-6 text-center text-gray-500">No leave records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
