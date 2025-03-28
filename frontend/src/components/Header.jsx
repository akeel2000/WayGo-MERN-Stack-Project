import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject("Not logged in")))
      .then((data) => {
        setUser({
          id: data.userId,
          role: data.role,
          name: data.name,
          email: data.email,
        });
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsProfileOpen(false);
      navigate("/signin");
    } catch (err) {
      console.error(err);
      navigate("/Signin");
    }
  };

  const toggleDropdown = (setter, state) => setter(!state);

  const navLinkClasses = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "text-amber-600 bg-amber-50"
        : "text-gray-700 hover:bg-amber-50 hover:text-orange-500"
    }`;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">WG</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            WayGo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link to="/" className={navLinkClasses("/")}>
            Home
          </Link>
          <Link to="/destinations" className={navLinkClasses("/destinations")}>
            Destination
          </Link>
          <Link to="/about" className={navLinkClasses("/about")}>
            About
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown(setIsServicesOpen, isServicesOpen)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isServicesOpen || location.pathname.includes("/services")
                  ? "text-amber-600 bg-amber-50"
                  : "text-gray-700 hover:bg-amber-50 hover:text-orange-500"
              }`}
            >
              Services
              <svg
                className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isServicesOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
                {["hotel-booking", "car-rental", "guide"].map((service, idx) => (
                  <Link
                    key={idx}
                    to={`/services/${service}`}
                    onClick={() => setIsServicesOpen(false)}
                    className={`block px-4 py-3 transition-colors duration-150 ${
                      location.pathname === `/services/${service}`
                        ? "bg-amber-50 text-amber-600 font-medium"
                        : "text-gray-700 hover:bg-amber-50 hover:text-orange-500"
                    }`}
                  >
                    {service
                      .replace("-", " ")
                      .replace(/^./, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className={navLinkClasses("/blog")}>
            Blog
          </Link>
          <Link to="/contact" className={navLinkClasses("/contact")}>
            Contact Us
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/signIn")}
                className="px-5 py-2 rounded-full font-medium text-amber-600 hover:text-orange-500"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-full font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600"
              >
                Register
              </button>
            </>
          ) : (
            <>
              {/* ✅ Cart Icon (only for logged-in users) */}
              <Link
                to="/cart"
                className="relative px-4 py-2 rounded-full font-medium text-gray-700 hover:text-orange-500 flex items-center"
                title="View Cart"
              >
                <svg
                  className="w-6 h-6 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 6.55A1 1 0 007 21h10a1 1 0 001-1.45L17 13" />
                </svg>
                <span className="text-sm">Cart</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full font-medium text-gray-700 hover:text-orange-500"
              >
                Logout
              </button>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 hover:border-amber-200"
                  aria-label="User profile"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>
                {isProfileOpen && (
  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-lg z-50">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-amber-100">
      <p className="font-bold text-gray-800">
        {user.name || "User"}
      </p>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
    <div className="p-4">
      <p className="text-xs text-gray-500 mb-2">ID: {user.id}</p>
      <p className="text-sm text-gray-700 mb-1">
        Role:{" "}
        <span className="font-medium text-amber-600">{user.role}</span>
      </p>
    </div>

    {/* ✅ New Button to Card Details */}
    <button
      onClick={() => navigate('/user-cards')}
      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    >
      💳 Card Details
    </button>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600"
    >
      Logout
    </button>
  </div>
)}

              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-orange-500"
          onClick={() => toggleDropdown(setIsMobileMenuOpen, isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
