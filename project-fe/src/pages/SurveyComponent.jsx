import React, { useState, useEffect } from 'react';
import './SurveyComponent.css';
import YellowBand from '../icons/yellow_band.jpg';
import Elevator from '../icons/elevator.jpg';
import Ramp from '../icons/ramp.png';
import Toilet from '../icons/engellitoilet.webp';
import SignLanguage from '../icons/signlanguage.png';

const SurveyComponent = ({ userDisability }) => {
  console.log(userDisability)
  const surveyData = {
    "None": {
      title: "No impairment",
      elements: [{}],
    },
    "Hearing": {
      title: "Hearing Impairment",
      elements: [
        {
          type: "rating",
          name: "question1",
          title: "How accessible were vending machines in the venue for individuals with hearing impairments? Consider factors such as visual cues, text instructions, or any other accessibility features. (1 for least accessible, 5 for most accessible)\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question2",
          title: "Evaluate the prevention measures in parking lots concerning safety for individuals with hearing impairments. Were there visual alerts or accessible communication options related to parking lot safety?",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "rating",
          name: "question3",
          title: "How would you rate the availability and effectiveness of communication options (e.g., sign language interpreters, captioning) at this venue?",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question4",
          title: "Did you face any problems in terms of communication?",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question5",
          title: "Do you find visual indicators or notifications for important announcements at this venue helpful?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question6",
          title: "Were the staff members aware of your hearing impairment, and did they make an effort to assist you accordingly?",
          labelTrue: "Yes",
          labelFalse: "No"
        }
      ]
    },
    "Blindness": {
      title: "Visual Impairment",
      elements: [
        {
          type: "rating",
          name: "question1",
          title: "How would you rate the availability and effectiveness of wayfinding assistance for individuals with visual impairments within this venue?\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question2",
          title: "Did you encounter any Braille information or tactile maps that assisted you in navigating the venue?",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question3",
          title: "Were there audio guides or verbal descriptions available to provide information about exhibits, displays, or key areas within the venue?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question4",
          title: "Did the staff demonstrate awareness and offer assistance to individuals with visual impairments?",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question5",
          title: "Assess the accessibility of restrooms for individuals with visual impairments. Were they easy to locate and navigate?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "rating",
          name: "question6",
          title: "How accessible were menus and other informational materials? (Consider alternative formats, such as large print or electronic versions)",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question7",
          title: "Were there designated and easily accessible seating areas for individuals with visual impairments?",
          labelTrue: "Yes",
          labelFalse: "No"
        }
      ]
    },
    "Mobility": {
      title: "Mobility Impairment",
      elements: [
        {
          type: "rating",
          name: "question14",
          title: "How would you rate the accessibility of the entrance for individuals with mobility impairments, considering factors like ramps, slopes, and door width?\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question15",
          title: "Were elevators available, and if so, how functional and accessible were they for individuals with mobility impairments?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question16",
          title: "Assess the accessibility of restrooms for individuals with mobility impairments. Were there features such as grab bars and adequate space for maneuverability?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "rating",
          name: "question17",
          title: "Evaluate the accessibility of parking facilities, considering the availability of designated accessible parking spaces and proximity to the venue entrance.",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "rating",
          name: "question18",
          title: "Evaluate the quality and usability of ramps within the venue. Did they provide smooth and safe access for individuals with mobility impairments?\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question19",
          title: "Was there any handrail for the ramp?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "rating",
          name: "question20",
          title: "If applicable, how accessible was public transportation to and from the venue for individuals with mobility impairments?\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        }
      ]
    },
    "Cognitive": {
      title: "Cognitive Impairment",
      elements: [
        {
          type: "boolean",
          name: "question21",
          title: "How easy was it to understand and follow signage within the venue? Were signs clear and straightforward for individuals with cognitive impairments?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question22",
          title: "Were the informational materials like menus or guides designed to be easily understandable, with clear descriptions and possibly images to aid individuals with cognitive impairments?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "boolean",
          name: "question23",
          title: "How did the staff communicate? Did they use a clear and understandable communication style that would be helpful for individuals with cognitive impairments?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        },
        {
          type: "rating",
          name: "question24",
          title: "Were there designated sensory rooms or quiet spaces within the venue? How well did these areas cater to individuals with cognitive impairments who may need a break?\r\n",
          minRateDescription: "Least accessible",
          maxRateDescription: "Most accessible",
          rateValues: [1, 2, 3, 4, 5]
        },
        {
          type: "boolean",
          name: "question25",
          title: "Did the noise level within the venue impact your ability to concentrate and navigate?\r\n",
          labelTrue: "Yes",
          labelFalse: "No"
        }
      ]
    }
  };

  const currentSurveyData = surveyData[userDisability];
  const [formData, setFormData] = useState(
    currentSurveyData.elements.reduce((acc, curr) => {
      acc[curr.name] = curr.type === 'rating' ? 1 : false;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (currentSurveyData) {
      console.log(currentSurveyData)
      const initialFormData = currentSurveyData.elements.reduce((acc, curr) => {
        acc[curr.name] = curr.type === 'rating' ? 1 : false;
        return acc;
      }, {});
      setFormData(initialFormData);
      console.log(initialFormData);
    }
  }, [userDisability]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'rating':
        return (
          <div key={question.name} className="survey-question">
            <label className="survey-label">{index + 1}. {question.title}</label>
            <div className="survey-rating-options">
              {question.rateValues.map((value) => (
                <label key={value} className="survey-rating-option">
                  <input
                    type="radio"
                    name={question.name}
                    value={value}
                    checked={formData[question.name] === value}
                    onChange={() => handleChange({ target: { name: question.name, value } })}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        );
      case 'boolean':
        return (
          <div key={question.name} className="survey-question">
            <label className="survey-label">{index + 1}. {question.title}</label>
            <div className="survey-boolean-options">
              <label className="survey-boolean-option">
                <input
                  type="radio"
                  name={question.name}
                  value={true}
                  checked={formData[question.name] === true}
                  onChange={() => handleChange({ target: { name: question.name, value: true } })}
                />
                {question.labelTrue}
              </label>
              <label className="survey-boolean-option">
                <input
                  type="radio"
                  name={question.name}
                  value={false}
                  checked={formData[question.name] === false}
                  onChange={() => handleChange({ target: { name: question.name, value: false } })}
                />
                {question.labelFalse}
              </label>
            </div>
          </div>


        );
      default:
        return null;
    }
  };

  if (!currentSurveyData) {
    return null;
  }

  return (
    <div className="survey-container">
      <h2 className="survey-title">We value your feedback</h2>
      <div class="card">
        <img src={YellowBand} alt="Yellow Line" />
        <p class='first-survey-label'>Is there a yellow line?</p>
        <div class="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      <div class="card">
        <img src={Elevator} alt="Elevator" />
        <p class='first-survey-label'>Is there an elevator?</p>
        <div class="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      <div class="card">
        <img src={Ramp} alt="Ramp" />
        <p class='first-survey-label'>Is there a ramp?</p>
        <div class="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      <div class="card">
        <img src={Toilet} alt="Rampa" />
        <p class='first-survey-label'>Is there a toilet for people in wheelchair?</p>
        <div class="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      <div class="card">
        <img src={SignLanguage} alt="Rampa" />
        <p class='first-survey-label'>Anyone here know sign language?</p>
        <div class="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>

      {userDisability === 'None' && (
        <form onSubmit={handleSubmit} className="survey-form" style={{ marginTop: "1vmin" }}>
          <button type="submit" className="survey-submit">Submit</button>
        </form>
      )}

      {userDisability !== 'None' && (
        <form onSubmit={handleSubmit} className="survey-form">
          {currentSurveyData.elements.map((question, index) => renderQuestion(question, index))}
          <button type="submit" className="survey-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SurveyComponent;
