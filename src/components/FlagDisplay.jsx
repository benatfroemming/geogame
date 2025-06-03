import React from 'react';

function FlagDisplay({ countryCode }) {
  if (!countryCode) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1
    }}>
      <img
        src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
        alt={`${countryCode} flag`}
        style={{ height: '50px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'}}
      />
    </div>
  );
}

export default FlagDisplay;

