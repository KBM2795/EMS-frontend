import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [empLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://ems-serverside.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            name: emp.userId.name,
            dep_name: emp.department?.dep_name || "Unknown",
            sno: sno++,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover"
                src={`https://raw.githubusercontent.com/KBM2795/EMS-Server/refs/heads/main/public/uploads/${emp.userId.profileimg}`}
                alt="Profile"
              />
            ),
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <>
      {empLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="p-6 w-full min-h-screen flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-pink-200 mb-4 sm:mb-0">Employees</h2>
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-auto">
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search Employee"
                  className="w-full sm:w-[250px] pl-10 pr-4 py-2 bg-gray-700 border border-pink-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  onChange={filterEmployees}
                />
              </div>

              {/* Add Employee Button */}
              <button
                onClick={() => navigate("/admin-dashboard/employees/add")}
                className="bg-pink-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-pink-400 font-semibold transition duration-300 w-full sm:w-auto"
              >
                + Add Employee
              </button>
            </div>
          </div>

          {/* Employee List */}
          <div className="flex-1 overflow-auto scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredEmployees.map((employee, index) => (
                <div
                  key={index}
                  className="bg-gray-700 shadow-lg rounded-xl p-6 flex flex-col items-center sm:flex-row sm:items-center gap-6 border-l-4 border-pink-300 hover:scale-[1.02] transition duration-300"
                >
                  {/* Employee Image */}
                  <div className="ring-2 ring-pink-300 rounded-full">{employee.profileImage}</div>

                  {/* Employee Details */}
                  <div className="flex flex-col text-center sm:text-left">
                    <h3 className="text-xl font-bold pb-2 text-pink-200">{employee.name}</h3>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                      <span className="text-sm bg-pink-200 text-gray-800 px-3 py-1 rounded-full font-medium">
                        {employee.dep_name}
                      </span>
                      <span className="text-sm bg-pink-200 text-gray-800 px-3 py-1 rounded-full font-medium">
                        DOB: {employee.dob}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => navigate(`/admin-dashboard/employees/${employee._id}`)}
                        className="bg-pink-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-pink-400 transition duration-300 font-medium"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/employees/edit/${employee._id}`)}
                        className="bg-gray-600 text-pink-200 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 font-medium border border-pink-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/employees/salary/${employee._id}`)}
                        className="bg-gray-600 text-pink-200 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 font-medium border border-pink-200"
                      >
                        Salary
                      </button>
                      <button
                        onClick={() => navigate(`/admin-dashboard/leaves`)}
                        className="bg-gray-600 text-pink-200 px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300 font-medium border border-pink-200"
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
