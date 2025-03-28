import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-600">
        Explore Hotels
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="rounded shadow hover:shadow-lg border">
            <div className="h-48 overflow-hidden">
              {hotel.images?.length > 0 ? (
                <img
                  src={`http://localhost:5000${hotel.images[0].url}`}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-sm mt-2 text-gray-700 line-clamp-2">{hotel.description}</p>
              <p className="mt-2 text-amber-600 font-semibold">
                Rs{hotel.rentPerNight} / night
              </p>
              <Link
                to={`/hotel/${hotel._id}`}
                className="block mt-4 bg-amber-500 hover:bg-amber-600 text-white text-center py-2 px-4 rounded"
              >
                View Hotel
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelList;
