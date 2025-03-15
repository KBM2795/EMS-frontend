import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

import { FaSearch } from "react-icons/fa";

const DepartmentList = () => {
    const navigate = useNavigate();
    const [departments, setDepartments]= useState([])
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const depEdit = (id) => {
      navigate(`/admin-dashboard/department/edit/${id}`)
    }
    const depDelete =async (id) => {
      const confirm = window.confirm("Are you sure you want to delete this department?")
      if(confirm){
      try {
        
        const response = await axios.delete(`https://ems-serverside.vercel.app/api/department/${id}`,{
         headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
         }
        })
        
        
        
        if(response.data.success){
         navigate("/admin-dashboard")
        
      }
      } catch (error) {
       if(error.response && !error.response.data.success) {
         alert(error.response.data.error)
       }
      }
    }
    }
    useEffect(()=>{
      const fetchDepartments = async () => {
        setDepLoading(true)
       try {
         const response = await axios.get('https://ems-serverside.vercel.app/api/department',{
          headers:{
             "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
         })
         
         
         
         if(response.data.success){
          let sno = 1;
          const data = response.data.departments.map((dep)=>(            
            {

              _id: dep._id,
              sno : sno++,
              dep_name: dep.dep_name,
              
            }
          ))
          
          
          
          setDepartments(data)
          setFilteredDepartments(data)
         }
       } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
       } finally {
        setDepLoading(false)
       }
      }
      fetchDepartments();
    },[])

    const filterDepartments = (e) => {
      const records = departments.filter((dep)=>
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))

        setFilteredDepartments(records)
    }

  return (
    <>{depLoading? <div className='relative left-[30vw] top-[30vh]  w-[30vw]'><img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="" /></div>:
      <div className="p-6 w-full h-full">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              onChange={filterDepartments}
              placeholder="Search Department" 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button 
            onClick={() => navigate("/admin-dashboard/department/add")} 
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300 flex items-center gap-2">
            <span>+</span> Add Department
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-pink-500 text-white font-semibold text-left">#</th>
              <th className="px-6 py-3 bg-pink-500 text-white font-semibold text-left">Department Name</th>
              <th className="px-6 py-3 bg-pink-500 text-white font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredDepartments.map((dept) => (
              <tr key={dept.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">{dept.sno}</td>
                <td className="px-6 py-4 text-gray-800 font-medium">{dept.dep_name}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button 
                      className="p-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                      onClick={() => depEdit(dept._id)}
                    >
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      className="p-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                      onClick={() => depDelete(dept._id)}
                    >
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    }</>
  );
};

export default DepartmentList;
