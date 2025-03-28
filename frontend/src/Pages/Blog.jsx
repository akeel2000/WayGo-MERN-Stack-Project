import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

  // ========== BLOG POST DATA ==========
  const blogPosts = [
    {
      id: 1,
      title: 'Exploring the Ancient City of Sigiriya',
      content: 'Sigiriya, the legendary "Lion Rock", is an ancient rock fortress with stunning frescoes and breathtaking views. This UNESCO World Heritage Site offers a glimpse into Sri Lanka\'s rich history.',
      author: 'Travel Sri Lanka',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    },
    {
      id: 2,
      title: 'Beaches of Mirissa: A Tropical Paradise',
      content: 'Mirissa boasts some of Sri Lanka\'s most beautiful beaches with golden sands and turquoise waters. Perfect for whale watching, surfing, or simply relaxing under palm trees.',
      author: 'Island Explorers',
      date: 'April 2, 2024',
      image: 'https://images.unsplash.com/photo-1562613521-87f9a8b0e532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      title: 'Tea Plantations of Nuwara Eliya',
      content: 'The rolling hills of Nuwara Eliya are covered in lush tea plantations that produce some of the world\'s finest tea. Take a factory tour and enjoy a fresh brew.',
      author: 'Ceylon Travel Diaries',
      date: 'April 10, 2024',
      image: 'https://images.unsplash.com/photo-1599391409945-6e7a4e72dc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 4,
      title: 'Wildlife Safari in Yala National Park',
      content: 'Yala National Park offers incredible opportunities to spot leopards, elephants, and hundreds of bird species. Experience Sri Lanka\'s diverse wildlife.',
      author: 'Wildlife Adventures',
      date: 'April 18, 2024',
      image: 'https://images.unsplash.com/photo-1581668180100-8c7688e224e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 5,
      title: 'The Sacred City of Kandy',
      content: 'Kandy, home to the Temple of the Sacred Tooth Relic, is a cultural hub surrounded by mountains and lakes. Experience traditional dance performances.',
      author: 'Cultural Journeys',
      date: 'April 25, 2024',
      image: 'https://images.unsplash.com/photo-1585323676128-3c4f1e41f68d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 6,
      title: 'Galle Fort: Colonial Charm',
      content: 'The 17th-century Galle Fort is a UNESCO site with Dutch-colonial buildings, boutique shops, and scenic ocean views. Walk along the ramparts at sunset.',
      author: 'Historic Trails',
      date: 'May 3, 2024',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80',
    },
  ];

  const Blog = () => {
    const navigate = useNavigate();

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`); // Navigate to BlogRead page with post ID
  };

  return (
    <div className="bg-amber-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.4), rgba(245, 158, 11, 0.4)), url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh"
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sri Lanka Travel Blog
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8">
            Discover the Pearl of the Indian Ocean through our stories, guides, and travel experiences
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Featured Travel Stories
            </h2>
            <p className="text-lg text-amber-600 max-w-2xl mx-auto">
              Our most popular guides and experiences from around Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full">
                <div className="h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={post.image}
                    alt={`${post.title} in Sri Lanka`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-3">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Travel Guide
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-5 flex-grow">
                    {post.content}
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="bg-amber-100 rounded-full p-1 mr-3">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        SL
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-xs text-amber-600">
                        Travel Expert
                      </p>
                    </div>
                    <button
                      onClick={() => handleReadMore(post.id)}
                      className="text-sm font-medium bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all whitespace-nowrap"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
