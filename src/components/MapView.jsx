import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import countries from '../assets/osm-countries1.json';
import lightTile from '../assets/light_tile.json';

const MapView = ({ onCountrySelect}) => {
  const mapContainer = useRef(null);
  const [loading, setLoading] = useState(true);

  const hoveredCountryIdRef = useRef(null);
  const selectedCountryIdRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: lightTile,
      center: [0, 0],
      zoom: 2,
      minZoom: 2,
      antialias: true
    });

    mapRef.current = map;

    map.addControl(
        new maplibregl.GlobeControl()
    );

    map.on('load', () => {

      map.addSource('countries', {
        type: 'geojson',
        data: countries,
      });

      map.addLayer({
        id: 'country-borders',
        type: 'line',
        source: 'countries',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#808080',
          'line-width': 0.6,
          'line-opacity': 0.5
        }
      });

      map.addLayer({
        id: 'countries-fill',
        type: 'fill',
        source: 'countries',
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            "#000000",
            ["boolean", ["feature-state", "hover"], false],
            "#000000",
            "rgba(0,0,0,0)"
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            0.6,
            ['boolean', ['feature-state', 'hover'], false],
            0.3,
            0
          ],
          'fill-outline-color': '#000000',
        },
      });

      map.on('mousemove', 'countries-fill', (e) => {
        if (!e.features.length) return;
        const feature = e.features[0];
        const id = feature.id;

        if (
          hoveredCountryIdRef.current !== null &&
          hoveredCountryIdRef.current !== id &&
          hoveredCountryIdRef.current !== selectedCountryIdRef.current
        ) {
          map.setFeatureState(
            { source: 'countries', id: hoveredCountryIdRef.current },
            { hover: false }
          );
          hoveredCountryIdRef.current = null;
        }

        if (id === selectedCountryIdRef.current) return;

        hoveredCountryIdRef.current = id;
        map.setFeatureState({ source: 'countries', id }, { hover: true });
      });

      map.on('mouseleave', 'countries-fill', () => {
        if (
          hoveredCountryIdRef.current !== null &&
          hoveredCountryIdRef.current !== selectedCountryIdRef.current
        ) {
          map.setFeatureState({ source: 'countries', id: hoveredCountryIdRef.current }, { hover: false });
        }
        hoveredCountryIdRef.current = null;
      });

      map.on('click', 'countries-fill', (e) => {
        if (!e.features.length) return;
        const feature = e.features[0];
        const id = feature.id;

        if (hoveredCountryIdRef.current === id) {
          map.setFeatureState({ source: 'countries', id: hoveredCountryIdRef.current }, { hover: false });
        }
        hoveredCountryIdRef.current = null;

        if (selectedCountryIdRef.current !== null && selectedCountryIdRef.current !== id) {
          map.setFeatureState({ source: 'countries', id: selectedCountryIdRef.current }, { selected: false });
        }

        selectedCountryIdRef.current = id;
        map.setFeatureState({ source: 'countries', id }, { selected: true });

        const countryCode = feature.properties.ISO_A2;
        const countryName = feature.properties.ADMIN;
        if (onCountrySelect) onCountrySelect(countryCode, countryName);
      });
    });

    map.on('idle', () => setLoading(false));

    return () => {
      console.log('Unmounting MapView');
      map.remove();
    };
  }, [onCountrySelect]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'fixed',
            display: 'block',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: 40,
            height: 40,
            border: '4px solid #00aaff',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      <div ref={mapContainer} style={{ height: '100vh', width: '100vw' }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default MapView;
