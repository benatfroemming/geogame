import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={`/geogame/map-marker.png`}
          alt="Lurmap Logo"
          style={{
            width: '40px',          // or adjust size as needed
            height: 'auto',
            marginRight: '0.5rem',
          }}
        />
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#1a202c', cursor: 'pointer' }}>Home</button>
          <button onClick={() => navigate('/map')} style={{ background: 'none', border: 'none', color: '#1a202c', cursor: 'pointer' }}>Study</button>
          <button onClick={() => navigate('/play')} style={{ background: 'none', border: 'none', color: '#1a202c', cursor: 'pointer' }}>Play</button>
          <button onClick={() => navigate('/about')} style={{ background: 'none', border: 'none', color: '#1a202c', cursor: 'pointer' }}>About</button>
        </div>
      </nav>

      {/* Content */}
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          textAlign: 'center',
          boxSizing: 'border-box',
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%',
        }}
      >

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', color: '#1a202c' }}>
          Welcome to Lurmap
        </h1>
        <p style={{ marginBottom: '2rem', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#4a5568' }}>
          Bringing geography games into the modern era.
        </p>
        {/* Image */}
        <img
          src={`/geogame/globe.png`} 
          alt="World Map"
          style={{
            maxWidth: '100px',
            height: 'auto',
            border: 'black',
          }}
        />
      </main>
    </div>
  );
};

export default HomePage;










