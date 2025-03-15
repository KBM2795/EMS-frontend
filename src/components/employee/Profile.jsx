import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://ems-serverside.vercel.app/api/employee/${id}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="Loading..." />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-4xl bg-gray-700 shadow-lg rounded-2xl overflow-hidden">
                {/* Header Banner */}
                <div className="w-full h-24 bg-pink-300"></div>

                <div className="px-6 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center -mt-16">
                            <div className="ring-4 ring-pink-300 rounded-full overflow-hidden">
                                <img
                                    src={`https://raw.githubusercontent.com/KBM2795/EMS-Server/refs/heads/main/public/uploads/${employee.userId.profileimg}`}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover"
                                />
                            </div>
                            <div className="mt-4 bg-pink-200 p-4 rounded-xl shadow-md text-center">
                                <h2 className="text-xl font-bold text-gray-800">{employee.userId.name}</h2>
                                <p className="text-gray-700 text-md">Employee ID: {employee.employeeId}</p>
                            </div>
                        </div>

                        {/* Employee Info Section */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Info Cards */}
                            {[
                                { label: "Designation", value: employee.designation, icon: "🏢" },
                                { label: "Department", value: employee.department.dep_name, icon: "📂" },
                                { label: "Email", value: employee.userId.email, icon: "📧" },
                                { label: "Date of Birth", value: new Date(employee.dob).toLocaleDateString(), icon: "🎂" },
                                { label: "Marital Status", value: employee.maritalStatus || "Not Provided", icon: "💍" },
                                { label: "Gender", value: employee.gender, icon: "⚧" },
                            ].map((item, index) => (
                                <div key={index} className="bg-pink-200 p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-pink-300 p-2 rounded-lg text-2xl">{item.icon}</div>
                                        <div>
                                            <p className="text-gray-700 font-medium text-sm">{item.label}</p>
                                            <p className="text-gray-800 font-bold">{item.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
