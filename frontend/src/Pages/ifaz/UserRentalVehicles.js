import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiStar, FiCalendar, FiMapPin, FiFilter, FiChevronRight, FiX } from "react-icons/fi";

function UserRentalVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [filters, setFilters] = useState({
    vehicleType: "all",
    priceRange: [0, 500],
    sortBy: "featured"
  });

  // Base API URL - can be moved to environment variables
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Enhanced image URL processor
  const processVehicleImages = (images) => {
    if (!images || !Array.isArray(images)) return [];

    return images.map(img => {
      // Handle case where image is just a path string
      if (typeof img === 'string') {
        const cleanedPath = img.startsWith('/') ? img : `/${img}`;
        return {
          url: img.startsWith('http') ? img : `${API_BASE_URL}${cleanedPath}`,
          alt: ''
        };
      }

      // Handle case where image object might be malformed
      if (!img.url) {
        return {
          url: 'https://via.placeholder.com/600x400?text=Invalid+Image+Data',
          alt: img.alt || ''
        };
      }

      // Handle proper image object
      const cleanedPath = img.url.startsWith('/') ? img.url : `/${img.url}`;
      return {
        ...img,
        url: img.url.startsWith('http') ? img.url : `${API_BASE_URL}${cleanedPath}`,
        alt: img.alt || ''
      };
    });
  };

  // Safe image URL getter with fallback
  const getImageUrl = (vehicle) => {
    if (!vehicle?.images || vehicle.images.length === 0) {
      return 'https://via.placeholder.com/600x400?text=No+Image+Available';
    }

    // Get first image (already processed)
    const firstImage = vehicle.images[0];
    return firstImage.url || 'https://via.placeholder.com/600x400?text=Invalid+Image';
  };

  // Fetch vehicles with better error handling
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/rentalVehicles`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Received vehicle data:", data); // Debug log

      // Process vehicle images with enhanced handling
      const processedVehicles = data.map(vehicle => ({
        ...vehicle,
        images: processVehicleImages(vehicle.images)
      }));

      console.log("Processed vehicles:", processedVehicles); // Debug log
      setVehicles(processedVehicles);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load vehicles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openQuickView = (vehicle) => {
    const processedVehicle = {
      ...vehicle,
      images: processVehicleImages(vehicle.images)
    };
    setSelectedVehicle(processedVehicle);
    setMainImage(getImageUrl(processedVehicle));
    setShowQuickView(true);
  };

  if (error) return <p className="text-red-500 p-8 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 py-16 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Your Destination with WayGo</h1>

          {/* Search/Filter Component */}
          <div className="bg-white rounded-xl p-4 shadow-lg max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-amber-600" />
                <input
                  type="text"
                  placeholder="Location"
                  className="pl-10 w-full p-2 border border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 text-amber-600" />
                <input
                  type="date"
                  className="pl-10 w-full p-2 border border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FiFilter className="absolute left-3 top-3 text-amber-600" />
                <select
                  className="pl-10 w-full p-2 border border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={filters.vehicleType}
                  onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                >
                  <option value="all">All Vehicle Types</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="convertible">Convertible</option>
                </select>
              </div>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                Search Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Vehicles Carousel */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">Featured Vehicles</h2>
          <button className="text-amber-600 hover:text-amber-800 flex items-center">
            View all <FiChevronRight className="ml-1" />
          </button>
        </div>

        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {vehicles.slice(0, 5).map((vehicle) => (
            <div key={vehicle._id} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(vehicle)}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block">
                    ${vehicle.dailyRate}/day
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                  <div className="flex items-center text-amber-500">
                    <FiStar className="fill-current" />
                    <span className="ml-1 text-gray-700">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{vehicle.year} • {vehicle.type || 'Sedan'}</p>
                <button
                  onClick={() => openQuickView(vehicle)}
                  className="mt-4 w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Vehicle Grid */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-4 md:mb-0">Available Vehicles</h2>

          <div className="flex space-x-4">
            <select
              className="p-2 border border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No vehicles found matching your criteria.</p>
            <button
              onClick={() => setFilters({ vehicleType: "all", priceRange: [0, 500], sortBy: "featured" })}
              className="mt-4 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-amber-500 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(vehicle)}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm">{vehicle.description || 'Premium rental vehicle with all amenities'}</p>
                      <div className="flex mt-2">
                        <span className="text-xs bg-black/30 px-2 py-1 rounded mr-2">Automatic</span>
                        <span className="text-xs bg-black/30 px-2 py-1 rounded">4 Seats</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    ${vehicle.dailyRate}/day
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-gray-600 text-sm">{vehicle.year} • {vehicle.type || 'Sedan'}</p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <FiStar className="fill-current" />
                      <span className="ml-1 text-gray-700">4.8</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => openQuickView(vehicle)}
                      className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Quick View
                    </button>
                    <Link
                      to={`/rent-car/${vehicle._id}`}
                      className="flex-1 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-2 px-4 rounded-lg text-center transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={mainImage}
                alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                className="w-full h-64 object-cover rounded-t-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                }}
              />
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold px-4 py-2 rounded-full inline-block">
                  ${selectedVehicle.dailyRate}/day
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedVehicle.make} {selectedVehicle.model}</h2>
                  <p className="text-gray-600">{selectedVehicle.year} • {selectedVehicle.type || 'Sedan'}</p>
                </div>
                <div className="flex items-center text-amber-500">
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-gray-700">4.8 (24 reviews)</span>
                </div>
              </div>

              {/* Image Gallery Navigation */}
              {selectedVehicle.images?.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                  {selectedVehicle.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${mainImage === img.url ? 'border-amber-500' : 'border-transparent'} hover:border-amber-500`}
                      onClick={() => setMainImage(img.url)}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100x75?text=Image+Error';
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <span className="bg-amber-100 text-amber-600 rounded-full p-1 mr-2">✓</span>
                      Automatic Transmission
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="bg-amber-100 text-amber-600 rounded-full p-1 mr-2">✓</span>
                      Air Conditioning
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="bg-amber-100 text-amber-600 rounded-full p-1 mr-2">✓</span>
                      Bluetooth
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Specifications</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-600">
                      <span>Seats</span>
                      <span>4</span>
                    </li>
                    <li className="flex justify-between text-gray-600">
                      <span>Doors</span>
                      <span>4</span>
                    </li>
                    <li className="flex justify-between text-gray-600">
                      <span>Fuel</span>
                      <span>Gasoline</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-gray-700">
                {selectedVehicle.description || 'This premium rental vehicle comes with all the modern amenities you need for a comfortable ride. Perfect for city driving and weekend getaways.'}
              </p>

              <div className="mt-8 flex space-x-4">
                <button className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-3 px-4 rounded-lg transition-all duration-300">
                  Save for Later
                </button>
                <Link
                  to={`/rent-car/${selectedVehicle._id}`}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-4 rounded-lg text-center transition-all duration-300"
                  onClick={() => setShowQuickView(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRentalVehicles;
