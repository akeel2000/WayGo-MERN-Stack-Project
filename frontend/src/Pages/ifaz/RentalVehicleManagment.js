import React, { useState, useEffect } from "react";

function RentalVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        make: "",
        model: "",
        year: "",
        dailyRate: "",
        available: true,
        description: "",
        image: "",
    });
    const [editingVehicle, setEditingVehicle] = useState(null);

    // Fetch vehicles from backend
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
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (editingVehicle) {
                // Update existing vehicle
                res = await fetch(
                    `http://localhost:5000/api/rentalVehicles/${editingVehicle._id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(formData),
                    }
                );
            } else {
                // Create a new vehicle
                res = await fetch("http://localhost:5000/api/rentalVehicles", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(formData),
                });
            }
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to save vehicle");
            }
            // Reset form
            setFormData({
                name: "",
                make: "",
                model: "",
                year: "",
                dailyRate: "",
                available: true,
                description: "",
                image: "",
            });
            setEditingVehicle(null);
            fetchVehicles();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setFormData({
            name: vehicle.name,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            dailyRate: vehicle.dailyRate,
            available: vehicle.available,
            description: vehicle.description,
            image: vehicle.image,
        });
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to delete vehicle");
            }
            fetchVehicles();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Rental Vehicles</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Form for Adding/Editing a Vehicle */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 border p-4 rounded">
                <h2 className="text-2xl font-bold">
                    {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                </h2>
                <div>
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        value={formData.make}
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
                        value={formData.model}
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
                        value={formData.year}
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
                        value={formData.dailyRate}
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
                        checked={formData.available}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="block">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </button>
            </form>

            {/* List of Rental Vehicles */}
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
                            {vehicle.image && (
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    className="w-full h-48 object-cover mb-2"
                                />
                            )}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(vehicle)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
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

export default RentalVehicles;