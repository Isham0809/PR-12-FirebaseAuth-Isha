import React from "react";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, Package, User, BarChart3 } from "lucide-react";
import UserPanel from "./UserPanel";
import AdminPanel from "./AdminPanel";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = currentUser?.email === "admin@gmail.com";

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Failed to logout");
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-6 fixed h-full">
        <h2 className="text-2xl font-bold text-center">E-Commerce</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg">
            <BarChart3 /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg">
            <ShoppingCart /> Orders
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg">
            <Package /> Products
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg">
            <User /> Profile
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white font-semibold"
        >
          <LogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <User size={32} className="text-blue-600" />
            <p className="text-lg font-semibold">{currentUser?.email}</p>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Total Sales</h3>
              <p className="text-2xl font-bold text-blue-600">$12,340</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Orders</h3>
              <p className="text-2xl font-bold text-blue-600">124</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Products</h3>
              <p className="text-2xl font-bold text-blue-600">58</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Customers</h3>
              <p className="text-2xl font-bold text-blue-600">1,340</p>
            </div>
          </div>

          {/* Dynamic Section for Admin/User */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isAdmin ? "Admin Panel" : "User Panel"}
            </h2>
            {isAdmin ? <AdminPanel /> : <UserPanel />}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white shadow-md p-6 text-center text-gray-600">
          &copy; 2025 E-Commerce. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;