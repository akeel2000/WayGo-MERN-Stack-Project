import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function renderStars(rating) {
  const rounded = Math.round(rating);
  const maxStars = 5;
  return (
    <span className="text-amber-500">
      {"★".repeat(rounded) + "☆".repeat(maxStars - rounded)}
    </span>
  );
}

function RentVehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rentalVehicles", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch vehicles");

        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-24 p-4 max-w-6xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Explore Rental Vehicles
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse a variety of reliable vehicles available for rent across different cities.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {vehicles.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-amber-50 p-8 rounded-xl max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">No vehicles found</h3>
            <p className="text-gray-600">
              We couldn't find any available rental vehicles at this time.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Vehicle Image */}
              <div className="relative h-60 overflow-hidden">
                {vehicle.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000${vehicle.images[0].url}`}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-medium">
                    {vehicle.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="bg-white p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {vehicle.make} {vehicle.model}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-amber-600 font-bold mr-1">
                      {vehicle.rating?.toFixed(1) || "4.5"}
                    </span>
                    {renderStars(vehicle.rating || 4.5)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {vehicle.description || "A well-maintained vehicle ready for your trip!"}
                </p>

                <div className="text-sm text-gray-600 mt-2">
                  <strong>Rent per Day: </strong>
                  <span className="font-semibold text-amber-600">Rs {vehicle.dailyRate}</span>
                </div>

                <Link
                  to={`/rent-car/${vehicle._id}`}
                  className="mt-6 inline-flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  View Vehicle
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RentVehicleList;
