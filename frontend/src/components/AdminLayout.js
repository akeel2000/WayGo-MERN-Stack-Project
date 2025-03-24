// src/components/AdminLayout.js
import React from "react";
import AdminSidebar from "./AdminSidebar"; // Make sure this file exists

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}

export default AdminLayout;
