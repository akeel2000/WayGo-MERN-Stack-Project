import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiMapPin } from 'react-icons/fi';

const DestinationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  // Sample destination data
  const destinations = [
    {
      id: 1,
      name: 'Sigiriya Rock Fortress',
      description: 'Ancient rock fortress with stunning frescoes and panoramic views',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509',
      category: 'Cultural',
      location: 'Central Province',
      details: {
        bestTime: 'November to April',
        entryFee: '$25 for foreigners',
        hours: '6:00 AM - 6:00 PM',
        duration: '2-4 hours'
      }
    },
    {
      id: 2,
      name: 'Unawatuna Beach',
      description: 'Picturesque crescent beach with golden sands and turquoise waters',
      image: 'https://images.unsplash.com/photo-1564429093194-c9dfd7d8ba4d',
      category: 'Beaches',
      location: 'Southern Province',
      details: {
        bestTime: 'December to March',
        entryFee: 'Free',
        hours: 'All day',
        duration: '2-6 hours'
      }
    },
    {
      id: 3,
      name: 'Yala National Park',
      description: 'Premier wildlife sanctuary famous for leopard sightings',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
      category: 'Wildlife',
      location: 'Southern Province',
      details: {
        bestTime: 'February to July',
        entryFee: '$15 for foreigners',
        hours: '6:00 AM - 6:00 PM',
        duration: 'Half day to full day'
      }
    },
    {
      id: 4,
      name: 'Adam\'s Peak',
      description: 'Sacred mountain with a footprint-shaped mark, popular for sunrise hikes',
      image: 'https://images.unsplash.com/photo-1581431886211-6b7b0a3b6de5',
      category: 'Adventure',
      location: 'Sabaragamuwa Province',
      details: {
        bestTime: 'December to May',
        entryFee: 'Free',
        hours: 'Open 24 hours during season',
        duration: '4-6 hours (hike)'
      }
    },
    {
      id: 5,
      name: 'Galle Fort',
      description: 'Historic fortified city with Dutch colonial architecture',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a',
      category: 'Cultural',
      location: 'Southern Province',
      details: {
        bestTime: 'Year-round',
        entryFee: 'Free (some attractions charge)',
        hours: 'Always open',
        duration: '2-3 hours'
      }
    },
    {
      id: 6,
      name: 'Mirissa Whale Watching',
      description: 'Best place to spot blue whales and dolphins in their natural habitat',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      category: 'Wildlife',
      location: 'Southern Province',
      details: {
        bestTime: 'November to April',
        entryFee: '$40-$60 per person',
        hours: 'Early morning tours',
        duration: '3-5 hours'
      }
    },
    {
      id: 7,
      name: 'Nuwara Eliya',
      description: 'Charming hill station with tea plantations and colonial charm',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
      category: 'Hill Country',
      location: 'Central Province',
      details: {
        bestTime: 'March to May',
        entryFee: 'Free',
        hours: 'Always open',
        duration: '1-2 days'
      }
    },
  ];

  const categories = ['All', 'Beaches', 'Cultural', 'Wildlife', 'Adventure', 'Hill Country'];

  // Filter destinations
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="relative h-[32rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/80 via-orange-500/70 to-orange-600/60"></div>
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791"
          alt="Sri Lanka Landscape"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black/10 via-black/30 to-black/50">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Explore Sri Lanka's <span className="text-amber-300">Wonders</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl leading-relaxed">
            Discover breathtaking destinations across the Pearl of the Indian Ocean
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-2 border border-amber-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              className="flex items-center justify-between w-full md:w-48 px-4 py-2 border border-amber-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span>{selectedCategory}</span>
              <FiChevronDown className={`ml-2 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-full md:w-48 bg-white border border-amber-100 rounded-lg shadow-lg">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`block w-full text-left px-4 py-2 hover:bg-amber-50 ${category === selectedCategory ? 'bg-amber-100 text-amber-600' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  <div className="flex items-center text-amber-200 text-sm">
                    <FiMapPin className="mr-1" />
                    <span>{destination.location}</span>
                  </div>
                </div>
                <span className="absolute top-2 right-2 bg-amber-100 text-amber-600 px-2 py-1 rounded-full text-xs font-medium">
                  {destination.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button
                  onClick={() => navigate(`/destination/${destination.id}`, { state: { destination } })}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No destinations found matching your criteria</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
