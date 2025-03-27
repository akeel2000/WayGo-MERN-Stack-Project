// src/Pages/AdminGuideManagement.js
import React, { useState, useEffect } from "react";

function AdminGuideManagement() {
  const [guides, setGuides] = useState([]);
  const [editingGuide, setEditingGuide] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    experience: "",
    location: "",
    languages: "",
    available: true,
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/guides", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching guides: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build FormData
      const form = new FormData();
      form.append("name", formData.name);
      form.append("about", formData.about);
      form.append("experience", formData.experience);
      form.append("location", formData.location);
      form.append("languages", formData.languages);
      form.append("available", formData.available);

      // Append files
      if (selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          form.append("images", selectedImages[i]);
        }
      }

      let url = "http://localhost:5000/api/guides";
      let method = "POST";
      if (editingGuide) {
        url = `http://localhost:5000/api/guides/${editingGuide._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        credentials: "include",
        body: form, // IMPORTANT: no manual "Content-Type" header
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save guide");
      }

      // Reset form
      setFormData({
        name: "",
        about: "",
        experience: "",
        location: "",
        languages: "",
        available: true,
      });
      setSelectedImages([]);
      setEditingGuide(null);

      // Refresh list
      fetchGuides();
    } catch (err) {
      console.error(err);
      setError("Error saving guide: " + err.message);
    }
  };

  const handleEdit = (guide) => {
    setEditingGuide(guide);
    setFormData({
      name: guide.name,
      about: guide.about,
      experience: guide.experience.toString(),
      location: guide.location,
      languages: guide.languages.join(", "),
      available: guide.available,
    });
  };

  const handleDelete = async (guideId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${guideId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete guide");
      fetchGuides();
    } catch (err) {
      console.error(err);
      setError("Error deleting guide: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Guide Management (Admin)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for Creating/Updating a Guide */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Guide Name"
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="About Guide"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Experience (years)"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleInputChange}
          placeholder="Languages (comma separated)"
          className="border p-2 rounded w-full"
          required
        />
        <div className="flex items-center">
          <label className="mr-2">Available:</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleInputChange}
          />
        </div>

        {/* File input for uploading images */}
        <div>
          <label className="block mb-1 font-medium">Upload Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingGuide ? "Update Guide" : "Add Guide"}
        </button>
      </form>

      {/* Guides Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">About</th>
              <th className="border px-4 py-2">Experience</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Languages</th>
              <th className="border px-4 py-2">Available</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.length > 0 ? (
              guides.map((guide) => (
                <tr key={guide._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm">{guide._id}</td>
                  <td className="border px-4 py-2 text-sm">{guide.name}</td>
                  <td className="border px-4 py-2 text-sm">{guide.about}</td>
                  <td className="border px-4 py-2 text-sm">{guide.experience}</td>
                  <td className="border px-4 py-2 text-sm">{guide.location}</td>
                  <td className="border px-4 py-2 text-sm">
                    {guide.languages.join(", ")}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {guide.available ? "Yes" : "No"}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    <button
                      onClick={() => handleEdit(guide)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(guide._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No guides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminGuideManagement;
