import React from 'react';

const Destination = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Explore Destinations</h1>
      <p>Discover the best destinations for your next adventure!</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Example destination cards */}
        <div style={cardStyle}>
          <img
            src="https://via.placeholder.com/150"
            alt="Destination 1"
            style={imageStyle}
          />
          <h3>Destination 1</h3>
          <p>Amazing place to visit.</p>
        </div>
        <div style={cardStyle}>
          <img
            src="https://via.placeholder.com/150"
            alt="Destination 2"
            style={imageStyle}
          />
          <h3>Destination 2</h3>
          <p>Experience the beauty of nature.</p>
        </div>
        <div style={cardStyle}>
          <img
            src="https://via.placeholder.com/150"
            alt="Destination 3"
            style={imageStyle}
          />
          <h3>Destination 3</h3>
          <p>Perfect for a relaxing getaway.</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  width: '200px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  borderRadius: '8px',
};

export default Destination;
