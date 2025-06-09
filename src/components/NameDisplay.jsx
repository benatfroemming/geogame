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
      padding: '4px 10px', // reduced padding
      borderRadius: '4px', // optional: smaller radius to match
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      zIndex: 1,
    }}>
      {countryName}
    </div>
  );
}

export default NameDisplay;
