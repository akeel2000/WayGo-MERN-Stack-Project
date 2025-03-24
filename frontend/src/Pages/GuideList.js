// src/Pages/GuideList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Available Guides</h1>
      {error && <p className="text-red-500">{error}</p>}
      {guides.length === 0 ? (
        <p>No guides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide._id}
              to={`/guide/${guide._id}`}
              className="block border p-4 rounded hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">{guide.name}</h2>
              <p>{guide.about.substring(0, 100)}...</p>
              <p className="mt-2">
                <strong>Rating:</strong> {guide.rating.toFixed(1)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuideList;
