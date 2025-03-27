// src/Pages/GuideList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// A small helper to render a star rating with Unicode symbols.
// We'll round the rating to the nearest integer for simplicity.
function renderStars(rating) {
  const rounded = Math.round(rating);
  const maxStars = 5;
  const stars = "★".repeat(rounded) + "☆".repeat(maxStars - rounded);
  return <span className="text-yellow-400">{stars}</span>;
}

function GuideList() {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");

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
      }
    };
    fetchGuides();
  }, []);

  return (
    <div className="pt-24 p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Guides</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {guides.length === 0 ? (
        <p className="text-center">No guides found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide._id}
              to={`/guide/${guide._id}`}
              className="block bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {/* Render the first image if available */}
              {guide.images && guide.images.length > 0 && (
                <img
                  src={guide.images[0].url}
                  alt={guide.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {guide.name}
                </h2>
                <div className="ml-2 text-sm font-semibold">
                  {renderStars(guide.rating)}
                </div>
              </div>

              <p className="text-gray-600 mb-2">
                {guide.about.substring(0, 100)}...
              </p>

              <div className="text-sm text-gray-500 mt-3 space-y-1">
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {guide.location}
                </p>
                <p>
                  <span className="font-medium">Languages:</span>{" "}
                  {guide.languages.join(", ")}
                </p>
                {/* If you have an "available" field */}
                <p>
                  <span className="font-medium">Available:</span>{" "}
                  {guide.available ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Numeric Rating:</span>{" "}
                  {guide.rating.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuideList;
