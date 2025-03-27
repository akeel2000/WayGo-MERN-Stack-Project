import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

function UserRentalVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  // Fetch vehicles from the backend (with images)
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

  if (error) return <p className="text-red-500">{error}</p>;
  if (vehicles.length === 0) return <p>No vehicles found.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Available Rental Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{vehicle.name}</h2>
            <p className="mb-1">
              <strong>Make:</strong> {vehicle.make}
            </p>
            <p className="mb-1">
              <strong>Model:</strong> {vehicle.model}
            </p>
            <p className="mb-1">
              <strong>Year:</strong> {vehicle.year}
            </p>
            <p className="mb-1">
              <strong>Daily Rate:</strong> {vehicle.dailyRate}
            </p>
            <p className="mb-1">
              <strong>Available:</strong> {vehicle.available ? "Yes" : "No"}
            </p>
            {vehicle.description && (
              <p className="mb-1">
                <strong>Description:</strong> {vehicle.description}
              </p>
            )}
            {vehicle.images && vehicle.images.length > 0 && (
              // Only show the first image; wrap it in a Link for navigation
              <Link to={`/rent-car/${vehicle._id}`}>
                <img
                  src={`http://localhost:5000${vehicle.images[0].url}`}
                  alt={`${vehicle.name}`}
                  className="object-cover w-full h-32 mt-2"
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRentalVehicles;
