// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import UserManagement from "./Pages/UserManagement";
import AdminGuideManagement from "./Pages/AdminGuideManagement";
import GuideDetails from "./Pages/GuideDetails";
import GuideList from "./Pages/GuideList";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./Pages/About";
import RentalVehicles from './Pages/ifaz/RentalVehicleManagment';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import Contact from "./Pages/Contact";
import Destination from "./Pages/Destination";
import Blog from "./Pages/Blog";
import UserRentalVehicles from "./Pages/ifaz/UserRentalVehicles";
import RentalVehicleDetails from "./Pages/ifaz/RentalVehicleDetails";
import BlogRead from "./Pages/BlogRead";
import DestinationView from "./Pages/BlogRead";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/signIn" element={<PublicLayout><SignIn /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/services/guide" element={<PublicLayout><GuideList /></PublicLayout>} />
      <Route path="/services/car-rental" element={<PublicLayout><UserRentalVehicles /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:id" element={<PublicLayout><BlogRead /></PublicLayout>} />
      <Route path="/destinations" element={<PublicLayout><Destination /></PublicLayout>} />
      <Route path="/destinations/:id" element={<PublicLayout><DestinationView /></PublicLayout>} />

      {/* Additional User Routes */}
      <Route path="/rental-vehicles" element={<PublicLayout><UserRentalVehicles /></PublicLayout>} />
      <Route path="/rent-car/:id" element={<PublicLayout><RentalVehicleDetails /></PublicLayout>} />

      {/* Protected Routes for Users */}
      <Route path="/Home" element={<ProtectedRoute><PublicLayout><Home /></PublicLayout></ProtectedRoute>} />
      <Route path="/guide/:id" element={<PublicLayout><GuideDetails /></PublicLayout>} />

      {/* Protected Routes for Admin */}
      <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/user-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/guide-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminGuideManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/rent-car-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><RentalVehicles /></AdminLayout></ProtectedRoute>} />

      <Route path="*" element={<div className="p-4">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
