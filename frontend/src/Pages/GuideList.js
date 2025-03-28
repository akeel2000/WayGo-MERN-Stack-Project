import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function renderStars(rating, className = "") {
  const rounded = Math.round(rating);
  return (
    <span className={`text-amber-400 ${className}`}>
      {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
    </span>
  );
}

function GuideList() {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    language: "",
    priceRange: ""
  });

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/guides", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch guides");
        const data = await res.json();
        setGuides(data);
        setFilteredGuides(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    const results = guides.filter(guide => {
      const matchesSearch =
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !filters.location || guide.location === filters.location;
      const matchesLanguage = !filters.language || guide.languages.includes(filters.language);

      let matchesPrice = true;
      if (filters.priceRange === "under-2000") {
        matchesPrice = guide.rentPerDay < 2000;
      } else if (filters.priceRange === "2000-5000") {
        matchesPrice = guide.rentPerDay >= 2000 && guide.rentPerDay <= 5000;
      } else if (filters.priceRange === "over-5000") {
        matchesPrice = guide.rentPerDay > 5000;
      }

      return matchesSearch && matchesLocation && matchesLanguage && matchesPrice;
    });

    setFilteredGuides(results);
  }, [searchTerm, filters, guides]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uniqueLocations = [...new Set(guides.map(guide => guide.location))];
  const uniqueLanguages = [...new Set(guides.flatMap(guide => guide.languages))];

  if (isLoading) {
    return (
      <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
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
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          Meet Our Expert Guides
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Discover passionate locals ready to share their knowledge and love for their city
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
                placeholder="Search guides by name, location or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <select
              name="location"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <select
              name="language"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              value={filters.language}
              onChange={handleFilterChange}
            >
              <option value="">All Languages</option>
              {uniqueLanguages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${filters.priceRange === "under-2000"
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => setFilters({ ...filters, priceRange: "under-2000" })}
            >
              Under Rs 2000
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${filters.priceRange === "2000-5000"
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => setFilters({ ...filters, priceRange: "2000-5000" })}
            >
              Rs 2000-5000
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${filters.priceRange === "over-5000"
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              onClick={() => setFilters({ ...filters, priceRange: "over-5000" })}
            >
              Over Rs 5000
            </button>
            {filters.priceRange && (
              <button
                type="button"
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                onClick={() => setFilters({ ...filters, priceRange: "" })}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {filteredGuides.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-sm max-w-md mx-auto border border-amber-100">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No guides found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <div
              key={guide._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-100"
            >
              {/* Guide Image */}
              <div className="relative h-72 overflow-hidden">
                {guide.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000${guide.images[0].url}`}
                    alt={guide.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${guide.available
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                    }`}>
                    {guide.available ? "Available" : "Booked"}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Rs {guide.rentPerDay}
                    <span className="text-sm font-normal text-white"> / day</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {guide.name}
                    </h2>
                    <p className="text-sm text-gray-500">{guide.location}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <span className="text-gray-800 font-bold mr-1">
                        {guide.rating.toFixed(1)}
                      </span>
                      {renderStars(guide.rating)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{guide.reviews?.length || 0} reviews</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {guide.about || "Experienced local guide with extensive knowledge of the area."}
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {guide.languages.map(language => (
                    <span key={language} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {language}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/guide/${guide._id}`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
                >
                  View Profile
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

export default GuideList;
