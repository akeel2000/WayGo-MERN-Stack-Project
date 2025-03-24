import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const [authStatus, setAuthStatus] = useState({ checked: false, allowed: false });

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        // data => { role, userId, etc. }
        if (requiredRole && data.role !== requiredRole) {
          setAuthStatus({ checked: true, allowed: false });
        } else {
          setAuthStatus({ checked: true, allowed: true });
        }
      })
      .catch(() => {
        // If not logged in, 401, or any error
        setAuthStatus({ checked: true, allowed: false });
      });
  }, [requiredRole]);

  // While we haven't finished checking, show a loading indicator
  if (!authStatus.checked) {
    return <div>Loading...</div>;
  }

  // If not allowed, redirect to /login
  if (!authStatus.allowed) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render children
  return children;
}

export default ProtectedRoute;
