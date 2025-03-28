import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShareAlt, FaBookmark, FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";

const DestinationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);

  const destinations = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      tagline: "The Ancient Lion Rock of Sri Lanka",
      shortDesc: "A UNESCO World Heritage site with breathtaking views",
      description: "Sigiriya is an ancient rock fortress and palace ruin located in central Sri Lanka, surrounded by the remains of an extensive network of gardens, reservoirs, and other structures.",
      content: {
        overview: [
          "Rising 200 meters above the surrounding plain, Sigiriya is one of Asia's most dramatic historical sites.",
          "Built by King Kasyapa in the 5th century, this 'Lion Rock' is a masterpiece of ancient urban planning.",
          "The site combines natural beauty with imaginative architecture and artistic expression."
        ],
        experience: [
          "Climb the 1,200 steps to the summit for panoramic views",
          "See the famous Sigiriya frescoes (the 'Heavenly Maidens')",
          "Walk through the ancient water gardens at the base",
          "Explore the mirror wall with ancient graffiti"
        ],
        history: [
          "Constructed during the reign of King Kasyapa (477–495 CE)",
          "Served as both a palace and fortress",
          "Abandoned after the king's death, later used as a Buddhist monastery",
          "Rediscovered by British archaeologists in the 19th century"
        ]
      },
      location: "Matale District, Sri Lanka",
      rating: 4.8,
      reviewCount: 1243,
      price: 25,
      duration: "Half day",
      bestTime: "Early morning (6-9am)",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1596629454698-9d5c1a1b5b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1596629454698-9d5c1a1b5b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1596629454698-9d5c1a1b5b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      tips: [
        "Arrive before 7am to avoid crowds and heat",
        "Wear comfortable walking shoes",
        "Bring water and sun protection",
        "Consider hiring a guide (available at entrance)"
      ],
      tags: ["UNESCO", "Historical", "Hiking", "Photography"]
    },
    // Other destinations...
  ];

  const destination = destinations.find(dest => dest.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or may have been moved.</p>
          <button
            onClick={() => navigate('/destinations')}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Browse Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <IoIosArrowBack className="text-gray-800 text-xl" />
        </button>

        {/* Save Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-6 right-6 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <FaBookmark className={isSaved ? "text-amber-500" : "text-gray-600"} />
        </button>

        {/* Title Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-2">
              <div className="flex items-center bg-white/90 px-3 py-1 rounded-full">
                <FaStar className="text-amber-500 mr-1" />
                <span className="font-medium">{destination.rating}</span>
                <span className="mx-1">•</span>
                <span>{destination.reviewCount} reviews</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{destination.name}</h1>
            <p className="text-white/90">{destination.tagline}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Location & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center text-gray-600 mb-4 md:mb-0">
            <FaMapMarkerAlt className="mr-2 text-amber-500" />
            <span>{destination.location}</span>
          </div>
          <div className="bg-amber-50 px-4 py-2 rounded-full">
            <span className="font-bold text-amber-700">Entry: ${destination.price}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium ${activeTab === "overview" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 font-medium ${activeTab === "experience" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 font-medium ${activeTab === "history" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-10">
          {activeTab === "overview" && (
            <div className="space-y-4 text-gray-700">
              {destination.content.overview.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <ul className="space-y-4">
              {destination.content.experience.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {destination.content.history.map((item, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-3">
              <FiClock className="text-amber-500 mr-2 text-lg" />
              <h3 className="font-semibold text-gray-800">Duration</h3>
            </div>
            <p className="text-gray-600">{destination.duration}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-3">
              <FiCalendar className="text-amber-500 mr-2 text-lg" />
              <h3 className="font-semibold text-gray-800">Best Time to Visit</h3>
            </div>
            <p className="text-gray-600">{destination.bestTime}</p>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.tips.map((tip, index) => (
              <div key={index} className="flex items-start bg-amber-50/50 p-4 rounded-lg">
                <span className="flex-shrink-0 text-amber-500 mr-3">•</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Gallery</h2>
          <div className="grid grid-cols-3 gap-3">
            {destination.gallery.slice(0, 3).map((img, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`${destination.name} view ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Related Destinations */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {destinations
              .filter(dest => dest.id !== destination.id)
              .slice(0, 2)
              .map(related => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/destinations/${related.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {related.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{related.location}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationView;
