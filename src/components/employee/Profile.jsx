import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`https://ems-serverside.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployees();
  }, []);

  return (
    <>
      {employee ? (
        <div className="relative md:left-44 md:top-20 h-fit w-full md:w-[60vw] rounded-2xl bg-gray-800 p-6 md:p-8">
          <div className="w-full max-w-full md:max-w-[75vw] bg-gray-700 shadow-lg rounded-2xl overflow-hidden">
            {/* Header Banner */}
            <div className="w-full h-24 bg-pink-300"></div>

            <div className="px-6 md:px-8 pb-8 md:pb-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Left Section: Avatar & Role */}
                <div className="flex flex-col items-center md:items-start -mt-16">
                  <div className="ring-4 ring-pink-300 rounded-full inline-block">
                    <img
                      src={`https://raw.githubusercontent.com/KBM2795/EMS-Server/refs/heads/main/public/uploads/${employee.userId.profileimg}`}
                      alt="Profile Avatar"
                      className="w-28 h-28 md:w-44 md:h-44 rounded-full object-cover border-4 border-gray-700"
                    />
                  </div>
                  <div className="mt-4 bg-pink-200 p-3 md:p-4 rounded-xl shadow-md text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{employee.userId.name}</h2>
                    <p className="text-gray-700 text-sm md:text-md mt-1">Employee ID: {employee.employeeId}</p>
                  </div>
                </div>

                {/* Right Section: Info Cards */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Card Component */}
                  {[
                    { label: 'Designation', value: employee.designation },
                    { label: 'Department', value: employee.department.dep_name },
                    { label: 'Email', value: employee.userId.email },
                    { label: 'Date of Birth', value: new Date(employee.dob).toLocaleDateString() },
                    { label: 'Marital Status', value: employee.maritalStatus || 'Not Provided' },
                    { label: 'Gender', value: employee.gender },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-pink-200 p-3 md:p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105"
                    >
                      <p className="text-gray-700 font-medium text-sm">{item.label}</p>
                      <p className="text-gray-800 font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <img
            src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif"
            alt="Loading..."
          />
        </div>
      )}
    </>
  );
};

export default Profile;
