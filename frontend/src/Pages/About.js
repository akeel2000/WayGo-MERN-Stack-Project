import React from 'react';
import { MapPin, UserCheck, HelpCircle, Globe, Heart, ShieldCheck, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 md:pt-24 px-6 md:px-12 bg-amber-50 text-gray-800">
      {/* Expanded Our Story Section */}
      <section className="mb-20">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-80 md:h-auto bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center">
            </div>
            <div className="p-10 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-600 mb-6">Our Journey</h1>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  WayGo began in 2015 as a passion project between three friends who wanted to share authentic travel experiences beyond the typical tourist routes. What started as a small blog featuring hidden gems in Southeast Asia has blossomed into a global platform serving travelers in over 50 countries.
                </p>
                <p className="text-lg leading-relaxed">
                  Our breakthrough came in 2018 when we introduced our signature "Local's Choice" itineraries - carefully curated travel plans designed by residents of each destination. This unique approach quickly gained recognition, earning us features in Travel+Leisure and Lonely Planet.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, with a team of 75 travel enthusiasts across 12 countries, we've helped more than 500,000 travelers discover the world differently. Our community includes everyone from solo backpackers to luxury seekers, all united by a desire for genuine cultural connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center mb-4">
              <Globe className="text-amber-600 mr-3" size={28} />
              <h3 className="text-xl font-semibold text-gray-800">Global Perspective</h3>
            </div>
            <p className="text-gray-600">
              We celebrate cultural diversity and work with local communities to create meaningful connections.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center mb-4">
              <Heart className="text-amber-600 mr-3" size={28} />
              <h3 className="text-xl font-semibold text-gray-800">Passionate Service</h3>
            </div>
            <p className="text-gray-600">
              Our team lives and breathes travel, bringing authentic enthusiasm to every interaction.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-amber-600 mr-3" size={28} />
              <h3 className="text-xl font-semibold text-gray-800">Trust & Safety</h3>
            </div>
            <p className="text-gray-600">
              We vet all partners thoroughly so you can explore with confidence and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-12">Why Travelers Choose WayGo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] duration-300">
            <div className="text-amber-600 mb-4">
              <MapPin size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-amber-700">Tailored Experiences</h3>
            <p className="text-gray-600">
              From food tours to adventure treks, we match you with experiences that fit your travel style perfectly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] duration-300">
            <div className="text-amber-600 mb-4">
              <UserCheck size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-amber-700">Local Experts</h3>
            <p className="text-gray-600">
              Our guides are passionate locals who love sharing their culture's hidden gems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] duration-300">
            <div className="text-amber-600 mb-4">
              <HelpCircle size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-amber-700">Always Available</h3>
            <p className="text-gray-600">
              24/7 support in multiple languages for unexpected changes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col md:flex-row items-center mb-20 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 h-80 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center">
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-amber-600 mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At WayGo, we're transforming travel experiences by combining technology with human expertise to remove trip planning stress while amplifying discovery joy.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a solo adventurer, family creating memories, or business traveler maximizing limited time, we ensure every journey exceeds expectations.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-amber-600 text-white rounded-2xl p-10 mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>info@waygo.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+1 (800) 555-0199</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
            <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
            <p>Saturday: 10:00 AM - 4:00 PM (EST)</p>
            <p className="mt-4">24/7 emergency support available for active trips.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
