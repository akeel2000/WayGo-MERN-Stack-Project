import { FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiCalendar, FiCompass } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const DestinationView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination } = location.state || {};

  if (!destination) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-2 px-6 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Category-specific descriptions
  const getCategoryDescription = () => {
    switch(destination.category) {
      case 'Cultural':
        return `The ${destination.name} stands as a testament to Sri Lanka's rich cultural heritage, showcasing ancient architecture and historical significance that dates back centuries.`;
      case 'Beaches':
        return `${destination.name} offers pristine golden sands and crystal-clear waters, making it one of Sri Lanka's most picturesque coastal destinations perfect for relaxation and water sports.`;
      case 'Wildlife':
        return `${destination.name} provides exceptional opportunities to observe Sri Lanka's diverse wildlife in their natural habitat, including rare and endemic species.`;
      case 'Adventure':
        return `${destination.name} presents exciting challenges for adventure seekers with its unique terrain, offering breathtaking views and thrilling experiences.`;
      case 'Hill Country':
        return `${destination.name} showcases Sri Lanka's beautiful highlands with lush tea plantations, cool climate, and stunning landscapes.`;
      default:
        return `${destination.name} is one of Sri Lanka's most remarkable destinations, offering unique experiences for all types of travelers.`;
    }
  };

  // Category-specific highlights
  const getHighlights = () => {
    switch(destination.category) {
      case 'Cultural':
        return ['Ancient Architecture', 'Historical Significance', 'UNESCO Heritage', 'Museums'];
      case 'Beaches':
        return ['Golden Sands', 'Water Sports', 'Sunset Views', 'Beachfront Dining'];
      case 'Wildlife':
        return ['Safari Tours', 'Bird Watching', 'Nature Trails', 'Photography'];
      case 'Adventure':
        return ['Hiking Trails', 'Scenic Views', 'Rock Climbing', 'Camping'];
      case 'Hill Country':
        return ['Tea Plantations', 'Waterfalls', 'Cool Climate', 'Scenic Train Rides'];
      default:
        return ['Scenic Views', 'Local Cuisine', 'Cultural Experiences', 'Photography'];
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{destination.name}</h1>
                <div className="flex items-center text-amber-200">
                  <FiMapPin className="mr-2" />
                  <span>{destination.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
        {/* Back Button - Navigates to '/destinations' */}
        <button
          onClick={() => navigate('/destinations')}  // Update this path if your route is different
          className="flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Destinations
        </button>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
                    {destination.category}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-6">{destination.description}</p>

                {/* Highlights */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Experience Highlights</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {getHighlights().map((highlight, index) => (
                      <div key={index} className="bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-center text-sm font-medium">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="w-full md:w-80 bg-amber-50 rounded-xl p-6 h-fit">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiCalendar className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                      <p className="text-gray-600">{destination.details.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiDollarSign className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Entry Fee</h4>
                      <p className="text-gray-600">{destination.details.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiClock className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                      <p className="text-gray-600">{destination.details.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCompass className="text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Recommended Duration</h4>
                      <p className="text-gray-600">{destination.details.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="prose max-w-none text-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {destination.name}</h2>
              <p className="mb-4">{getCategoryDescription()}</p>

              {destination.category === 'Cultural' && (
                <p>The site features remarkable examples of ancient engineering and artistry, with well-preserved structures that offer insight into Sri Lanka's glorious past.</p>
              )}
              {destination.category === 'Beaches' && (
                <p>The beach is lined with palm trees and offers excellent opportunities for swimming, snorkeling, and simply relaxing while enjoying the tropical sun.</p>
              )}
              {destination.category === 'Wildlife' && (
                <p>The park's diverse ecosystems support a wide variety of mammals, birds, and reptiles, making it a paradise for nature enthusiasts.</p>
              )}
              {destination.category === 'Adventure' && (
                <p>The challenging terrain rewards visitors with panoramic views and a sense of accomplishment upon completing the journey.</p>
              )}
              {destination.category === 'Hill Country' && (
                <p>The region's cool climate and misty mountains create a tranquil atmosphere perfect for relaxation and enjoying nature's beauty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationView;
