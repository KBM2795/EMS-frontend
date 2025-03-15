import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { getDepartment } from "../../utils/EmployeeHelp";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
 
useEffect(() => {
getDepartment().then((data) => {
    setDepartments(data);
  });
}, []);


const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'image'){
        setFormData((prevData) => ({...prevData, [name]: files[0]}));
    }else{
        setFormData((prevData) => ({...prevData, [name]: value}));
    }
}



const handleSubmit = async (e) => {
    e.preventDefault();

     
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
   });
    
    
       
    try {

        const response = await axios.post(
            "https://ems-serverside.vercel.app/api/employee/add",
            formDataObj,
            {
                headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        
        if(response.data.success === true) {
          navigate("/admin-dashboard/employees")
        }
     } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
     }
  }

}

  return (
    <div className="p-6 bg-gray-100  w-full flex justify-center items-center">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Employee</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input type="email" name="email" onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          <input type="text" name="employeeId" onChange={handleChange} placeholder="Employee ID" className="border p-2 rounded" />
          <input type="date" name="dob" onChange={handleChange} placeholder="Date of Birth" className="border p-2 rounded" />
          <select name="gender" onChange={handleChange} className="border p-2 rounded">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select name="maritalStatus" onChange={handleChange} className="border p-2 rounded">
            <option>Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
          <input type="text" name="designation" onChange={handleChange} placeholder="Designation" className="border p-2 rounded" />
          <select name="department" onChange={handleChange} className="border p-2 rounded">
            <option>Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>{department.dep_name}</option>
            ))}
          </select>
          <input type="text" name="salary" onChange={handleChange} placeholder="Salary" className="border p-2 rounded" />
          <select name="role" onChange={handleChange} className="border p-2 rounded">
            <option>Select Role</option>
            <option>admin</option>
            <option>employee</option>
          </select>
          <input type="password" name="password" onChange={handleChange} placeholder="Password" className="border p-2 rounded" />
          <input type="file" name="image" onChange={handleChange}   className="border p-2 rounded" />
          <button className="w-[47vw] bg-blue-600 text-white py-2 mt-6 rounded hover:bg-blue-700">
          Add Employee
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Add;
