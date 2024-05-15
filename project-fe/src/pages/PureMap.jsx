import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const PureMap = () => {
  const mapContainerRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [29.37917947769165, 40.8932846477945],
      zoom: 11,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search for locations',
    });

    map.addControl(geocoder, 'top-left');

    const newMarker = new mapboxgl.Marker({ color: 'orange' });

    geocoder.on('result', (event) => {
      if (marker) {
        marker.remove();
      }
      newMarker.setLngLat(event.result.geometry.coordinates).addTo(map);
      setMarker(newMarker);
    });

    map.on('load', () => {
      map.resize();
    });

    return () => {
      map.remove();
      if (marker) {
        marker.remove();
      }
    };
  }, []);

  return (
    <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '90.91vh' }} />
  );
};

export default PureMap;
