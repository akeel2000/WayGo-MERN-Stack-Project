import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function renderStars(rating) {
  const rounded = Math.round(rating);
  const maxStars = 5;
  return (
    <span className="text-amber-400">
      {"★".repeat(rounded) + "☆".repeat(maxStars - rounded)}
    </span>
  );
}

function RentVehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    priceRange: "",
    transmission: "",
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rentalVehicles", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch vehicles");

        const data = await res.json();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    let results = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.type || vehicle.type === filters.type;
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;

      let matchesPrice = true;
      if (filters.priceRange === "under-2000") {
        matchesPrice = vehicle.dailyRate < 2000;
      } else if (filters.priceRange === "2000-5000") {
        matchesPrice = vehicle.dailyRate >= 2000 && vehicle.dailyRate <= 5000;
      } else if (filters.priceRange === "over-5000") {
        matchesPrice = vehicle.dailyRate > 5000;
      }

      return matchesSearch && matchesType && matchesPrice && matchesTransmission;
    });

    setFilteredVehicles(results);
  }, [searchTerm, filters, vehicles]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Discover Your Perfect Ride
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Premium vehicles curated for your comfort and adventure
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          {/* Search Bar */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search vehicles
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 pr-12 py-3 border-gray-300 rounded-md"
                placeholder="Search by make, model or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-md"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select
              id="priceRange"
              name="priceRange"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-md"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="under-2000">Under Rs 2000</option>
              <option value="2000-5000">Rs 2000 - 5000</option>
              <option value="over-5000">Over Rs 5000</option>
            </select>
          </div>

          {/* Transmission Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-md"
              value={filters.transmission}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 p-6 mb-8 rounded-xl shadow-sm">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-sm max-w-md mx-auto border border-amber-100">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-100"
            >
              {/* Vehicle Image */}
              <div className="relative h-64 overflow-hidden">
                {vehicle.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000${vehicle.images[0].url}`}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${vehicle.available ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                    {vehicle.available ? "Available now" : "Unavailable"}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Rs {vehicle.dailyRate}
                    <span className="text-sm font-normal text-white"> /day</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors">
                      {vehicle.make} {vehicle.model}
                    </h2>
                    <p className="text-sm text-gray-500">{vehicle.type || "Standard Vehicle"}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="text-gray-800 font-bold mr-1">
                        {vehicle.rating?.toFixed(1) || "4.5"}
                      </span>
                      {renderStars(vehicle.rating || 4.5)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{vehicle.reviews?.length || 0} reviews</span>
                  </div>
                </div>

                <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {vehicle.description || "Experience premium comfort and performance with this well-maintained vehicle."}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {vehicle.seats || 4} seats
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {vehicle.transmission || "Automatic"}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {vehicle.fuelType || "Petrol"}
                  </span>
                </div>

                <Link
                  to={`/rent-car/${vehicle._id}`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
                >
                  View details
                  <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
