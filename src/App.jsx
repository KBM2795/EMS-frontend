import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import Profile from './components/employee/Profile'
import Edit from './components/employee/Edit'
import AddSalary from './components/salary/Add'
import View from './components/salary/View'
import EmployeeSummary from './components/employeeDashboard/EmployeeSummary'
import MyProfile from './components/employeeProfile/profile'
import Leaves from './components/employeeleaves/LeaveApplication'
import ApplyLeaves from './components/employeeleaves/ApplyLeave'
import Salary from './components/employeeSalary/salary'
import Setting from './components/Setting/employeeSetting'  
import AdminLeaves from './components/adminLeave/leaves'
import AdminSetting from './components/Setting/adminSetting'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/admin-dashboard' />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/admin-dashboard' element={
        <PrivateRoutes>
        <RoleBaseRoutes requiredRole={["admin"]}>
           <AdminDashboard />
        </RoleBaseRoutes>
        </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/department' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/department/add' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/edit/:id' element={<EditDepartment />}></Route>
          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/employees/add' element={<Add />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<Profile />}></Route>
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />}></Route>
          <Route path='/admin-dashboard/employees/salary/:id' element={<View/>}></Route>
          <Route path='/admin-dashboard/salary/' element={<AddSalary />}></Route>
          <Route path='/admin-dashboard/leaves' element={<AdminLeaves />}></Route>
          <Route path='/admin-dashboard/setting' element={<AdminSetting />}></Route>
        </Route>
      <Route path='/employee-dashboard' element={<PrivateRoutes>
        <RoleBaseRoutes requiredRole={["employee"]}>
           <EmployeeDashboard />
        </RoleBaseRoutes>
        </PrivateRoutes>
      }
      >
          <Route index element={<EmployeeSummary />}></Route>
          <Route path='/employee-dashboard/myprofile' element={<MyProfile />}></Route>
          <Route path='/employee-dashboard/leaves' element={<Leaves />}></Route>
          <Route path='/employee-dashboard/leaves/apply' element={<ApplyLeaves />}></Route>
          <Route path='/employee-dashboard/salary' element={<Salary />}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
