import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description:""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department ,[name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
        const response = await axios.post("http://localhost:3000/api/department/add",department,{
            headers : {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        
        if(response.data.success == true) {
          navigate("/admin-dashboard/department")
        }
     } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
     }
  }
};

  return (
    <div className="p-6 bg-gray-100 w-full flex justify-center items-center">
  <div className="max-w-3xl mx-auto bg-pink-100 shadow-md rounded-lg p-8">
    <h2 className="text-2xl font-semibold text-center mb-6">Add New Department</h2>
    <p className="text-center text-gray-600 mb-6">Create a new department in the system</p>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Department Name</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
          name="dep_name"
          onChange={handleChange}
          placeholder="Enter department name"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Details</label>
        <textarea
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
          rows="4"
          name="description"
          onChange={handleChange}
          placeholder="Enter department description"
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2.5 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          Create Department
        </button>
      </div>
    </form>
  </div>
</div>

  );
}


export default AddDepartment;
