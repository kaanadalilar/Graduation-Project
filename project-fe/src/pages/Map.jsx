import React, { useEffect, useRef, useState } from 'react';
import * as Survey from 'survey-react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { useStateContext } from '../contexts/ContextProvider';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYWJheWRhcnIiLCJhIjoiY2xxeHE5ZjJzMGd4ZTJqcGNndW5sNjczYyJ9.k1EfAxZmZHYy0Rn2J7dL-A';

const Map = () => {
  const { currentColor } = useStateContext();
  const surveyJSON = {
    elements: [
      {
        type: 'text',
        name: 'name',
        title: 'What is your name?',
      },
      {
        type: 'radiogroup',
        name: 'favorite_color',
        title: 'What is your favorite color?',
        choices: ['Red', 'Green', 'Blue'],
      },
    ],
  };

  // Handle survey completion
  const handleComplete = (survey) => {
    console.log('Survey results:', survey.data);
  };

  const appStyle = {
    top: '10px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    height: '90.91vh',
  };

  const mapContainerStyle = {
    position: 'relative',
    right: '0',
    left: '0',
    bottom: '0',
    height: '100%',
    width: '100%',
  };

  const mapContainerRef = useRef(null);
  const [locationPopUpInfo, setLocationPopUpInfo] = useState(null);
  const [surveyPopUpInfo, setSurveyPopUpInfo] = useState(null);
  const [commentsPopUpInfo, setCommentsPopUpInfo] = useState(null);
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
        setLocationPopUpInfo({
          name: feature.properties.name,
          description: feature.properties.description || 'No description',
          coordinates,
        });
        setClickedLocations((prevLocations) => [...prevLocations, feature.properties.name]);
      }
    });

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
      .post(`http://localhost:4000/api/coordinates/add`, { coordinateName: clickedLocations[0] })
      .then((res) => {
        alert('Successfully sent to database!');
      }).catch((err) => alert(err));
  };

  return (
    <div id='map-page' style={appStyle}>
      <div id='map-container' style={mapContainerStyle}>
        <button type="button" onClick={downloadClickedLocations} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '10' }}>
          Download Clicked Locations
        </button>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        {locationPopUpInfo && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
              width: '50%',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setLocationPopUpInfo(null)}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Clicked Location: {locationPopUpInfo.name}</h2>
            <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Location Description: {locationPopUpInfo.description}</p>
            <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Coordinates: {locationPopUpInfo.coordinates.join(', ')}</p>
            <div className="mt-5" style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => { setLocationPopUpInfo(null); setSurveyPopUpInfo(true) }}
                style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                className=" text-undefined p-2 w-full hover:drop-shadow-xl hover:bg-undefined"
              >
                Fill the location survey
              </button>

              <button
                type="button"
                onClick={() => { setLocationPopUpInfo(null); setCommentsPopUpInfo(true) }}
                style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                className=" text-undefined p-2 w-full hover:drop-shadow-xl hover:bg-undefined"
              >
                Review location comments
              </button>
            </div>
          </div>
        )}
        {surveyPopUpInfo && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
              width: '50%',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setSurveyPopUpInfo(null)}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <div>
              <Survey.Survey
                json={surveyJSON}
                onComplete={handleComplete}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default Map;
