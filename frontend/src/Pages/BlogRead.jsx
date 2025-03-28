import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShareAlt, FaBookmark, FaHeart } from "react-icons/fa";

const BlogRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: 'Exploring the Ancient City of Sigiriya',
      content: 'Sigiriya, the legendary "Lion Rock", is an ancient rock fortress with stunning frescoes and breathtaking views.',
      author: 'Travel Sri Lanka',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      fullContent: [
        'Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in Sri Lanka.',
        'The site dates back to the reign of King Kasyapa (477–495 CE) and is one of the best-preserved examples of ancient urban planning.',
        'The fortress complex includes remnants of a ruined palace, surrounded by an extensive network of fortifications, gardens, ponds, and frescoes.',
        'Visitors can climb the 1,200 steps to the summit to enjoy panoramic views of the surrounding jungle.',
        'The mirror wall with ancient graffiti, the lions paws entrance, and the famous frescoes of the "Heavenly Maidens" are among the highlights.'
      ],
      location: 'Matale District, Sri Lanka',
      duration: '4-5 hours',
      bestTime: 'Early morning or late afternoon',
      tips: [
        'Wear comfortable shoes for climbing',
        'Bring water and sun protection',
        'Hire a local guide for better understanding'
      ],
      tags: ['Historical', 'UNESCO', 'Adventure']
    },
   {
    id: 2,
    title: 'Beaches of Mirissa: A Tropical Paradise',
    content: 'Mirissa boasts some of Sri Lanka\'s most beautiful beaches with golden sands and turquoise waters. Perfect for whale watching, surfing, or simply relaxing under palm trees.',
    author: 'Island Explorers',
    date: 'April 2, 2024',
    image: 'https://images.unsplash.com/photo-1562613521-87f9a8b0e532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fullContent: [
      'Mirissa is a crescent-shaped beach on Sri Lanka\'s south coast, famous for its laid-back vibe and excellent surfing conditions.',
      'The main beach is lined with palm trees and beach bars serving fresh seafood and tropical cocktails.',
      'From November to April, Mirissa becomes one of the world\'s best places for blue whale sightings, with tours departing daily at dawn.',
      'Secret Beach and Coconut Tree Hill offer stunning viewpoints away from the main beach crowds.',
      'The area has excellent beginner surf spots at Weligama Bay just 10 minutes away.'
    ],
    location: 'Southern Province, Sri Lanka',
    duration: '2-3 days',
    bestTime: 'November to April (whale watching season)',
    tips: [
      'Book whale watching tours in advance during peak season',
      'Try surfing lessons at nearby Weligama Bay',
      'Visit Coconut Tree Hill for sunrise photos',
      'Sample fresh seafood at beachfront restaurants'
    ],
    tags: ['Beach', 'Whale Watching', 'Surfing'],
    highlights: [
      'Blue whale watching expeditions',
      'Secret Beach hidden cove',
      'Coconut Tree Hill viewpoint',
      'Beachfront seafood restaurants'
    ]
  },
  {
    id: 3,
    title: 'Tea Plantations of Nuwara Eliya',
    content: 'The rolling hills of Nuwara Eliya are covered in lush tea plantations that produce some of the world\'s finest tea. Take a factory tour and enjoy a fresh brew.',
    author: 'Ceylon Travel Diaries',
    date: 'April 10, 2024',
    image: 'https://images.unsplash.com/photo-1599391409945-6e7a4e72dc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fullContent: [
      'Nuwara Eliya, known as "Little England", sits at 1,868m altitude in Sri Lanka\'s hill country.',
      'The region produces some of the world\'s finest Ceylon tea, with plantations dating back to British colonial times.',
      'Visitors can tour working tea factories like Pedro Tea Estate to see the entire process from leaf to cup.',
      'The cool climate makes it perfect for growing strawberries, roses, and temperate vegetables.',
      'Colonial-era architecture includes the Grand Hotel and hill station bungalows with fireplaces.'
    ],
    location: 'Central Highlands, Sri Lanka',
    duration: '1-2 days',
    bestTime: 'March-May (spring season)',
    tips: [
      'Take a guided tour of a working tea factory',
      'Visit a tea plantation to see leaf pickers in action',
      'Pack warm clothing - temperatures can drop to 10°C',
      'Try strawberry picking in season (March-June)'
    ],
    tags: ['Tea', 'Mountains', 'Colonial'],
    highlights: [
      'Pedro Tea Estate factory tour',
      'Gregory Lake boat rides',
      'Hakgala Botanical Garden',
      'Strawberry farms'
    ]
  },
  {
    id: 4,
    title: 'Wildlife Safari in Yala National Park',
    content: 'Yala National Park offers incredible opportunities to spot leopards, elephants, and hundreds of bird species. Experience Sri Lanka\'s diverse wildlife.',
    author: 'Wildlife Adventures',
    date: 'April 18, 2024',
    image: 'https://images.unsplash.com/photo-1581668180100-8c7688e224e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fullContent: [
      'Yala National Park covers 979 square kilometers across Sri Lanka\'s southeast coast.',
      'It has the highest density of leopards in the world, with about 40 individuals in Block I.',
      'Morning safaris offer the best chance to see leopards, elephants, sloth bears, and crocodiles.',
      'The park has diverse ecosystems from monsoon forests to freshwater lakes attracting hundreds of bird species.',
      'Ancient rock formations and archaeological sites add cultural significance to the wildlife experience.'
    ],
    location: 'Southern and Uva Provinces',
    duration: 'Full day safari',
    bestTime: 'February-July (dry season)',
    tips: [
      'Book sunrise safaris for best animal sightings',
      'Bring binoculars and a telephoto lens',
      'Wear neutral-colored clothing',
      'Stay quiet during wildlife encounters'
    ],
    tags: ['Wildlife', 'Safari', 'Nature'],
    highlights: [
      'Leopard sightings',
      'Elephant herds',
      'Birdwatching (200+ species)',
      'Ancient rock formations'
    ]
  },
  {
    id: 5,
    title: 'The Sacred City of Kandy',
    content: 'Kandy, home to the Temple of the Sacred Tooth Relic, is a cultural hub surrounded by mountains and lakes. Experience traditional dance performances.',
    author: 'Cultural Journeys',
    date: 'April 25, 2024',
    image: 'https://images.unsplash.com/photo-1585323676128-3c4f1e41f68d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    fullContent: [
      'Kandy is Sri Lanka\'s cultural capital, home to the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa).',
      'The temple houses Buddha\'s tooth relic and is a UNESCO World Heritage Site.',
      'Daily rituals (pujas) occur at dawn, noon, and evening with traditional drumming and chanting.',
      'The Kandy Lake and Royal Botanical Gardens at Peradeniya offer beautiful green spaces.',
      'Cultural shows feature traditional Kandyan dancing, fire-walking, and drumming performances.'
    ],
    location: 'Central Province, Sri Lanka',
    duration: '1-2 days',
    bestTime: 'July-August (Esala Perahera festival)',
    tips: [
      'Dress modestly when visiting temples',
      'Attend evening puja ceremony',
      'Watch a cultural dance show',
      'Visit the Royal Botanical Gardens'
    ],
    tags: ['Cultural', 'UNESCO', 'Religious'],
    highlights: [
      'Temple of the Sacred Tooth Relic',
      'Kandy Lake walk',
      'Cultural dance performances',
      'Peradeniya Botanical Gardens'
    ]
  },
  {
    id: 6,
    title: 'Galle Fort: Colonial Charm',
    content: 'The 17th-century Galle Fort is a UNESCO site with Dutch-colonial buildings, boutique shops, and scenic ocean views. Walk along the ramparts at sunset.',
    author: 'Historic Trails',
    date: 'May 3, 2024',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80',
    fullContent: [
      'Galle Fort is a living museum of Dutch colonial architecture within 16th-century Portuguese fortifications.',
      'The 36-hectare UNESCO site has thick stone walls protecting cobblestone streets and colonial buildings.',
      'Today it houses boutique hotels, antique shops, cafes, and the National Maritime Museum.',
      'Key landmarks include the Dutch Reformed Church, Galle Lighthouse, and the historic Moon Bastion.',
      'The ramparts offer stunning sunset views over the Indian Ocean, popular with both locals and tourists.'
    ],
    location: 'Galle, Southern Province',
    duration: 'Half-day to full day',
    bestTime: 'November-April (dry season)',
    tips: [
      'Walk the ramparts clockwise at sunset',
      'Explore the historic underground tunnels',
      'Visit the Historical Mansion Museum',
      'Try Dutch-era recipes at Fort restaurants'
    ],
    tags: ['Historic', 'UNESCO', 'Architecture'],
    highlights: [
      'Sunset from the ramparts',
      'Dutch Reformed Church',
      'Galle Lighthouse',
      'Antique shopping'
    ]
  }

  ];

  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-600 mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-24 bg-amber-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button (Mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center text-amber-600 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image with Overlay */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{post.title}</h1>
              <div className="flex items-center mt-2">
                <span className="text-amber-300">{post.date}</span>
                <span className="mx-2 text-white">•</span>
                <span className="text-white">{post.author}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate(-1)}
                className="hidden md:flex items-center text-amber-600 hover:text-amber-700"
              >
                <FaArrowLeft className="mr-2" /> Back to Blog
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

            {/* Author Info */}
            <div className="flex items-center mb-8">
              <div className="bg-amber-100 rounded-full p-1 mr-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  SL
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                <p className="text-xs text-amber-600">Travel Expert</p>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="prose max-w-none text-gray-700 mb-8 space-y-6">
              {(post.fullContent || [post.content]).map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* Travel Details */}
            <div className="bg-amber-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Travel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Location</h4>
                  <p className="text-gray-600">{post.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Duration</h4>
                  <p className="text-gray-600">{post.duration}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Best Time to Visit</h4>
                  <p className="text-gray-600">{post.bestTime}</p>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            {post.tips && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Travel Tips</h3>
                <ul className="space-y-2">
                  {post.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {post.tags && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts (Sample) */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogPosts
                  .filter(p => p.id !== post.id)
                  .slice(0, 2)
                  .map(relatedPost => (
                    <div
                      key={relatedPost.id}
                      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800">{relatedPost.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Comments Section (Sample) */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Comments (3)</h3>
              <div className="space-y-6">
                {[1, 2, 3].map(comment => (
                  <div key={comment} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">U{comment}</span>
                      </div>
                    </div>
                    <div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold">User {comment}</h4>
                        <p className="text-gray-600 mt-1">This is a sample comment about the blog post. Very informative!</p>
                        <p className="text-xs text-gray-400 mt-2">2 days ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-4">Leave a Comment</h4>
                <form className="space-y-4">
                  <div>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      rows="4"
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
