// src/Pages/ifaz/RentalVehicleDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RentalVehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch vehicle details");
        }
        const data = await res.json();
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
      <p className="mb-1"><strong>Make:</strong> {vehicle.make}</p>
      <p className="mb-1"><strong>Model:</strong> {vehicle.model}</p>
      <p className="mb-1"><strong>Year:</strong> {vehicle.year}</p>
      <p className="mb-1"><strong>Daily Rate:</strong> {vehicle.dailyRate}</p>
      <p className="mb-1"><strong>Available:</strong> {vehicle.available ? "Yes" : "No"}</p>
      {vehicle.description && (
        <p className="mb-1"><strong>Description:</strong> {vehicle.description}</p>
      )}
      {vehicle.images && vehicle.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 my-4">
          {vehicle.images.map((imgObj, index) => (
            <img
              key={index}
              src={`http://localhost:5000${imgObj.url}`}
              alt={`${vehicle.name} ${index + 1}`}
              className="object-cover w-full h-64"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RentalVehicleDetails;
