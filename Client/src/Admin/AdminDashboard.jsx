import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-900 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="productManagement"
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            🛒 Product Management
          </NavLink>
          <NavLink
            to="userManagement"
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            👥 User Management
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
