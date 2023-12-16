import React, { useState } from 'react';
import axios from 'axios';

const EmergencyResponse = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [emergencyInfo, setEmergencyInfo] = useState('');
  const [showEscapeRoute, setShowEscapeRoute] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');  

  const handleEmergencyTypeChange = (e) => {
    setEmergencyType(e.target.value);
  };

  const handleEmergencyInfoChange = (e) => {
    setEmergencyInfo(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
   setRoomNumber(e.target.value);
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/Emergency",{
    EmergencyType:emergencyType, 
    BasicInfo: emergencyInfo, 
    Room: roomNumber,
    Remarks: "",
    Resolved: false
  })
  const emergencyData = {
    emergencyType,
    emergencyInfo,
    roomNumber,
  };
  localStorage.setItem('emergencyData', JSON.stringify(emergencyData));
  console.log('Emergency Type:', emergencyType);
  console.log('Emergency Information:', emergencyInfo);
  console.log('Room Number:', roomNumber);
  setShowEscapeRoute(true);
};

const getEmergencyNumber = () => {
  if (emergencyType === 'medical') {
    return 'tel:108'; // Ambulance - 108
  } else if (emergencyType === 'fire') {
    return 'tel:101'; // Firestation - 101
  } else {
    return 'tel:100'; // Police - 100
  }
};

  return (
    <div className="container">
      <h1 class="display-4">Emergency Response Information</h1>
      <br></br>
      <div className='card text-white bg-dark px-3 py-3'>
      <form onSubmit={handleSubmit}>
        <div className="row" pt-2>
          <div className="col-md-6">
            <div className="form-label pt-2 pb-2">
              <h2>Type of Emergency:</h2>
            </div>
          </div>

          <div className="col-md-6 pt-2">
            <div className="form-label pt-2 pb-2">
              <select
                className="form-select bg-dark text-light"
                value={emergencyType}
                onChange={handleEmergencyTypeChange}
              >
                <option value="">Select Type</option>
                <option value="medical">Medical</option>
                <option value="fire">Fire</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <br />

        <div className="row" pt-2>
          <div className="col-md-6">
            <div className="form-label pt-2 pb-2">
              <h2>Basic Emergency Information:</h2>
            </div>
          </div>

          <div className="col-md-6 pt-2">
            <div className="form-label pt-2 pb-2">
            <textarea
                className="form-control bg-dark text-light"
                value={emergencyInfo}
                onChange={handleEmergencyInfoChange}
                rows={4}
                cols={50}
              />
            </div>
          </div>
        </div>

        <div className="row pt-2">
          <div className="col-md-6">
            <div className="form-label pt-2 pb-2">
              <h2>Room Number:</h2>
            </div>
          </div>
          <div className="col-md-6 pt-2">
            <div className="form-label pt-2 pb-2">
              <input
                type="text"
                className="form-control bg-dark text-light"
                value={roomNumber}
                onChange={handleRoomNumberChange}
              />
            </div>
          </div>
        </div>
        <br />

        <br />
        <button type="submit pt-4 pb-4 pl-4 pr-4" class="btn btn-danger">SUBMIT</button>
      </form>
      </div>

      <br></br>

      <div className='card text-white bg-dark px-3 py-3'>
        <div className="mt-4">
          <h2>Local Authorities Contact Information:</h2>
          <ul>
            <li>NATIONAL EMERGENCY NUMBER: 112</li>
            <li>POLICE: 100 or 112</li>
            <li>FIRE: 101</li>
            <li>AMBULANCE: 108</li>
          </ul>
        </div>
      </div>

      <br></br>

      <div className='card text-white bg-dark px-3 py-3'>
        {showEscapeRoute && (
          <div>
            <h2>Escape Route</h2>
            <img src={process.env.PUBLIC_URL + '/floorplan.jpg'} alt="Floor Plan" className="img-fluid rounded" style={{ marginTop: '20px' }}/>
            <h3 style={{ marginTop: '20px' }}>Please call emergency services using the button below</h3>
            <section>
              <a href={getEmergencyNumber()} className="btn btn-success" style={{ marginTop: '20px' }}>Call Emergency Services</a>
            </section>
          </div>
        )}
      </div>

    </div>
  );
};

export default EmergencyResponse;


