// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";

import Home from "./Pages/Home";
import LoginForm from "./Pages/LoginForm";
import SignUpForm from "./Pages/SignUpForm";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import UserManagement from "./Pages/UserManagement";
import AdminGuideManagement from "./Pages/AdminGuideManagement";
import GuideDetails from "./Pages/GuideDetails";
import GuideList from "./Pages/GuideList"; // if you have one for listing guides
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./Pages/About";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><LoginForm /></PublicLayout>} />
      <Route path="/signup" element={<PublicLayout><SignUpForm /></PublicLayout>} />
      <Route path="/services/guide" element={<PublicLayout><GuideList /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><About /></PublicLayout>} />


      {/* Protected Routes for Users */}
      <Route path="/user-dashboard" element={<ProtectedRoute><PublicLayout><UserDashboard /></PublicLayout></ProtectedRoute>} />

      <Route path="/guide/:id" element={<PublicLayout><GuideDetails /></PublicLayout>} />

      {/* Protected Routes for Admin */}
      <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/user-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/guide-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminGuideManagement /></AdminLayout></ProtectedRoute>} />

      <Route path="*" element={<div className="p-4">404 Not Found</div>} />
    </Routes>
  );
}

export default App;

