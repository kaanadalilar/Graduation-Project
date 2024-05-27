import React, { useState } from 'react';
import './SurveyComponent.css';
import YellowLine from '../icons/engelliyolu.jpg'
import Asansor from '../icons/elevator.jpg'
import Rampa from '../icons/rampa.png'
const surveyForDisabilityType = {
    "elements": [
        {
            "type": "rating",
            "name": "question1",
            "title": "How accessible were vending machines in the venue for individuals with hearing impairments? Consider factors such as visual cues, text instructions, or any other accessibility features. (1 for least accessible, 5 for most accessible)\r\n",
            "minRateDescription": "Least accessible",
            "maxRateDescription": "Most accessible",
            "rateValues": [1, 2, 3, 4, 5]
        },
        {
            "type": "boolean",
            "name": "question2",
            "title": "Evaluate the prevention measures in parking lots concerning safety for individuals with hearing impairments. Were there visual alerts or accessible communication options related to parking lot safety?",
            "labelTrue": "Yes",
            "labelFalse": "No"
        },
        {
            "type": "rating",
            "name": "question3",
            "title": "How would you rate the availability and effectiveness of communication options (e.g., sign language interpreters, captioning) at this venue?",
            "rateValues": [1, 2, 3, 4, 5]
        },
        {
            "type": "boolean",
            "name": "question4",
            "title": "Did you face any problems in terms of communication?",
            "labelTrue": "Yes",
            "labelFalse": "No"
        },
        {
            "type": "boolean",
            "name": "question5",
            "title": "Do you find visual indicators or notifications for important announcements at this venue helpful?\r\n",
            "labelTrue": "Yes",
            "labelFalse": "No"
        },
        {
            "type": "boolean",
            "name": "question6",
            "title": "Were the staff members aware of your hearing impairment, and did they make an effort to assist you accordingly?",
            "labelTrue": "Yes",
            "labelFalse": "No"
        }
    ]
};

const SurveyComponent = () => {
    const [formData, setFormData] = useState(
        surveyForDisabilityType.elements.reduce((acc, curr) => {
            acc[curr.name] = curr.type === 'rating' ? 1 : false;
            return acc;
        }, {})
    );

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? e.target.checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
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

    return (
        <div className="survey-container">
         <h2 className="survey-title">We value your feedback</h2>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', padding: '10px', borderRadius: '10px', marginTop: '20px', textAlign: 'center' }}>
              <img src={YellowLine} alt="Yellow Line" style={{ maxWidth: '100px', marginRight: '10px' }} />
              <p style={{ fontSize: '1rem', marginRight: '10px' }}>Is there a yellow line?</p>
                 <div>
                    <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '10px' }}>Yes</button>
                    <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>No</button>
                 </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', padding: '10px', borderRadius: '10px', marginTop: '20px', textAlign: 'center' }}>
              <img src={Asansor} alt="Elevator" style={{ maxWidth: '100px', marginRight: '10px' }} />
              <p style={{ fontSize: '1rem', marginRight: '10px' }}>Is there an elevator?</p>
                 <div>
                    <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '10px' }}>Yes</button>
                    <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>No</button>
                 </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', padding: '10px', borderRadius: '10px', marginTop: '20px', textAlign: 'center' }}>
                <img src={Rampa} alt="Rampa" style={{ maxWidth: '100px', marginRight: '10px' }} />
                <p style={{ fontSize: '1rem', marginRight: '10px' }}>Is there a rampa?</p>
                <div>
                    <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '10px' }}>Yes</button>
                    <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>No</button>
                 </div>
                </div>
            <form onSubmit={handleSubmit} className="survey-form">
                {surveyForDisabilityType.elements.map((question, index) => renderQuestion(question, index))}
                <button type="submit" className="survey-submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyComponent;
