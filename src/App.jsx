import React, { useState, useCallback } from 'react';
import MapView from './components/MapView';
import FlagDisplay from './components/FlagDisplay';
import NameDisplay from './components/NameDisplay';

function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  const handleCountrySelect = useCallback((code, name) => {
    setSelectedCountryCode(code);
    setSelectedCountryName(name);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#19181B'}}>
      <MapView onCountrySelect={handleCountrySelect} />
      <FlagDisplay countryCode={selectedCountryCode} />
      <NameDisplay countryName={selectedCountryName} />
    </div>
  );
}

export default App;






