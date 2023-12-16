import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmergencyResponse = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [resolvedStates, setResolvedStates] = useState([]);
  const [medicalDetails, setMedicalDetails] = useState([]);

  useEffect(() => {
    // Fetch unresolved emergencies
    axios.get('http://localhost:3001/EmergencyResponse')
      .then(response => {
        const initialResolvedStates = response.data.map(() => false);
        setResolvedStates(initialResolvedStates);

        const unresolvedEmergencies = response.data.filter((emergency, index) => !initialResolvedStates[index]);
        setEmergencies(unresolvedEmergencies);
      })
      .catch(error => {
        console.log('Error fetching emergency data');
      });

    // Fetch medical details
    axios.get('http://localhost:3001/MedicalDetails')
      .then(response => {
        setMedicalDetails(response.data);
      })
      .catch(error => {
        console.log('Error fetching medical details');
      });
  }, []);

  const handleResolve = (index) => {
    const updatedResolvedStates = [...resolvedStates];
    updatedResolvedStates[index] = !updatedResolvedStates[index];
    setResolvedStates(updatedResolvedStates);
  
    const emergencyId = emergencies[index]._id;  
    axios.delete(`http://localhost:3001/EmergencyResponse/${emergencyId}`)
      .then(response => {
        window.alert("Emergency Resolved Successfully and Deleted")
        console.log('Emergency resolved and deleted successfully');
        const updatedEmergencies = emergencies.filter((_, idx) => idx !== index);
        setEmergencies(updatedEmergencies);
      })
      .catch(error => {
        console.error('Error resolving emergency:', error);
      });
  };

  return (
    <div>
      <h1 className="display-3 px-3 py-3">Emergency Response</h1>
      {emergencies.length > 0 ? (
        <div>
          <div className='card text-white bg-dark px-3 py-3'>
            <h1 className="display-4">List of Emergencies:</h1>
          </div>
          <br></br>
          {emergencies.map((emergency, index) => (
            <div key={index} className="card text-white bg-dark px-3 py-3 mb-3">
              {!resolvedStates[index] && (
                <div>
                  <div className="row">
                    <div className="col">
                      <h4 className="mb-1">Emergency Type:</h4>
                      <p className="lead">{emergency.EmergencyType}</p>
                    </div>
                    <div className="col">
                      <h4 className="mb-1">Basic Info:</h4>
                      <p className="lead">{emergency.BasicInfo}</p>
                    </div>
                    <div className="col">
                      <h4 className="mb-1">Room:</h4>
                      <p className="lead">{emergency.Room}</p>
                    </div>
                    <button className="col btn btn-danger" style={{ width: '25%', marginRight: '20px' }} onClick={() => handleResolve(index)}>
                      Resolve Emergency
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <h1 className="display-3 px-3 py-3">Medical Details: </h1>
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Address</th>
                  <th>Medical Conditions</th>
                  <th>Medications</th>
                  <th>Blood Group</th>
                  <th>Emergency Contact</th>
                </tr>
              </thead>
              <tbody>
                {medicalDetails.map((detail, idx) => (
                  <tr key={idx}>
                    <td>{detail.Name}</td>
                    <td>{detail.Age}</td>
                    <td>{detail.Sex}</td>
                    <td>{detail.Address}</td>
                    <td>{detail.MedicalCondition}</td>
                    <td>{detail.Medications}</td>
                    <td>{detail.BloodGroup}</td>
                    <td>{detail.EmergencyContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1>No unresolved emergencies available</h1>
      )}
    </div>
  );
};

export default EmergencyResponse;
