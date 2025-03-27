import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-3 pb-3 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-3">

          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">WG</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                WayGo
              </span>
            </Link>
            <p className="text-gray-600">
              Making travel seamless and memorable since 2025.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-amber-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-500 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-700 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/hotel-booking" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link to="/services/car-rental" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link to="/services/guide" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  Tour Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">No 10,colomobo malabe Sri lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <a href="mailto:info@waygo.com" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  info@waygo.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  +94 075 294 1767
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-amber-600" />
                <a href="https://waygo.com" className="text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  www.waygo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-200 pt-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WayGo Travel. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-amber-600 text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
