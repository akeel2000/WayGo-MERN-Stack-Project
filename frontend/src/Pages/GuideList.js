import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function renderStars(rating) {
  const rounded = Math.round(rating);
  const maxStars = 5;
  const stars = "★".repeat(rounded) + "☆".repeat(maxStars - rounded);
  return <span className="text-amber-500">{stars}</span>;
}

function GuideList() {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/guides", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch guides");
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuides();
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
          Discover Local Guides
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with experienced guides who will show you the hidden gems of their cities
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {guides.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-amber-50 p-8 rounded-xl max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-amber-800 mb-2">No guides found</h3>
            <p className="text-gray-600">We couldn't find any available guides at this time.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-60 overflow-hidden">
                {guide.images && guide.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000${guide.images[0].url}`}
                    alt={guide.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-medium">
                    {guide.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="bg-white p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {guide.name}
                  </h2>
                  <div className="flex items-center">
                    <span className="text-amber-600 font-bold mr-1">
                      {guide.rating.toFixed(1)}
                    </span>
                    {renderStars(guide.rating)}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {guide.about}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{guide.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                </div>

                <Link
                  to={`/guide/${guide._id}`}
                  className="mt-6 inline-flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  View Profile
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

export default GuideList;
