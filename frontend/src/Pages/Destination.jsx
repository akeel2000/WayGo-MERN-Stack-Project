import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Destination = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Destination data array
  const destinations = [
    {
      id: 1,
      name: 'Sigiriya Rock Fortress',
      description: 'Ancient rock fortress with stunning frescoes and panoramic views',
      location: 'Matale, Sri Lanka',
      rating: 4.5,
      amenities: ['Free WiFi', 'Restaurant', 'Pool', '+2 more'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
    },
    {
      id: 2,
      name: 'Mirissa Beach',
      description: 'Golden sandy beaches perfect for whale watching and surfing',
      location: 'Mirissa, Sri Lanka',
      rating: 4.7,
      amenities: ['Free WiFi', 'Restaurant', 'Beach Access', '+3 more'],
      image: 'https://images.unsplash.com/photo-1562613521-87f9a8b0e532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      name: 'Nuwara Eliya',
      description: 'Misty tea plantations in the heart of Sri Lankan highlands',
      location: 'Nuwara Eliya, Sri Lanka',
      rating: 4.3,
      amenities: ['Free WiFi', 'Restaurant', 'Mountain View', '+1 more'],
      image: 'https://images.unsplash.com/photo-1599391409945-6e7a4e72dc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 4,
      name: 'Yala National Park',
      description: 'A wildlife sanctuary with leopards, elephants, and diverse ecosystems',
      location: 'Yala, Sri Lanka',
      rating: 4.8,
      amenities: ['Safari Tours', 'Wildlife Spotting', 'Guided Tours', '+2 more'],
      image: 'https://images.unsplash.com/photo-1581668180100-8c7688e224e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle quick view navigation
  const handleQuickView = (destinationId) => {
    navigate(`/destinations/${destinationId}`);
  };

  return (
    <div className="pt-24 min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Explore Sri Lanka
          </h1>
          <p className="text-md text-amber-600 max-w-2xl mx-auto">
            Discover breathtaking destinations
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Search hotels by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          {filteredDestinations.length} properties found
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col"
            >
              {/* Destination Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                  <FaStar className="text-yellow-300 mr-1" />
                  {destination.rating}
                </div>
              </div>

              {/* Destination Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-2">
                  {destination.name}
                </h3>

                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <FaMapMarkerAlt className="mr-1 text-amber-500" />
                  <span className="line-clamp-1">{destination.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-1.5 text-gray-500 text-xs mb-4">
                  {destination.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => handleQuickView(destination.id)}
                  className="mt-auto text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors w-full"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destination;
