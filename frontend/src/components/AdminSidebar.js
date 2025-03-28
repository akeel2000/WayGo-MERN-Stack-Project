import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        setAdmin({
          id: data.userId,
          role: data.role,
          name: data.name,
          email: data.email,
        });
      })
      .catch(() => {
        setAdmin(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setAdmin(null);
      navigate("/?showLoginModal=true");
    } catch (err) {
      console.error(err);
      navigate("/?showLoginModal=true");
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white min-h-screen transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <span className="text-xl font-bold">Admin Panel</span>
          )}
          <button onClick={toggleCollapse} className="focus:outline-none">
            {isCollapsed ? ">>" : "<<"}
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          {admin ? (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
              </div>
              {!isCollapsed && (
                <div>
                  <p className="font-semibold">{admin.name}</p>
                  <p className="text-sm text-gray-300">{admin.role}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">No admin info</p>
          )}
        </div>

        {/* ✅ Updated Navigation Order */}
        <nav className="p-4 space-y-2">
          <Link
            to="/admin-dashboard"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "D" : "Dashboard"}
          </Link>
          <Link
            to="/admin/user-management"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "U" : "User Management"}
          </Link>
          <Link
            to="/admin/guide-management"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "G" : "Guide Management"}
          </Link>
          <Link
            to="/admin/rent-car-management"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "R" : "Rent Car Management"}
          </Link>
          <Link
            to="/admin/hotel-booking-management"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "H" : "Hotel Booking Management"}
          </Link>
          <Link
            to="/admin/view-bookings"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? "P" : "View Bookings"}
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded"
          >
            {isCollapsed ? "L" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-grow p-4">
        {/* Admin page content goes here */}
      </main>
    </div>
  );
}

export default AdminSidebar;
