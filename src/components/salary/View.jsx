import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const View = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payrollData, setPayrollData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.salary.map((sal) => ({
            empId: sal.EmployeeId.employeeId,
            salary: sal.basicSalary,
            allowance: sal.allowances,
            deduction: sal.deductions,
            total: sal.netSalary,
            payDate: new Date(sal.payDate).toLocaleDateString(),
            sno: sno++
          }));
          setPayrollData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchPayrollData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = payrollData.filter((row) =>
      row.empId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-16 m-5">
        <h2 className="text-3xl font-semibold">Employees Salary</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Emp ID"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>
          <button className="bg-pink-600 text-white rounded-md px-4 py-2 flex items-center">
            <span className="mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </span>
            Add Salary
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-pink-500 text-white">
              <th className="py-3 px-6 font-medium">SNO</th>
              <th className="py-3 px-6 font-medium">EMP ID</th>
              <th className="py-3 px-6 font-medium">SALARY</th>
              <th className="py-3 px-6 font-medium">ALLOWANCE</th>
              <th className="py-3 px-6 font-medium">DEDUCTION</th>
              <th className="py-3 px-6 font-medium">TOTAL</th>
              <th className="py-3 px-6 font-medium">PAY DATE</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row) => (
              <tr key={row.sno} className="hover:bg-gray-50">
                <td className="py-4 px-6">{row.sno}</td>
                <td className="py-4 px-6">{row.empId}</td>
                <td className="py-4 px-6">₹ {row.salary}</td>
                <td className="py-4 px-6">₹ {row.allowance}</td>
                <td className="py-4 px-6">₹ {row.deduction}</td>
                <td className="py-4 px-6">₹ {row.total}</td>
                <td className="py-4 px-6">{row.payDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;