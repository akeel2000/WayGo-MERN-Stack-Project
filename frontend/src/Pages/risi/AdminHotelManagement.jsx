import React, { useState, useEffect } from "react";

function AdminHotelManagement() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [editingHotel, setEditingHotel] = useState(null);

  const [formDataState, setFormDataState] = useState({
    name: "",
    description: "",
    location: "",
    availableRooms: "",
    rentPerNight: "",
    facilities: "",
  });

  const [filesState, setFilesState] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hotels", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const removeExistingImage = (index) => {
    const newExisting = [...existingImages];
    newExisting.splice(index, 1);
    setExistingImages(newExisting);
  };

  const fetchHotelDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch hotel details");
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
      return null;
    }
  };

  const handleEdit = async (hotel) => {
    const fullHotel = await fetchHotelDetails(hotel._id);
    if (!fullHotel) return;

    setEditingHotel(fullHotel);
    setFormDataState({
      name: fullHotel.name,
      description: fullHotel.description,
      location: fullHotel.location,
      availableRooms: fullHotel.availableRooms.toString(),
      rentPerNight: fullHotel.rentPerNight.toString(),
      facilities: fullHotel.facilities.join(", "),
    });
    setExistingImages(fullHotel.images || []);
    setFilesState([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    const { name, location, rentPerNight } = formDataState;
    if (
      !name.trim() ||
      !location.trim() ||
      !rentPerNight.trim() ||
      isNaN(Number(rentPerNight)) ||
      Number(rentPerNight) <= 0
    ) {
      setError("Name, location, and price are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(formDataState).forEach(([key, value]) =>
        formData.append(key, value)
      );

      filesState.forEach((file) => {
        if (file) formData.append("images", file);
      });

      if (editingHotel) {
        formData.append("keptImages", JSON.stringify(existingImages));
      }

      let url = "http://localhost:5000/api/hotels";
      let method = "POST";

      if (editingHotel) {
        url = `http://localhost:5000/api/hotels/${editingHotel._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save hotel");
      }

      // ✅ Reset after success
      setFormDataState({
        name: "",
        description: "",
        location: "",
        availableRooms: "",
        rentPerNight: "",
        facilities: "",
      });
      setFilesState([]);
      setExistingImages([]);
      setEditingHotel(null);
      setError(""); // clear error
      fetchHotels();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete hotel");
      }
      fetchHotels();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Hotel Management (Admin)</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form for Add / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
        <h2 className="text-2xl font-bold">{editingHotel ? "Edit Hotel" : "Add New Hotel"}</h2>

        <input name="name" placeholder="Hotel Name" value={formDataState.name} onChange={handleInputChange} required className="border p-2 rounded w-full" />
        <textarea name="description" placeholder="Description" value={formDataState.description} onChange={handleInputChange} required className="border p-2 rounded w-full" />
        <input name="location" placeholder="Location" value={formDataState.location} onChange={handleInputChange} required className="border p-2 rounded w-full" />
        <input name="availableRooms" placeholder="Available Rooms" type="number" value={formDataState.availableRooms} onChange={handleInputChange} required className="border p-2 rounded w-full" />
        <input name="rentPerNight" placeholder="Rent Per Night" type="number" value={formDataState.rentPerNight} onChange={handleInputChange} required className="border p-2 rounded w-full" />
        <input name="facilities" placeholder="Facilities (comma separated)" value={formDataState.facilities} onChange={handleInputChange} className="border p-2 rounded w-full" />

        {editingHotel && existingImages.length > 0 && (
          <div>
            <label>Existing Images</label>
            <div className="grid grid-cols-2 gap-2 my-2">
              {existingImages.map((imgObj, index) => (
                <div key={index} className="relative">
                  <img src={`http://localhost:5000${imgObj.url}`} alt={`Existing ${index + 1}`} className="object-cover w-full h-32" />
                  <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-0 right-0 bg-red-500 text-white px-1">X</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        <div>
          <label>Upload New Images</label>
          {filesState.map((file, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <input type="file" onChange={(e) => handleFileChange(idx, e.target.files[0])} className="border p-2 rounded" />
              {file && <img src={URL.createObjectURL(file)} alt={`Preview ${idx + 1}`} className="w-16 h-16 object-cover border" />}
              <button type="button" onClick={() => removeFileInput(idx)} className="text-red-500">Remove</button>
            </div>
          ))}
          {filesState.length < 5 && (
            <button type="button" onClick={addImageInput} className="bg-green-500 text-white px-2 py-1 rounded">
              + Add Image
            </button>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingHotel ? "Update Hotel" : "Add Hotel"}
        </button>
      </form>

      {/* Hotel List */}
      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
              <p><strong>Rent/Night:</strong> ${hotel.rentPerNight}</p>
              <p><strong>Facilities:</strong> {hotel.facilities?.join(", ")}</p>
              <div className="grid grid-cols-2 gap-2 my-2">
                {hotel.images && hotel.images.map((imgObj, index) => (
                  <img key={index} src={`http://localhost:5000${imgObj.url}`} alt={`Hotel Image ${index + 1}`} className="object-cover w-full h-32" />
                ))}
              </div>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleEdit(hotel)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(hotel._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminHotelManagement;
