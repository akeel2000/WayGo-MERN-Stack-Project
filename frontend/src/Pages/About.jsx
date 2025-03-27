import React from "react";
import { FaGlobe, FaHeart, FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLeaf, FaHandsHelping, FaSmile } from "react-icons/fa";

const About = () => {
  return (
    <div className="pt-32 md:pt-24 bg-gradient-to-b from-amber-50 to-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative text-center py-16 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.2)), url(https://images.unsplash.com/photo-1505832018823-50331d70d237?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">About WayGo</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Discover the story behind WayGo, our mission, and the values that drive us to create unforgettable travel experiences.
          </p>
        </div>
      </section>

            {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-600 mb-4 font-serif">Our Journey</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=60"
                alt="Our team traveling"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-light">Our founding team in Bali, 2015</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">From Passion to Purpose</h3>
              <p className="text-gray-600 leading-relaxed">
                WayGo began in 2015 as a passion project between three friends who wanted to share authentic travel experiences beyond the typical tourist routes. What started as a small blog has blossomed into a global platform serving travelers in over 50 countries.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our founders met while backpacking through Southeast Asia, bonding over shared frustrations with impersonal, cookie-cutter travel experiences. They dreamed of creating a service that would connect travelers with local cultures in meaningful ways.
              </p>
              <div className="pt-4">
                <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-300 shadow-md">
                  Meet Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">WayGo By The Numbers</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-amber-100">Countries Covered</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">250K+</div>
              <div className="text-amber-100">Happy Travelers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-amber-100">Local Guides</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-amber-100">Positive Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-600 mb-4 font-serif">Our Core Values</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              These principles guide every decision we make and every experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Global Perspective</h3>
              <p className="text-gray-600">
                We celebrate cultural diversity and work with local communities to create meaningful connections that benefit both travelers and hosts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaHeart />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Passionate Service</h3>
              <p className="text-gray-600">
                Our team lives and breathes travel, bringing authentic enthusiasm to every interaction. We don't just plan trips - we craft experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trust & Safety</h3>
              <p className="text-gray-600">
                We vet all partners thoroughly so you can explore with confidence. Your safety and peace of mind are our top priorities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Travel</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices that preserve destinations for future generations while supporting local economies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaHandsHelping />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Focus</h3>
              <p className="text-gray-600">
                We believe travel should benefit local communities. That's why we partner with small businesses and family-run establishments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-amber-500 hover:-translate-y-2">
              <div className="text-amber-600 text-5xl mb-6">
                <FaSmile />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Joyful Exploration</h3>
              <p className="text-gray-600">
                At the heart of everything we do is a simple belief: travel should be fun, inspiring, and life-enriching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
