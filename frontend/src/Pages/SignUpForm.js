// src/Pages/SignUpForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        // Instead of navigating to /login, navigate to home with query parameter
        // This will trigger the Header to open the AuthModal on the "login" tab.
        navigate("/?showLoginModal=true");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="Name"
        className="px-4 py-2 border border-gray-300 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
        className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;

