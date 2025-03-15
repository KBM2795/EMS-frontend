import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'


const EditDepartment = () => {
  const {id} = useParams()
  const [department,setDepartment] = useState([])
  const [depLoading,setDepLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({...department ,[name]: value});
  };

  useEffect(()=>{
    const fetchDepartments = async () => {
      setDepLoading(true)
     try {
       const response = await axios.get(`http://localhost:3000/api/department/${id}`,{
        headers:{
           "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
       })
       
       
       
       if(response.data.success){
        setDepartment(response.data.department)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3000/api/department/${id}`,department,{
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
  }

  return (
    <>{depLoading? <div className='relative left-[30vw] top-[30vh]  w-[30vw]'><img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="" /></div>:
    <div className="min-h-fit w-1/2 flex items-center justify-center mb-0 ml-56 py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg">
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Edit Department</h2>
        <p className="mt-1 text-sm text-gray-500">Edit department in the system</p>
      </div>
      
      <form  onSubmit={handleSubmit}  className="px-8 py-6 space-y-6">
        {/* Department Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            name="dep_name"
            value={department.dep_name}
            onChange={handleChange}
            placeholder="Enter department name"
            required
          />
        </div>

        {/* Details Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Details
          </label>
          <textarea
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Enter department description"
            required
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Edit Department
          </button>
        </div>
      </form>
    </div>
  </div>
  }</>
  )
}

export default EditDepartment