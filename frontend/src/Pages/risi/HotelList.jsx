import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    rating: "",
    amenities: []
  });

  // Available amenities for filtering
  const availableAmenities = [
    "WiFi",
    "Pool",
    "Spa",
    "Gym",
    "Restaurant",
    "Parking"
  ];

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const results = hotels.filter(hotel => {
      // Search filter
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      let matchesPrice = true;
      if (filters.priceRange === "under-5000") {
        matchesPrice = hotel.rentPerNight < 5000;
      } else if (filters.priceRange === "5000-10000") {
        matchesPrice = hotel.rentPerNight >= 5000 && hotel.rentPerNight <= 10000;
      } else if (filters.priceRange === "over-10000") {
        matchesPrice = hotel.rentPerNight > 10000;
      }

      // Rating filter
      let matchesRating = true;
      if (filters.rating) {
        matchesRating = Math.floor(hotel.rating) >= parseInt(filters.rating);
      }

      // Amenities filter
      let matchesAmenities = true;
      if (filters.amenities.length > 0) {
        matchesAmenities = filters.amenities.every(amenity =>
          hotel.amenities?.includes(amenity)
        );
      }

      return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
    });

    setFilteredHotels(results);
  }, [searchTerm, filters, hotels]);

  const handleAmenityChange = (amenity) => {
    setFilters(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return (
      <span className="text-amber-400">
        {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
      </span>
    );
  };

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Discover Your Perfect Stay
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Browse our curated collection of premium hotels
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
            >
              <option value="">All Prices</option>
              <option value="under-5000">Under Rs 5000</option>
              <option value="5000-10000">Rs 5000 - 10000</option>
              <option value="over-10000">Over Rs 10000</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {availableAmenities.map(amenity => (
              <button
                key={amenity}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.amenities.includes(amenity)
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => handleAmenityChange(amenity)}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Hotels Grid */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-sm max-w-md mx-auto border border-amber-100">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No hotels found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-100"
            >
              {/* Hotel Image */}
              <div className="relative h-64 overflow-hidden">
                {hotel.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000${hotel.images[0].url}`}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xl font-bold text-white">
                    Rs {hotel.rentPerNight}
                    <span className="text-sm font-normal"> / night</span>
                  </span>
                </div>
              </div>

              {/* Hotel Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                      {hotel.name}
                    </h2>
                    <p className="text-gray-600">{hotel.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold mr-1">
                      {hotel.rating?.toFixed(1) || "4.5"}
                    </span>
                    {renderStars(hotel.rating || 4.5)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {hotel.description || "A comfortable stay with excellent amenities."}
                </p>

                {/* Amenities */}
                {hotel.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        +{hotel.amenities.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <Link
                  to={`/hotel/${hotel._id}`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
                >
                  View Hotel
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

export default HotelList;
