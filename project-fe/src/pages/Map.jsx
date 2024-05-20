import React, { useEffect, useRef, useState } from 'react';
import * as Survey from 'survey-react';
import axios from 'axios';
import { MdOutlineCancel } from 'react-icons/md';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaLowVision } from "react-icons/fa";
import { GiHearingDisabled } from "react-icons/gi";
import { MdOutlineAccessibleForward } from "react-icons/md";
import { MdNotAccessible } from "react-icons/md";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Map.css';
import CognitiveDisability from '../icons/cognitive_impairment.png';
import { useStateContext } from '../contexts/ContextProvider';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const Map = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isUserAdmin = userInfo && userInfo.isAdmin;
  const { currentColor } = useStateContext();

  const surveyForDisabilityType = {
    "elements": [
      {
        "type": "rating",
        "name": "question1",
        "title": "How accessible were vending machines in the venue for individuals with hearing impairments? Consider factors such as visual cues, text instructions, or any other accessibility features. (1 for least accessible, 5 for most accessible)\r\n"
      },
      {
        "type": "boolean",
        "name": "question2",
        "title": "Evaluate the prevention measures in parking lots concerning safety for individuals with hearing impairments. Were there visual alerts or accessible communication options related to parking lot safety?",
        "labelTrue": "No",
        "labelFalse": "Yes"
      },
      {
        "type": "rating",
        "name": "question3",
        "title": "How would you rate the availability and effectiveness of communication options (e.g., sign language interpreters, captioning) at this venue?"
      },
      {
        "type": "boolean",
        "name": "question4",
        "title": "Did you face any problems in terms of communication?",
        "labelTrue": "No",
        "labelFalse": "Yes"
      },
      {
        "type": "boolean",
        "name": "question5",
        "title": "Do you find visual indicators or notifications for important announcements at this venue helpful?\r\n",
        "labelTrue": "No",
        "labelFalse": "Yes"
      },
      {
        "type": "boolean",
        "name": "question6",
        "title": "Were the staff members aware of your hearing impairment, and did they make an effort to assist you accordingly?",
        "labelTrue": "No",
        "labelFalse": "Yes"
      }
    ],
  };

  const handleComplete = (survey) => {
    console.log('Survey results:', survey.data);
  };

  const mapContainerRef = useRef(null);
  const [viewLocationPopUp, setViewLocationPopUp] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [surveyPopUpInfo, setSurveyPopUpInfo] = useState(null);
  const [commentsPopUpInfo, setCommentsPopUpInfo] = useState(null);
  const [clickedLocations, setClickedLocations] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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
      marker: {
        color: 'orange',
      },
      placeholder: 'Search for locations',
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['poi-label'],
      });

      if (features.length > 0) {
        const feature = features[0];
        const coordinates = feature.geometry.coordinates.slice();
        setViewLocationPopUp({
          name: feature.properties.name,
          description: feature.properties.description || 'No description',
          coordinates,
        });
        setLocationInfo({
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

  const fetchComments = async (locationName) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/comments/${locationName}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleViewComments = (locationName) => {
    setViewLocationPopUp(null);
    fetchComments(locationName);
    setCommentsPopUpInfo(true);
  };

  const handleAddComment = () => {
    console.log(locationInfo);
    setComments([...comments, newComment]);
    setNewComment('');
  };

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
    <div
      id="map-page"
      style={{
        top: '10px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        height: '90.91vh',
      }}
    >
      <div
        id="map-container"
        style={{
          position: 'relative',
          right: '0',
          left: '0',
          bottom: '0',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          id="geocoder"
          style={{
            position: 'absolute',
            top: '0%',
            left: '12%',
            transform: 'translateX(-50%)',
            width: '20%',
            zIndex: '10',
            backgroundColor: 'white',
            padding: '10px 15px',
            borderRadius: '15px',
            fontSize: '12px',
          }}
        >
        </div>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        {viewLocationPopUp && (
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
                onClick={() => setViewLocationPopUp(null)}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <div>
              <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Clicked Location: {viewLocationPopUp.name}</h2>
              <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Location Description: {viewLocationPopUp.description}</p>
              <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Coordinates: {viewLocationPopUp.coordinates.join(', ')}</p>
              <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Not appropriate for disability types:</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                <FaLowVision style={{ fontSize: "2rem", color: "blue" }} />
                <MdNotAccessible style={{ fontSize: "2rem", color: "blue", marginLeft: "10px" }} />
                <GiHearingDisabled style={{ fontSize: "2rem", color: "red", marginLeft: "10px" }} />
                <img src={CognitiveDisability} alt="Cognitive Disability" style={{ width: "2rem", marginLeft: "10px" }} />
              </div>
              <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Appropriate for disability types:</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                <MdOutlineAccessibleForward style={{ fontSize: "2rem", color: "green" }} />
              </div>
            </div>

            <div className="mt-5" style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => { setViewLocationPopUp(null); setSurveyPopUpInfo(true); }}
                style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                className=" text-undefined p-2 w-full hover:drop-shadow-xl hover:bg-undefined"
              >
                Fill the location survey
              </button>

              <button
                type="button"
                onClick={() => { setViewLocationPopUp(null); setCommentsPopUpInfo(true); }}
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
            <div style={{ textAlign: 'left' }}>
              <button
                type="button"
                onClick={() => { setSurveyPopUpInfo(null); setViewLocationPopUp(locationInfo); }}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <IoArrowBackCircleOutline />
              </button>
            </div>
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
                json={surveyForDisabilityType}
                onComplete={handleComplete}
              />
            </div>
          </div>
        )}
        {commentsPopUpInfo && (
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
              maxHeight: '70%', // Set your desired max height here
              overflowY: 'auto', // Enable vertical scrolling
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <button
                type="button"
                onClick={() => { setCommentsPopUpInfo(null); setViewLocationPopUp(locationInfo); }}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <IoArrowBackCircleOutline />
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setCommentsPopUpInfo(null)}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Location Comments</h2>

            {comments.length > 0 ? (
              <ul>
                <div>
                  {comments.map((comment, index) => (
                    <div key={index} className="comment-container" style={{ textAlign: 'left' }}>
                      <span className="comment-username">User:</span>
                      <p className="comment-text">{comment}</p>
                    </div>
                  ))}
                </div>
              </ul>
            ) : (
              <p>No comments have been sent.</p>
            )}
            {userInfo && (
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment..."
                  style={{ marginRight: '10px', padding: '5px', width: '60%' }}
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  style={{ backgroundColor: currentColor, color: 'white', borderRadius: '5px', padding: '5px 10px', border: 'none' }}
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
