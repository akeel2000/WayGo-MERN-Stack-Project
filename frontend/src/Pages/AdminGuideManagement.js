import React, { useState, useEffect } from "react";

function AdminGuideManagement() {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");
  const [editingGuide, setEditingGuide] = useState(null);

  // Form state for guide info
  const [formDataState, setFormDataState] = useState({
    name: "",
    about: "",
    experience: "",
    location: "",
    languages: "",
    available: true,
    rentPerDay: "", // Added rentPerDay to form state
  });

  // State for new image files to upload (up to 5)
  const [filesState, setFilesState] = useState([]);
  // State for images already saved on the server (when editing)
  const [existingImages, setExistingImages] = useState([]);

  // Fetch guides
  const fetchGuides = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/guides", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataState({
      ...formDataState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (index, file) => {
    const newFiles = [...filesState];
    newFiles[index] = file;
    setFilesState(newFiles);
  };

  const addImageInput = () => {
    if (filesState.length < 5) {
      setFilesState([...filesState, null]);
    }
  };

  const removeFileInput = (index) => {
    const newFiles = [...filesState];
    newFiles.splice(index, 1);
    setFilesState(newFiles);
  };

  // Remove an existing image from the kept images list
  const removeExistingImage = (index) => {
    const newExisting = [...existingImages];
    newExisting.splice(index, 1);
    setExistingImages(newExisting);
  };

  // Fetch full guide details (including images) when editing
  const fetchGuideDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch guide details");
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Handle editing a guide: load full details and images
  const handleEdit = async (guide) => {
    const fullGuide = await fetchGuideDetails(guide._id);
    if (!fullGuide) return;

    setEditingGuide(fullGuide);
    setFormDataState({
      name: fullGuide.name,
      about: fullGuide.about,
      experience: fullGuide.experience.toString(),
      location: fullGuide.location,
      languages: fullGuide.languages.join(", "),
      available: fullGuide.available,
      rentPerDay: fullGuide.rentPerDay ? fullGuide.rentPerDay.toString() : "", // Safely handle undefined
    });
    setExistingImages(fullGuide.images || []);
    setFilesState([]); // Reset file state on edit
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formDataState.name);
      formData.append("about", formDataState.about);
      formData.append("experience", formDataState.experience);
      formData.append("location", formDataState.location);
      formData.append("languages", formDataState.languages);
      formData.append("available", formDataState.available);
      formData.append("rentPerDay", formDataState.rentPerDay); // Add rentPerDay to formData

      // Append new image files if any
      filesState.forEach((file) => {
        if (file) formData.append("images", file);
      });

      // When editing, send the kept existing images as a JSON string
      if (editingGuide) {
        formData.append("keptImages", JSON.stringify(existingImages));
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
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save guide");
      }

      // Reset form and refresh list
      setFormDataState({
        name: "",
        about: "",
        experience: "",
        location: "",
        languages: "",
        available: true,
        rentPerDay: "", // Reset rentPerDay field
      });
      setFilesState([]);
      setExistingImages([]);
      setEditingGuide(null);
      fetchGuides();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete guide");
      }
      fetchGuides();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Guide Management (Admin)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for Add / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
        <h2 className="text-2xl font-bold">
          {editingGuide ? "Edit Guide" : "Add New Guide"}
        </h2>

        {/* Guide Info Inputs */}
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formDataState.name}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">About</label>
          <textarea
            name="about"
            value={formDataState.about}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Experience</label>
          <input
            type="number"
            name="experience"
            value={formDataState.experience}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Location</label>
          <input
            type="text"
            name="location"
            value={formDataState.location}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Languages</label>
          <input
            type="text"
            name="languages"
            value={formDataState.languages}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Available:</label>
          <input
            type="checkbox"
            name="available"
            checked={formDataState.available}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block">Rent Per Day</label>
          <input
            type="number"
            name="rentPerDay"
            value={formDataState.rentPerDay}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Existing Images (only when editing) */}
        {editingGuide && existingImages.length > 0 && (
          <div>
            <label className="block">Existing Images</label>
            <div className="grid grid-cols-2 gap-2 my-2">
              {existingImages.map((imgObj, index) => (
                <div key={index} className="relative">
                  <img
                    src={`http://localhost:5000${imgObj.url}`}
                    alt={`Existing ${index + 1}`}
                    className="object-cover w-full h-32"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Image Uploads */}
        <div>
          <label className="block">Upload New Images</label>
          {filesState.map((file, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <input
                type="file"
                onChange={(e) => handleFileChange(idx, e.target.files[0])}
                className="border p-2 rounded"
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="w-16 h-16 object-cover border"
                />
              )}
              <button
                type="button"
                onClick={() => removeFileInput(idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {filesState.length < 5 && (
            <button
              type="button"
              onClick={addImageInput}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              + Add Image
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingGuide ? "Update Guide" : "Add Guide"}
        </button>
      </form>

      {/* Guides List */}
      {guides.length === 0 ? (
        <p>No guides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <div key={guide._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{guide.name}</h2>
              <p className="mb-1"><strong>Experience:</strong> {guide.experience} years</p>
              <p className="mb-1"><strong>Location:</strong> {guide.location}</p>
              <p className="mb-1"><strong>Languages:</strong> {guide.languages.join(", ")}</p>
              <p className="mb-1"><strong>Available:</strong> {guide.available ? "Yes" : "No"}</p>
              <p className="mb-1"><strong>Rent Per Day:</strong> ${guide.rentPerDay}</p>
              <div className="grid grid-cols-2 gap-2 my-2">
                {guide.images && guide.images.length > 0 && guide.images.map((imgObj, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${imgObj.url}`}
                    alt={`Guide Image ${index + 1}`}
                    className="object-cover w-full h-32"
                  />
                ))}
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(guide)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guide._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGuideManagement;
