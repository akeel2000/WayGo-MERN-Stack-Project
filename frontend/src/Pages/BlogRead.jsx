import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShareAlt, FaBookmark, FaHeart, FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaUtensils, FaParking, FaSnowflake, FaTv } from "react-icons/fa";

const DestinationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      title: 'Sigiriya Rock Fortress',
      description: 'Ancient rock fortress with stunning frescoes and panoramic views',
      content: [
        'Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in Sri Lanka.',
        'The site dates back to the reign of King Kasyapa (477–495 CE) and is one of the best-preserved examples of ancient urban planning.',
        'The fortress complex includes remnants of a ruined palace, surrounded by an extensive network of fortifications, gardens, ponds, and frescoes.',
        'Visitors can climb the 1,200 steps to the summit to enjoy panoramic views of the surrounding jungle.',
        'The mirror wall with ancient graffiti, the lions paws entrance, and the famous frescoes of the "Heavenly Maidens" are among the highlights.'
      ],
      location: 'Matale District, Sri Lanka',
      rating: 4.8,
      reviewCount: 428,
      price: 279,
      duration: '4-5 hours',
      bestTime: 'Early morning or late afternoon',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      amenities: [
        { name: 'Free WiFi', icon: <FaWifi className="text-amber-500" /> },
        { name: 'Swimming Pool', icon: <FaSwimmingPool className="text-amber-500" /> },
        { name: 'Restaurant', icon: <FaUtensils className="text-amber-500" /> },
        { name: 'Free Parking', icon: <FaParking className="text-amber-500" /> },
        { name: 'Air Conditioning', icon: <FaSnowflake className="text-amber-500" /> },
        { name: 'Satellite TV', icon: <FaTv className="text-amber-500" /> }
      ],
      tips: [
        'Wear comfortable shoes for climbing',
        'Bring water and sun protection',
        'Hire a local guide for better understanding',
        'Visit early to avoid crowds and heat'
      ],
      highlights: [
        'UNESCO World Heritage Site',
        'Iconic lion staircase entrance',
        'Ancient frescoes (Sigiriya Damsels)',
        '360-degree panoramic views',
        'Well-preserved water gardens'
      ],
      policies: [
        'Check-in: 2:00 PM',
        'Check-out: 11:00 AM',
        'No smoking in rooms',
        'Pets not allowed',
        'Cancellation policy: 48 hours before check-in'
      ]
    },
    // Add other destinations similarly...
  ];

  const destination = destinations.find(dest => dest.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-600 mb-4">Destination Not Found</h1>
          <button
            onClick={() => navigate('/destinations')}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-24 bg-amber-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button (Mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center text-amber-600 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{destination.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-amber-300">
                  <FaStar className="mr-1" />
                  <span>{destination.rating}</span>
                  <span className="mx-2 text-white">•</span>
                  <span className="text-white">{destination.reviewCount} reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
            {/* Left Column - Destination Details */}
            <div className="lg:col-span-2">
              {/* Action Buttons */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="hidden md:flex items-center text-amber-600 hover:text-amber-700"
                >
                  <FaArrowLeft className="mr-2" /> Back to Destinations
                </button>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-amber-500">
                    <FaBookmark />
                  </button>
                  <button className="text-gray-500 hover:text-amber-500">
                    <FaHeart />
                  </button>
                  <button className="text-gray-500 hover:text-amber-500">
                    <FaShareAlt />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-6">
                <FaMapMarkerAlt className="text-amber-500 mr-2" />
                <span>{destination.location}</span>
              </div>

              {/* Main Content */}
              <div className="prose max-w-none text-gray-700 mb-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">About This Destination</h2>
                {destination.content.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {destination.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">{amenity.icon}</span>
                      <span className="text-gray-600">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Travel Tips</h2>
                <ul className="space-y-2">
                  {destination.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Policies</h2>
                <ul className="space-y-2">
                  {destination.policies.map((policy, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">${destination.price}<span className="text-gray-500 text-base font-normal"> / night</span></h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{destination.rating}</span>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="border rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Check-in</label>
                      <div className="text-gray-700">Add dates</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Check-out</label>
                      <div className="text-gray-700">Add dates</div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 mb-2">
                    <label className="block text-xs text-gray-500 mb-1">Guests</label>
                    <div className="text-gray-700">1 guest</div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md">
                  Book Now
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">${destination.price} x 5 nights</span>
                    <span className="text-gray-800">${destination.price * 5}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-800">$42</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${(destination.price * 5) + 42}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Destinations */}
          <div className="border-t pt-8 px-6 md:px-8 pb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations
                .filter(dest => dest.id !== destination.id)
                .slice(0, 3)
                .map(relatedDest => (
                  <div
                    key={relatedDest.id}
                    className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/destinations/${relatedDest.id}`)}
                  >
                    <img
                      src={relatedDest.image}
                      alt={relatedDest.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800">{relatedDest.title}</h4>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1 text-sm" />
                          <span className="text-sm">{relatedDest.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <FaMapMarkerAlt className="mr-1 text-xs" />
                        <span>{relatedDest.location}</span>
                      </div>
                      <div className="mt-2 text-amber-600 font-medium">
                        ${relatedDest.price}<span className="text-gray-500 text-sm"> / night</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationView;
