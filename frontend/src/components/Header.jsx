import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt, FaCreditCard } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/isLoggedIn", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser({
          id: data.userId,
          role: data.role,
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
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
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={navLinkClasses("/")}>
            Home
          </Link>
          <Link to="/destinations" className={navLinkClasses("/destinations")}>
            Destinations
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
                {["hotel-booking", "car-rental", "guide"].map((service) => (
                  <Link
                    key={service}
                    to={`/services/${service}`}
                    onClick={() => setIsServicesOpen(false)}
                    className={`block px-4 py-3 transition-colors duration-150 ${
                      location.pathname === `/services/${service}`
                        ? "bg-amber-50 text-amber-600 font-medium"
                        : "text-gray-700 hover:bg-amber-50 hover:text-orange-500"
                    }`}
                  >
                    {service
                      .split("-")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" className={navLinkClasses("/blog")}>
            Blog
          </Link>
          <Link to="/contact" className={navLinkClasses("/contact")}>
            Contact
          </Link>
          <Link to="/weather" className={navLinkClasses("/weather")}>
            Weather
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/signIn")}
                className="px-5 py-2 rounded-lg font-medium text-gray-700 hover:text-orange-500 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Register
              </button>
            </>
          ) : (
            <>
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full text-gray-700 hover:text-orange-500 transition-colors"
                title="View Cart"
              >
                <FaShoppingCart className="w-5 h-5" />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-medium shadow-sm hover:shadow-md transition-all"
                  aria-label="User profile"
                >
                  {user.name?.charAt(0).toUpperCase() || <FaUser />}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-xl z-50 overflow-hidden">
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500">
                      <p className="font-bold text-white truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-sm text-white/90 truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate('/user-cards');
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaCreditCard className="mr-3 text-gray-500" />
                        Payment Methods
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3 text-gray-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-orange-500 transition-colors"
          onClick={() => toggleDropdown(setIsMobileMenuOpen, isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-amber-50 hover:text-orange-500"
            >
              Home
            </Link>
            {/* Add other mobile menu links similarly */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
