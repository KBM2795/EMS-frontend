import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { getDepartment } from "../../utils/EmployeeHelp";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
  const [employee, setEmployee] = useState({
    department: "",
    employee: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure id is extracted from useParams
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments", error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      department: selectedDepartment,
    }));

    if (selectedDepartment) {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${selectedDepartment}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        console.error("Error fetching employees", error);
      } finally {
        setDepLoading(false);
      }
    } else {
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!employee.department || !employee.employee || !employee.basicSalary || !employee.allowances || !employee.deductions || !employee.payDate) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/salary/add',
        employee,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.data.success === true) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>{depLoading ? <div className='relative left-[30vw] top-[30vh]  w-[30vw]'><img src="https://i.pinimg.com/originals/6b/e0/89/6be0890f52e31d35d840d4fe2e10385b.gif" alt="" /></div> :
      <div className="p-6 bg-gray-100 w-full flex justify-center items-center">
  <div className="max-w-5xl mx-auto bg-pink-100 shadow-md rounded-lg p-8">
    <h2 className="text-2xl font-semibold text-center mb-6">Add Employee Salary Details</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Select Department</label>
        <select name="department" value={employee.department} onChange={handleDepartmentChange} className="border p-3 rounded bg-white">
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>{department.dep_name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Select Employee</label>
        <select name="employee" value={employee.employee} onChange={handleChange} className="border p-3 rounded bg-white">
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp._id}>{emp.userId.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Basic Salary</label>
        <input type="text" name="basicSalary" value={employee.basicSalary} onChange={handleChange} placeholder="Basic Salary" className="border p-3 rounded bg-white" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Allowances</label>
        <input type="text" name="allowances" value={employee.allowances} onChange={handleChange} placeholder="Allowances" className="border p-3 rounded bg-white" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Deductions</label>
        <input type="text" name="deductions" value={employee.deductions} onChange={handleChange} placeholder="Deductions" className="border p-3 rounded bg-white" />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Pay Date</label>
        <input type="date" name="payDate" value={employee.payDate} onChange={handleChange} className="border p-3 rounded bg-white" />
      </div>
      <div className="col-span-2 flex justify-center">
        <button className="w-full bg-pink-600 text-white py-3 mt-6 rounded hover:bg-pink-700">
          Add Salary
        </button>
      </div>
    </form>
  </div>
</div>

    }</>
  );
};

export default AddSalary;


