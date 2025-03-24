// src/Home.js
import React from 'react';
import homeImage from '../images/Home.jpg'; // <-- 1) Import the image

function Home() {
  return (
    <div
      className="relative w-full h-screen bg-center bg-cover"
      // 2) Use the imported variable here
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Centered Text */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Enjoy Your Holiday
        </h1>
        <p className="text-2xl md:text-4xl mt-2">
          Sri Lanka
        </p>
      </div>
    </div>
  );
}

export default Home;
