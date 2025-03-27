import React, { useState, useEffect } from "react";

function RentalVehiclesAdmin() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Form state for vehicle info
  const [formDataState, setFormDataState] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    dailyRate: "",
    available: true,
    description: "",
  });

  // State for new image files to upload (up to 5)
  const [filesState, setFilesState] = useState([]);
  // State for images already saved on the server (when editing)
  const [existingImages, setExistingImages] = useState([]);

  // Fetch vehicles
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rentalVehicles", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
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

  // Fetch full vehicle details (including images) when editing
  const fetchVehicleDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch vehicle details");
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Handle editing a vehicle: load full details and images
  const handleEdit = async (vehicle) => {
    const fullVehicle = await fetchVehicleDetails(vehicle._id);
    if (!fullVehicle) return;
    setEditingVehicle(fullVehicle);
    setFormDataState({
      name: fullVehicle.name,
      make: fullVehicle.make,
      model: fullVehicle.model,
      year: fullVehicle.year,
      dailyRate: fullVehicle.dailyRate,
      available: fullVehicle.available,
      description: fullVehicle.description || "",
    });
    setExistingImages(fullVehicle.images || []);
    setFilesState([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formDataState.name);
      formData.append("make", formDataState.make);
      formData.append("model", formDataState.model);
      formData.append("year", formDataState.year);
      formData.append("dailyRate", formDataState.dailyRate);
      formData.append("available", formDataState.available);
      formData.append("description", formDataState.description);

      // Append new image files if any
      filesState.forEach((file) => {
        if (file) formData.append("images", file);
      });

      // When editing, send the kept existing images as a JSON string
      if (editingVehicle) {
        formData.append("keptImages", JSON.stringify(existingImages));
      }

      let url = "http://localhost:5000/api/rentalVehicles";
      let method = "POST";
      if (editingVehicle) {
        url = `http://localhost:5000/api/rentalVehicles/${editingVehicle._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save vehicle");
      }

      // Reset form and refresh list
      setFormDataState({
        name: "",
        make: "",
        model: "",
        year: "",
        dailyRate: "",
        available: true,
        description: "",
      });
      setFilesState([]);
      setExistingImages([]);
      setEditingVehicle(null);
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete vehicle");
      }
      fetchVehicles();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Rental Vehicles (Admin)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for Add / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
        <h2 className="text-2xl font-bold">
          {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
        </h2>

        {/* Vehicle Info Inputs */}
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
          <label className="block">Make</label>
          <input
            type="text"
            name="make"
            value={formDataState.make}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Model</label>
          <input
            type="text"
            name="model"
            value={formDataState.model}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Year</label>
          <input
            type="number"
            name="year"
            value={formDataState.year}
            onChange={handleInputChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Daily Rate</label>
          <input
            type="number"
            name="dailyRate"
            value={formDataState.dailyRate}
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
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formDataState.description}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Existing Images (only when editing) */}
        {editingVehicle && existingImages.length > 0 && (
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
          {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      {/* Vehicles List */}
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{vehicle.name}</h2>
              <p className="mb-1"><strong>Make:</strong> {vehicle.make}</p>
              <p className="mb-1"><strong>Model:</strong> {vehicle.model}</p>
              <p className="mb-1"><strong>Year:</strong> {vehicle.year}</p>
              <p className="mb-1"><strong>Daily Rate:</strong> {vehicle.dailyRate}</p>
              <p className="mb-1"><strong>Available:</strong> {vehicle.available ? "Yes" : "No"}</p>
              {vehicle.description && (
                <p className="mb-1"><strong>Description:</strong> {vehicle.description}</p>
              )}
              {vehicle.images && vehicle.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 my-2">
                  {vehicle.images.map((imgObj, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${imgObj.url}`}
                      alt={`${vehicle.name} ${index + 1}`}
                      className="object-cover w-full h-32"
                    />
                  ))}
                </div>
              )}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
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

export default RentalVehiclesAdmin;
