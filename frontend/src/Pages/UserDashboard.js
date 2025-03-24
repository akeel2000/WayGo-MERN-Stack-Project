// src/Pages/UserDashboard.js
import React, { useEffect, useState } from 'react';

function UserDashboard() {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      credentials: "include", // ensures cookies are sent with the request
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setProfile(data.message);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">User Dashboard</h1>
      <p>{profile}</p>
    </div>
  );
}

export default UserDashboard;
