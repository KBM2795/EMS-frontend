import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { getDepartment } from "../../utils/EmployeeHelp";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const Edit = () => {
  const [employee, setEmployee] = useState({
    userId: { name: "",image: ""  }, // Add userId object to avoid undefined error
    maritalStatus: "",
    designation: "",
    salary: "",
    
    
  });
 
  
    const navigate = useNavigate();
    const {id} = useParams();
 
useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`https://ems-serverside.vercel.app/api/employee/${id}`,{
       headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
       }
      })
      
      
      
      if(response.data.success){
        const employee =  response.data.employee
       setEmployee((prev)=>({...prev,
        userId: { name: (employee.userId.name), image: (employee.userId.profileimg) },
         maritalStatus:employee.maritalStatus,
          designation:employee.designation,
          salary:employee.salary,
          
          
        }))
      }
    } catch (error) {
     if(error.response && !error.response.data.success) {
       alert(error.response.data.error)
     }
    } 
   }
   fetchEmployees();
}, [id]);


const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'image'){
        setEmployee((prevData) => ({...prevData, [name]: files[0]}));
    }else{
        setEmployee((prevData) => ({...prevData, [name]: value}));
    }
}



const handleSubmit = async (e) => {
    e.preventDefault();

     
   
    
       
    try {

        const response = await axios.put(
            `https://ems-serverside.vercel.app/api/employee/${id}`,
            employee,
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
    <>{employee ? (
    <div className="p-6 bg-gray-100  w-full flex justify-center items-center">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={employee.userId.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          
          <select name="maritalStatus" value={employee.maritalStatus} onChange={handleChange} className="border p-2 rounded">
            <option>Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
          <input type="text" value={employee.designation} name="designation" onChange={handleChange} placeholder="Designation" className="border p-2 rounded" />
          <input type="text" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded" />
          <img
                src={`https://ems-serverside.vercel.app/${employee.userId.image}`}
                alt="Profile Avatar"
                className="w-20 h-20 relative left-64 rounded-full mx-auto md:mx-0 object-cover"
                />
          <input type="file" name="image" onChange={handleChange}   className="border p-2 rounded" />
          <button className="w-[47vw] bg-blue-600 text-white py-2 mt-6 rounded hover:bg-blue-700">
          Edit Employee
          </button>
        </form>
        
      </div>
    </div>
    ): <div className='relative left-[30vw] top-[30vh]  w-[30vw]'><img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="" /></div>}</>
  );
};

export default Edit;
