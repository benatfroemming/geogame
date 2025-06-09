import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';
import FlagDisplay from '../components/FlagDisplay';
import NameDisplay from '../components/NameDisplay';

const styles = {
  wrapper: {
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#fff',
    color: '#1a202c',
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e2e8f0',
    zIndex: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: '#1a202c',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    textAlign: 'left',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  navButtonHover: {
    backgroundColor: '#ebf8ff',
    color: '#007bff',
  },
  mainContent: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
  },
};

const MapStudyPage = () => {
  const navigate = useNavigate();
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [hoveringBack, setHoveringBack] = useState(false);

  const handleCountrySelect = useCallback((code, name) => {
    setSelectedCountryCode(code);
    setSelectedCountryName(name);
  }, []);

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.logo}>Lurmap</div>
        <button
          onClick={() => navigate('/')}
          style={{
            ...styles.navButton,
            ...(hoveringBack ? styles.navButtonHover : {}),
          }}
          onMouseEnter={() => setHoveringBack(true)}
          onMouseLeave={() => setHoveringBack(false)}
        >
          Back
        </button>
      </header>

      <div style={styles.mainContent}>
        <MapView onCountrySelect={handleCountrySelect} />
        <FlagDisplay countryCode={selectedCountryCode} />
        <NameDisplay countryName={selectedCountryName} />
      </div>
    </div>
  );
};

export default MapStudyPage;
