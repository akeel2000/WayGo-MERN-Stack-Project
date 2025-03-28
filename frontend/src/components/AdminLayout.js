import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-amber-50">
      {/* Sidebar - Pushed to AdminSidebar component */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto transition-all duration-300">
        {/* Content Container */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {/* Modern Card-style Container with amber accents */}
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden relative">
            {/* Decorative gradient accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>

            {/* Optional Header Section */}
            <div className="border-b border-amber-100 p-6 bg-gradient-to-r from-amber-50 to-amber-50">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mr-3"></span>
                Admin Dashboard
              </h1>
              <p className="text-amber-600 mt-1">Manage your application content</p>
            </div>

            {/* Page Content */}
            <div className="p-6 bg-white">
              {children}
            </div>

            {/* Decorative bottom element */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 opacity-20"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
