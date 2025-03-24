// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Store user info if logged in
  const [user, setUser] = useState(null);
  // Controls profile dropdown visibility
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Controls AuthModal visibility
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        setUser({
          id: data.userId,
          role: data.role,
          name: data.name,
          email: data.email,
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showLoginModal") === "true") {
      setShowModal(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsProfileOpen(false);
      navigate("/?showLoginModal=true");
    } catch (err) {
      console.error(err);
      navigate("/?showLoginModal=true");
    }
  };

  return (
    <header className="bg-white shadow py-4 relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          WayGo
        </Link>

        <nav className="space-x-6 text-gray-700 hidden md:flex">
          <Link to="/" className="hover:text-gray-500">Home</Link>
          <Link to="/about" className="hover:text-gray-500">About</Link>
          <Link to="/destinations" className="hover:text-gray-500">Destinations</Link>
          <Link to="/services" className="hover:text-gray-500">Services</Link>
          <Link to="/gallery" className="hover:text-gray-500">Gallery</Link>
          <Link to="/blogs" className="hover:text-gray-500">Blogs</Link>
          {/* New Guides link */}
          <Link to="/guides" className="hover:text-gray-500">Guides</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!user && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700"
            >
              Sign in
            </button>
          )}

          {user && (
            <>
              <button
                onClick={handleLogout}
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700"
              >
                Logout
              </button>
              <div className="relative">
                <button
                  onClick={handleProfileToggle}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-800"
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded z-50">
                    <div className="p-4">
                      {user.name && <p className="font-bold">{user.name}</p>}
                      {user.email && <p className="text-sm">{user.email}</p>}
                      <p className="text-sm">Role: {user.role}</p>
                      <p className="text-xs text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <AuthModal initialTab="login" onClose={() => setShowModal(false)} />
      )}
    </header>
  );
}

export default Header;
