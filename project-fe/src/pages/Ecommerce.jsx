import React from 'react';
import Map from './Map';

function App() {
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    backgroundColor: '#282c34',
    padding: '10px 0',
    color: 'white',
    fontSize: '1.5rem',
  };

  const titleStyle = {
    fontWeight: 'bold',
    margin: '0',
    fontSize: '4rem',
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
      <header style={headerStyle}>
        <h1 style={titleStyle}>Accessibility Map</h1>
      </header>
      <div style={mapContainerStyle}>
        <Map />
      </div>
    </div>
  );
}

export default App;
