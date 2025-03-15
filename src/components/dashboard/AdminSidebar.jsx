import { NavLink } from "react-router-dom";
import { Home,CalendarRange,DollarSign,Bolt , Users, Wallet,Building } from "lucide-react";
const AdminSidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <Home size={18} /> },
    { name: "Employees", path: "/admin-dashboard/employees", icon: <Users size={18} /> },
    { name: "Department", path: "/admin-dashboard/department", icon: <Building size={18} /> },
    { name: "Leave", path: "/admin-dashboard/leaves", icon: <CalendarRange size={18} /> },
    { name: "Salary", path: "/admin-dashboard/salary", icon: <DollarSign size={18} /> },
    { name: "Setting", path: "/admin-dashboard/setting", icon: <Bolt size={18} /> },
    
  ];

  return (
    <div className="w-72 h-[85vh]  rounded-3xl bg-purple-800 text-white p-5 m-5 flex flex-col">
        
      <nav className="space-y-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 text-2xl rounded-lg transition-colors ${
                isActive ? " text-pink-500" : "hover:bg-purple-700"
              }`
            }
            end
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;