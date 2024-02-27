import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYWJheWRhcnIiLCJhIjoiY2xxeHE5ZjJzMGd4ZTJqcGNndW5sNjczYyJ9.k1EfAxZmZHYy0Rn2J7dL-A';

const Map = () => {
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
        layers: ['poi-label']
      });

      if (features.length > 0) {
        const feature = features[0];
        setPopupInfo({
          name: feature.properties.name,
          description: feature.properties.description || 'Açıklama yok',
          coordinates: e.lngLat
        });
        // Yeni tıklanan konumu kaydet
        setClickedLocations(prevLocations => [...prevLocations, feature.properties.name]);
      }
    });

    return () => map.remove();
  }, []);

  // Kullanıcının tıkladığı yerlerin isimlerini içeren bir dosyayı indirme işlevi
  const downloadClickedLocations = () => {
    const element = document.createElement("a");
    const file = new Blob([clickedLocations.join("\n")], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "clicked.txt";
    document.body.appendChild(element); // Firefox için gereklidir
    element.click();
    document.body.removeChild(element);
    axios.post(`http://localhost:4000/api/coordinates`, { name: "Kaan" }).then(res => {
      setSignedIn(true);
      alert("Succesfully Signed In!");
    }).catch(err => alert(err))
  };

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
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
        </div>
      )}
      <button onClick={downloadClickedLocations} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Download Clicked Locations
      </button>
    </>
  );
};

export default Map;
