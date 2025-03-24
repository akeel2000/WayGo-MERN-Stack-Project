// src/AuthModal.js
import React, { useState } from "react";
import LoginForm from "../Pages/LoginForm";
import SignUpForm from "../Pages/SignUpForm";

function AuthModal({ onClose, initialTab = "login" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md p-6 rounded shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "login"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === "signup"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default AuthModal;
