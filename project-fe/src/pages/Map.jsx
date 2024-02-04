import React, { useEffect, useRef } from 'react';

function App() {
  const Map = () => {
    const mapContainer = useRef(null);
    let map;

    useEffect(() => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDxu0p7gtfsyOnER06MXb33wUVWFhF-Yzk&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
      window.initMap = initMap;
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

    return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
  };

  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const mapContainerStyle = {
    position: 'relative', // Eğer üstteki elemanlar sabit yükseklikteyse bu iyi çalışır
    top: '50px', // Header ve navbar yüksekliğine bağlı olarak ayarlayın
    right: '0',
    left: '0',
    bottom: '0',
    height: 'calc(100vh - 200px)', // Header ve navbar yüksekliğini çıkardık
  };

  return (
    <div style={appStyle}>
      <div style={mapContainerStyle}>
        <Map />
      </div>
    </div>
  );
}

export default App;
