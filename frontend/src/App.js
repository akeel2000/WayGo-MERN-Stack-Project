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
import DestinationView from "./Pages/Destinationview";

import CartPage from "./Pages/shajeeh/CartPage";
import SuccessPage from "./Pages/shajeeh/SuccessPage";

import AdminBookings from './Pages/shajeeh/AdminBookings';
import AdminHotelManagement from "./Pages/risi/AdminHotelManagement";


import HotelList from "./Pages/risi/HotelList";
import HotelDetails from "./Pages/risi/HotelDetails";

import CardEntry from "./Pages/shajeeh/CardEntry"; 


import AdminCardManagement from './Pages/shajeeh/AdminCardManagement';

import UserCards from './Pages/shajeeh/UserCards'; 

import WeatherSearch from "./Pages/WeatherSearch"; // ✅ Add this




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
      <Route path="/destination/:id" element={<PublicLayout><DestinationView /></PublicLayout>} />
      <Route path="/tour-packages" element={<PublicLayout><Destination /></PublicLayout>} />
      <Route path="/hotel-booking" element={<PublicLayout><HotelList /></PublicLayout>} />
      <Route path="/services/guide" element={<PublicLayout><GuideDetails /></PublicLayout>} />
      <Route path="/services/car-rental" element={<PublicLayout><RentalVehicles /></PublicLayout>} />
      <Route path="/services/hotel-booking" element={<PublicLayout><HotelList /></PublicLayout>} />
      <Route path="/hotel/:id" element={<PublicLayout><HotelDetails /></PublicLayout>} />
      <Route path="/card-entry" element={<PublicLayout><CardEntry /></PublicLayout>} />
      <Route path="/weather" element={<PublicLayout><WeatherSearch /></PublicLayout>} />



<Route path="/user-cards" element={<PublicLayout><UserCards /></PublicLayout>} />



      {/* Additional User Routes */}
      <Route path="/rental-vehicles" element={<PublicLayout><UserRentalVehicles /></PublicLayout>} />
      <Route path="/rent-car/:id" element={<PublicLayout><RentalVehicleDetails /></PublicLayout>} />



      <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
      <Route path="/success" element={<PublicLayout><SuccessPage /></PublicLayout>} />




      <Route
  path="/admin/card-management"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminLayout><AdminCardManagement /></AdminLayout>
    </ProtectedRoute>
  }
/>










      {/* Protected Routes for Users */}
      <Route path="/Home" element={<ProtectedRoute><PublicLayout><Home /></PublicLayout></ProtectedRoute>} />
      <Route path="/guide/:id" element={<PublicLayout><GuideDetails /></PublicLayout>} />

      {/* Protected Routes for Admin */}
      <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/user-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/guide-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminGuideManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/rent-car-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><RentalVehicles /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/view-bookings" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/hotel-booking-management" element={<ProtectedRoute requiredRole="admin"><AdminLayout><AdminHotelManagement /></AdminLayout></ProtectedRoute>} />


      <Route path="*" element={<div className="p-4">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
