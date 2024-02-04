import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainer = useRef(null);
  let map;

  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDxu0p7gtfsyOnER06MXb33wUVWFhF-Yzk&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    // Initialize the map once the script is loaded
    window.initMap = initMap;

    // Clean up the script tag
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    map = new window.google.maps.Map(mapContainer.current, {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 11,
    });
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
