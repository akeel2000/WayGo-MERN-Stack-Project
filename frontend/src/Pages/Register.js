import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const lettersOnly = value.replace(/[^A-Za-z]/g, "");
      if (lettersOnly.length <= 20) {
        setFormData({ ...formData, [name]: lettersOnly });
      }
    } else if (name === "email") {
      const [localPart, domainPart] = value.split("@");
      if (!domainPart && localPart.length <= 20) {
        setFormData({ ...formData, [name]: value });
      } else if (domainPart && localPart.length <= 20) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]{1,20}$/;
    const emailRegex = /^[A-Za-z]{1,20}[0-9]*@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must be only letters and max 20 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must start with letters (max 20 before '@')";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Min 8 characters with letters, numbers & special char";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      alert("Password mismatch!");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          }),
        });
        const data = await response.json();

        if (response.ok) {
          alert("Registration successful!");
          navigate("/?showLoginModal=true");
        } else {
          alert(data.error || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4 pt-24 md:pt-16">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden relative z-10 mt-16 md:mt-0">
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-72 md:h-auto relative">
          <img
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&auto=format&fit=crop&q=80&fit=crop&h=600"
            alt="Travel adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-amber-300">Way</span>Go
              </h1>
              <p className="text-amber-100 mt-1">Begin your journey with us</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600">Join our community of travelers</p>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.name ? "border-amber-600" : "border-gray-300"
                  } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-amber-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? "border-amber-600" : "border-gray-300"
                  } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="example@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-amber-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.password ? "border-amber-600" : "border-gray-300"
                  } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-amber-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.confirmPassword ? "border-amber-600" : "border-gray-300"
                  } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-amber-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="font-medium text-amber-600 hover:text-amber-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
