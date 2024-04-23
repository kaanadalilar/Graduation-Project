import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYWJheWRhcnIiLCJhIjoiY2xxeHE5ZjJzMGd4ZTJqcGNndW5sNjczYyJ9.k1EfAxZmZHYy0Rn2J7dL-A';

const Map = () => {
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    height: '89.82vmin',
  };

  const mapContainerStyle = {
    position: 'relative',
    top: '10px',
    right: '0',
    left: '0',
    bottom: '0',
    height: '100%',
    width: '100%',
  };

  const mapContainerRef = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [clickedLocations, setClickedLocations] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.9784, 41.0082],
      zoom: 11,
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['poi-label'],
      });

      if (features.length > 0) {
        const feature = features[0];
        const coordinates = feature.geometry.coordinates.slice();
        setPopupInfo({
          name: feature.properties.name,
          description: feature.properties.description || 'No description',
          coordinates,
        });
        setClickedLocations((prevLocations) => [...prevLocations, feature.properties.name]);
      }
    });

    // Resize map on load
    map.on('load', () => {
      map.resize();
    });

    const handleResize = () => {
      map.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
    };
  }, []);

  const downloadClickedLocations = () => {
    const clickedLocationsAsString = clickedLocations.join('\n');
    const element = document.createElement('a');
    const file = new Blob([clickedLocationsAsString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'clicked.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    axios
      .post(`${process.env.REACT_APP_URL}/api/coordinates/add`, { coordinateName: clickedLocations[0] })
      .then((res) => {
        console.log(res.data);
        alert('Successfully sent to database!');
      }).catch((err) => alert(err));
  };

  return (
    <div id="map-page" style={appStyle}>
      <div id="map-container" style={mapContainerStyle}>
        <button type="button" onClick={downloadClickedLocations} style={{ position: 'absolute', top: '10px', left: '10px' }}>
          Download Clicked Locations
        </button>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        {popupInfo && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
            }}
          >
            <h2>{popupInfo.name}</h2>
            <p>{popupInfo.description}</p>
            <p>Coordinates: {popupInfo.coordinates.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
