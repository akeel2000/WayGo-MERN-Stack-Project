// src/Pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';


function AdminDashboard() {
  const [secret, setSecret] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/secret-stats', {
      credentials: "include", // ensures cookies are sent with the request
    })
      .then(res => res.json())
      .then(data => setSecret(data.secret || "No secret data found"))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex">
      
      

      {/* Main content area */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p>Secret Admin Data: {secret}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;

