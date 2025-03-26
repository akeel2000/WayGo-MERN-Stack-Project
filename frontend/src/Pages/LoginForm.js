// src/Pages/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Navigate based on the user's role
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
        // Optionally, if your header needs to refresh, consider a state management solution
        // rather than reloading the entire window.
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className={`bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default LoginForm;
