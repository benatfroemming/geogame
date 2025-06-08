import React from 'react';

function NameDisplay({ countryName }) {
  if (!countryName) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '0 20px',
      borderRadius: '6px',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      zIndex: 1,
    }}>
      <p>{countryName}</p>
    </div>
  );
}

export default NameDisplay;