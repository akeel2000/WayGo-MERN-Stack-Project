import React from 'react';
import { MapPin, UserCheck, HelpCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 md:pt-24 p-6 md:p-8 bg-amber-50 text-gray-800">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-600 mb-4">About WayGo</h1>
        <p className="text-lg md:text-xl">Your trusted travel companion — helping you explore, plan, and manage unforgettable trips.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-amber-600 mb-4">
            <MapPin size={40} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Personalized Itineraries</h2>
          <p>Create custom travel plans tailored to your preferences and interests.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-amber-600 mb-4">
            <UserCheck size={40} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Verified Tour Guides</h2>
          <p>Connect with experienced and verified tour guides for a safe journey.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-amber-600 mb-4">
            <HelpCircle size={40} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Real-time Assistance</h2>
          <p>Get real-time support and assistance during your travels.</p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center mb-12">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <div className="bg-amber-100 h-64 rounded-2xl"></div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-semibold text-amber-600 mb-4">Our Mission</h2>
          <p className="text-lg">At WayGo, we aim to make travel stress-free and memorable by connecting you with the right resources.</p>
        </div>
      </section>

      <div className="text-center">
        <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default Contact;
