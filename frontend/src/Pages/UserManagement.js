// src/Pages/UserManagement.js
import React, { useState, useEffect } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [statusCode, setStatusCode] = useState(null); // for debugging

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      // GET /api/admin/users with cookies
      const res = await fetch("http://localhost:5000/api/admin/users", {
        credentials: "include", // ensures cookie is sent for auth
      });

      // If the server returns 403 or 401, we can see the status
      setStatusCode(res.status);

      if (!res.ok) {
        // For debugging, let's read the error body
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to fetch users (status ${res.status}): ${
            errorData.error || errorData.message || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      // Show ALL users, including admin. If you only want "user" role, uncomment:
      // const regularUsers = data.users.filter((u) => u.role === "user");
      // setUsers(regularUsers);
      setUsers(data.users); // no filter => see all users
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to create or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingUser) {
        // Update existing user (PUT request)
        const updateData = { ...formData };
        // If password is empty when updating, remove it so we don't overwrite
        if (!updateData.password) {
          delete updateData.password;
        }
        res = await fetch(
          `http://localhost:5000/api/admin/users/${editingUser._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updateData),
          }
        );
      } else {
        // Create a new user (POST request)
        res = await fetch("http://localhost:5000/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to save user (status ${res.status}): ${
            errorData.error || errorData.message || "Unknown error"
          }`
        );
      }

      // Reset form and editing state
      setFormData({ name: "", email: "", password: "", role: "user" });
      setEditingUser(null);
      // Refresh user list
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Pre-fill the form for editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // leave blank unless you want to change the password
      role: user.role,
    });
  };

  // Delete a user and refresh the list
  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to delete user (status ${res.status}): ${
            errorData.error || errorData.message || "Unknown error"
          }`
        );
      }
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Debugging: show status code from last GET request */}
      {statusCode && <p className="text-gray-500">Last fetch status: {statusCode}</p>}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for creating/updating a user */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        {/* For create, password is required; when editing, password can be left blank */}
        {!editingUser && (
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border p-2 rounded w-full"
              required
            />
          </div>
        )}
        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Role</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm">{user._id}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{user.name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{user.email}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{user.role}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
