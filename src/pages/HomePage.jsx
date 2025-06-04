import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#19181B', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Welcome to GeoGame</h1>
      <button onClick={() => navigate('/map')} style={{ padding: '1rem', marginTop: '1rem' }}>
        Go to Map
      </button>
    </div>
  );
};

export default HomePage;



