import React, { useState, useEffect } from "react";

function AdminHotelManagement() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [editingHotel, setEditingHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formDataState, setFormDataState] = useState({
    name: "",
    description: "",
    location: "",
    availableRooms: "",
    rentPerNight: "",
    facilities: "",
  });

  // File upload state
  const [filesState, setFilesState] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch hotels
  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/hotels", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({
      ...formDataState,
      [name]: value,
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

  const removeExistingImage = (index) => {
    const newExisting = [...existingImages];
    newExisting.splice(index, 1);
    setExistingImages(newExisting);
  };

  // Fetch hotel details
  const fetchHotelDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch hotel details");
      return await res.json();
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Handle editing a hotel
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
      facilities: fullHotel.facilities?.join(", ") || "",
    });
    setExistingImages(fullHotel.images || []);
    setFilesState([]);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", formDataState.name);
      formData.append("description", formDataState.description);
      formData.append("location", formDataState.location);
      formData.append("availableRooms", formDataState.availableRooms);
      formData.append("rentPerNight", formDataState.rentPerNight);
      formData.append("facilities", formDataState.facilities);

      filesState.forEach((file) => {
        if (file) formData.append("images", file);
      });

      if (editingHotel) {
        formData.append("keptImages", JSON.stringify(existingImages));
      }

      const url = editingHotel
        ? `http://localhost:5000/api/hotels/${editingHotel._id}`
        : "http://localhost:5000/api/hotels";
      const method = editingHotel ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save hotel");
      }

      // Reset form
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
      setIsModalOpen(false);
      await fetchHotels();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete hotel");
      }
      await fetchHotels();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingHotel(null);
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHotel(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hotel Management</h1>
          <p className="text-gray-600 mt-1">Manage your hotel inventory</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Hotel
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error:</span> {error}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center text-blue-700">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      )}

      {/* Hotels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">Rooms</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <p className="text-lg font-medium">No hotels found</p>
                      <p className="mt-1">Add a new hotel to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {hotel.images?.[0] && (
                          <div className="flex-shrink-0 h-16 w-16 mr-3">
                            <img
                              className="h-16 w-16 rounded-lg object-cover border-2 border-white shadow-sm"
                              src={`http://localhost:5000${hotel.images[0].url}`}
                              alt={hotel.name}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{hotel.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{hotel.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <p><span className="font-medium">Location:</span> {hotel.location}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hotel.facilities?.slice(0, 3).map((facility, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {facility}
                            </span>
                          ))}
                          {hotel.facilities?.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{hotel.facilities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${hotel.rentPerNight}/night</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{hotel.availableRooms} available</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(hotel)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hotel._id)}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hotel Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingHotel ? "Edit Hotel" : "Add New Hotel"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formDataState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={formDataState.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Available Rooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Rooms*</label>
                    <input
                      type="number"
                      name="availableRooms"
                      value={formDataState.availableRooms}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Rent Per Night */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price/Night ($)*</label>
                    <input
                      type="number"
                      name="rentPerNight"
                      value={formDataState.rentPerNight}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formDataState.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Facilities */}
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
  <select
    name="facilities"
    value={formDataState.facilities}
    onChange={handleInputChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    <option value="" disabled>Select a facility</option>
    <option value="WiFi">WiFi</option>
    <option value="Pool">Pool</option>
    <option value="Gym">Gym</option>
    <option value="Restaurant">Restaurant</option>
    <option value="Spa">Spa</option>
    <option value="Parking">Parking</option>
    <option value="Bar">Bar</option>
    <option value="Conference Room">Conference Room</option>
  </select>
</div>
                {/* Existing Images */}
                {editingHotel && existingImages.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {existingImages.map((imgObj, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`http://localhost:5000${imgObj.url}`}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images</label>
                  <div className="space-y-4">
                    {filesState.map((file, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(idx, e.target.files[0])}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                        {file && (
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeFileInput(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {filesState.length < 5 && (
                      <button
                        type="button"
                        onClick={addImageInput}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Another Image
                      </button>
                    )}
                  </div>
                </div>

                {/* Form actions */}
                <div className="pt-6 flex justify-end space-x-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors flex items-centerpx-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {editingHotel ? "Update Hotel" : "Add Hotel"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHotelManagement;
