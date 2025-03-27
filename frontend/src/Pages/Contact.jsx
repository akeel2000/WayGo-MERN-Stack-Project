import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="pt-32 md:pt-24 bg-amber-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative text-center py-16 px-4 overflow-hidden"
        style={{
          // Background image with gradient overlay
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.4)), url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Page Title */}
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          {/* Subtitle */}
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Have questions or need assistance? Get in touch with us using the details below or send us a message.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-6 ">
            <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-amber-500 text-xl" />
                <p className="text-gray-600">123 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
              {/* Phone */}
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-amber-500 text-xl" />
                <p className="text-gray-600">+94 11 234 5678</p>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-amber-500 text-xl" />
                <p className="text-gray-600">contact@waygo.lk</p>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-amber-500 hover:text-amber-600">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="#" className="text-amber-500 hover:text-amber-600">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-amber-500 hover:text-amber-600">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-amber-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Doe"
                  />
                </div>
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className="py-8 bg-amber-50"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Our Location</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Google Maps Embed */}
            <iframe
              title="WayGo Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757687!2d79.8444154153269!3d6.914682395003807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b8d5f07a9%3A0x5634a7e0411c7201!2sGalle%20Rd%2C%20Colombo%2003!5e0!3m2!1sen!2slk!4v1623456789012!5m2!1sen!2slk"
              className="w-full h-80 border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
