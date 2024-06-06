import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdNotAccessible, MdOutlineCancel, MdOutlineAccessibleForward } from 'react-icons/md';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaLowVision } from 'react-icons/fa';
import { GiHearingDisabled } from 'react-icons/gi';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './Map.css';
import CognitiveDisability from '../icons/cognitive_impairment.png';
import Elevator from '../icons/elevator.jpg';
import Ramp from '../icons/ramp.png';
import SignLanguage from '../icons/sign_language.png';
import Toilet from '../icons/toilet.webp';
import YellowBand from '../icons/yellow_band.jpg';

import { useStateContext } from '../contexts/ContextProvider';
import SurveyComponent from './SurveyComponent';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const Map = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo && userInfo.name;
  const token = userInfo && userInfo.token;
  const disabilityType = userInfo && userInfo.disability;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const { currentColor } = useStateContext();

  const mapContainerRef = useRef(null);
  const [viewLocationPopUp, setViewLocationPopUp] = useState(null);
  const [viewCommentsPopUp, setViewCommentsPopUp] = useState(null);
  const [viewErrorPopUp, setViewErrorPopUp] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);
  const [surveyPopUpInfo, setSurveyPopUpInfo] = useState(null);

  const [surveyInfo, setSurveyInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [availableModalData, setAvailableModalData] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [29.37917947769165, 40.8932846477945],
      zoom: 11,
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      marker: {
        color: 'orange',
      },
      placeholder: 'Search for locations',
    });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/locations/get_all_locations`)
      .then((response) => {
        const locations = response.data;
        locations.forEach((location) => {
          new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .setPopup(new mapboxgl.Popup().setText(location.locationName))
            .addTo(map);
        });
      })
      .catch(() => {
        setErrorMessage('There is a problem in connecting to the server to fetch locations...');
        setViewErrorPopUp(true);
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
          latitude: coordinates[1],
          longitude: coordinates[0],
        });
        setLocationInfo({
          name: feature.properties.name,
          description: feature.properties.description || 'No description',
          coordinates,
          latitude: coordinates[1],
          longitude: coordinates[0],
        });
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

  const fetchLocationInfo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/locations/get_location`,
        {
          locationName: locationInfo.name,
          longitude: parseFloat(locationInfo.longitude.toFixed(3)),
          latitude: parseFloat(locationInfo.latitude.toFixed(3)),
        },
      );
      if (response.data.comments) {
        setComments(response.data.comments);
      } else {
        setComments([]);
      }
      if (response.data.accessibility) {
        setSurveyInfo(response.data.accessibility);
        setAvailableModalData(true);
      } else {
        setSurveyInfo({});
      }
    } catch (error) {
      setErrorMessage('There is a problem in connecting to the server to fetch comments...');
      setViewCommentsPopUp(false);
      setViewErrorPopUp(true);
    }
  };

  const handleViewComments = () => {
    fetchLocationInfo();
  };

  const handleViewSurvey = () => {
    fetchLocationInfo();
  };

  const handleAddComment = () => {
    if (newComment === '') {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      const addComment = {
        username: userName,
        comment: newComment,
      };
      const commentsArray = [];
      commentsArray.push(addComment);
      setComments([...comments, addComment]);
      setNewComment('');
      const saveLongitude = parseFloat(locationInfo.longitude.toFixed(3));
      const saveLatitude = parseFloat(locationInfo.latitude.toFixed(3));
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/locations/save_location`,
          {
            locationName: locationInfo.name,
            longitude: saveLongitude,
            latitude: saveLatitude,
            comments: commentsArray,
          },
          config,
        ).catch(() => {
          setErrorMessage('Comment cannot be sent to database because of an server error! Later try again...');
          setViewCommentsPopUp(false);
          setViewErrorPopUp(true);
        });
    }
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
          className='search-bar'
          id="geocoder"
          style={{
            position: 'absolute',
            left: '1%',
            width: 'auto',
            zIndex: '10',
            backgroundColor: 'white',
            padding: '2px 3px',
            borderRadius: '15px',
            fontSize: '12px',
          }}
        />
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        {viewLocationPopUp && (
          <div
            className='location-pop-up'
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GiHearingDisabled style={{ fontSize: '2rem', color: 'red', marginLeft: '10px' }} />
                <FaLowVision style={{ fontSize: '2rem', color: 'blue' }} />
                <MdNotAccessible style={{ fontSize: '2rem', color: 'blue', marginLeft: '10px' }} />
                <img
                  src={CognitiveDisability}
                  alt="Cognitive Disability"
                  style={{
                    width: '2rem',
                    marginLeft: '10px',
                    border: '2px solid blue',
                    borderRadius: '60%',
                  }}
                />
              </div>
              <p style={{ marginBottom: '5px', fontSize: '1rem' }}>Appropriate for disability types:</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdOutlineAccessibleForward style={{ fontSize: '2rem', color: 'green' }} />
              </div>
            </div>

            <div>
              <Button onClick={() => { handleOpenModal(); fetchLocationInfo() }}>See details of accessibility...</Button>
              <Modal
                open={openModal}
                onClose={() => handleCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="location-pop-up-box" sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '1',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
                  maxHeight: '70%',
                  overflowY: 'auto',
                }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  {!availableModalData ? (
                    <div className="loading-bar">Loading...</div>
                  ) : (
                    <>
                      <div className="modal-card">
                        <div className="modal-row">
                          <img src={YellowBand} alt="Yellow Line" />
                          <p className='modal-first-survey-label'>Is there a yellow line?</p>
                          <div className="modal-button-container">
                            {surveyInfo.yellowLine.exists === true ? (
                              <button style={{ backgroundColor: "green", cursor: "default" }}>Yes</button>
                            ) : (
                              <>
                                {surveyInfo.yellowLine.pressedNo === 0 ? (
                                  <button style={{ backgroundColor: "orange", cursor: "default" }}>N/A</button>
                                ) : (
                                  <button style={{ backgroundColor: "red", cursor: "default" }}>No</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-row">
                          <p className='modal-first-survey-label'>
                            Number of Users: {surveyInfo.yellowLine.exists ? surveyInfo.yellowLine.pressedYes : (surveyInfo.yellowLine.pressedNo !== 0 ? surveyInfo.yellowLine.pressedNo : "N/A")}
                          </p>
                        </div>
                      </div>

                      <div className="modal-card">
                        <div className="modal-row">
                          <img src={Elevator} alt="Elevator" />
                          <p className='modal-first-survey-label'>Is there an elevator?</p>
                          <div className="modal-button-container">
                            {surveyInfo.elevator.exists === true ? (
                              <button style={{ backgroundColor: "green", cursor: "default" }}>Yes</button>
                            ) : (
                              <>
                                {surveyInfo.elevator.pressedNo === 0 ? (
                                  <button style={{ backgroundColor: "orange", cursor: "default" }}>N/A</button>
                                ) : (
                                  <button style={{ backgroundColor: "red", cursor: "default" }}>No</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-row">
                          <p className='modal-first-survey-label'>Number of Users: {surveyInfo.elevator.exists ? surveyInfo.elevator.pressedYes : surveyInfo.elevator.pressedNo}</p>
                        </div>
                      </div>

                      <div className="modal-card">
                        <div className="modal-row">
                          <img src={Ramp} alt="Ramp" />
                          <p className='modal-first-survey-label'>Is there a ramp?</p>
                          <div className="modal-button-container">
                            {surveyInfo.ramp.exists === true ? (
                              <button style={{ backgroundColor: "green", cursor: "default" }}>Yes</button>
                            ) : (
                              <>
                                {surveyInfo.ramp.pressedNo === 0 ? (
                                  <button style={{ backgroundColor: "orange", cursor: "default" }}>N/A</button>
                                ) : (
                                  <button style={{ backgroundColor: "red", cursor: "default" }}>No</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-row">
                          <p className='modal-first-survey-label'>Number of Users: {surveyInfo.ramp.exists ? surveyInfo.ramp.pressedYes : surveyInfo.ramp.pressedNo}</p>
                        </div>
                      </div>

                      <div className="modal-card">
                        <div className="modal-row">
                          <img src={Toilet} alt="Toilet" />
                          <p className='modal-first-survey-label'>Is there a toilet for people with disabilities?</p>
                          <div className="modal-button-container">
                            {surveyInfo.toilet.exists === true ? (
                              <button style={{ backgroundColor: "green", cursor: "default" }}>Yes</button>
                            ) : (
                              <>
                                {surveyInfo.toilet.pressedNo === 0 ? (
                                  <button style={{ backgroundColor: "orange", cursor: "default" }}>N/A</button>
                                ) : (
                                  <button style={{ backgroundColor: "red", cursor: "default" }}>No</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-row">
                          <p className='modal-first-survey-label'>Number of Users: {surveyInfo.toilet.exists ? surveyInfo.toilet.pressedYes : surveyInfo.toilet.pressedNo}</p>
                        </div>
                      </div>

                      <div className="modal-card">
                        <div className="modal-row">
                          <img src={SignLanguage} alt="Sign Language" />
                          <p className='modal-first-survey-label'>Anyone here know sign language?</p>
                          <div className="modal-button-container">
                            {surveyInfo.signLanguage.exists === true ? (
                              <button style={{ backgroundColor: "green", cursor: "default" }}>Yes</button>
                            ) : (
                              <>
                                {surveyInfo.signLanguage.pressedNo === 0 ? (
                                  <button style={{ backgroundColor: "orange", cursor: "default" }}>N/A</button>
                                ) : (
                                  <button style={{ backgroundColor: "red", cursor: "default" }}>No</button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-row">
                          <p className='modal-first-survey-label'>Number of Users: {surveyInfo.signLanguage.exists ? surveyInfo.signLanguage.pressedYes : surveyInfo.signLanguage.pressedNo}</p>
                        </div>
                      </div>
                    </>
                  )}
                </Box>
              </Modal>
            </div>

            <div className="mt-5" style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => { setViewLocationPopUp(null); setSurveyPopUpInfo(true); handleViewSurvey(); fetchLocationInfo(); }}
                style={{
                  backgroundColor: userInfo ? currentColor : 'lightgray',
                  color: 'white',
                  borderRadius: '10px',
                  cursor: userInfo ? 'pointer' : 'not-allowed',
                  opacity: userInfo ? 1 : 0.6,
                }}
                className=" text-undefined p-2 w-full hover:drop-shadow-xl hover:bg-undefined"
                disabled={!userInfo}
              >
                Fill the location survey
              </button>

              <button
                type="button"
                onClick={() => { setViewLocationPopUp(null); setViewCommentsPopUp(true); handleViewComments(); }}
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
            className="survey-pop-up"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
              maxHeight: '70%',
              overflowY: 'auto',
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

            <SurveyComponent
              config={config}
              latitude={locationInfo.latitude}
              locationName={locationInfo.name}
              longitude={locationInfo.longitude}
              surveyInfo={surveyInfo}
              userDisability={disabilityType}
            />

          </div>
        )}
        {viewCommentsPopUp && (
          <div
            className="comments-pop-up"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
              maxHeight: '70%',
              overflowY: 'auto',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <button
                type="button"
                onClick={() => { setViewCommentsPopUp(null); setViewLocationPopUp(locationInfo); }}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <IoArrowBackCircleOutline />
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setViewCommentsPopUp(null)}
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
                      <span className="comment-username">{comment.username}</span>
                      <p className="comment-text">{comment.comment}</p>
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
                {showErrorMessage && <p style={{ color: 'red' }}>Empty comments cannot be sent.</p>}
              </div>
            )}
          </div>
        )}
        {viewErrorPopUp && (
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
              width: '50%',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setViewErrorPopUp(null)}
                style={{ backgroundColor: 'transparent', color: 'rgb(153, 171, 180)', border: 'none', cursor: 'pointer' }}
              >
                <MdOutlineCancel />
              </button>
            </div>
            <div>
              <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{errorMessage}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
