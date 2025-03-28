import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiMap,
  FiTruck,
  FiBriefcase,
  FiCalendar,
  FiCreditCard,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

function AdminSidebar() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

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

  const navItems = [
    { path: "/admin-dashboard", icon: <FiHome size={20} />, label: "Dashboard", key: "dashboard" },
    { path: "/admin/user-management", icon: <FiUsers size={20} />, label: "User Management", key: "users" },
    { path: "/admin/guide-management", icon: <FiMap size={20} />, label: "Guide Management", key: "guides" },
    { path: "/admin/rent-car-management", icon: <FiTruck size={20} />, label: "Rent Car Management", key: "cars" },
    { path: "/admin/hotel-booking-management", icon: <FiBriefcase size={20} />, label: "Hotel Management", key: "hotels" },
    { path: "/admin/view-bookings", icon: <FiCalendar size={20} />, label: "View Bookings", key: "bookings" },
    { path: "/admin/card-management", icon: <FiCreditCard size={20} />, label: "Card Management", key: "cards" }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar with amber/orange color scheme */}
      <aside
        className={`bg-gradient-to-b from-amber-50 to-amber-100 text-gray-800 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
          } flex flex-col shadow-xl border-r border-amber-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200">
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Admin Portal
            </span>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-amber-200 transition-colors focus:outline-none text-amber-600"
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-b border-amber-200">
          {admin ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="font-semibold truncate">{admin.name}</p>
                  <p className="text-xs text-amber-600 capitalize">{admin.role}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-amber-600">Loading...</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-all ${activeItem === item.key
                ? "bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-600 border-l-4 border-amber-500 font-medium"
                : "hover:bg-amber-200/50 text-gray-700 hover:text-amber-600"
                }`}
              onClick={() => setActiveItem(item.key)}
            >
              <span className={`${activeItem === item.key ? "text-amber-600" : "text-gray-600"}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-amber-200">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center w-full p-3 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 text-red-600 transition-all ${isCollapsed ? "justify-center" : ""
              }`}
          >
            <FiLogOut size={20} />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-grow bg-white overflow-y-auto">
        {/* Admin page content will be rendered here */}
      </main>
    </div>
  );
}

export default AdminSidebar;
