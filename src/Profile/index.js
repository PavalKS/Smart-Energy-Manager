import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const [userData, setUserData] = useState(null);
  const[name, setName] = useState('')
  const[room, setRoom] = useState('');
  const[age, setAge] = useState('');
  const[sex, setSex] = useState('');
  const[address, setAddress] = useState('');
  const[medicalCondition, setMedicalCondition] = useState('');
  const[medications, setMedications] = useState('');
  const[bloodGroup, setBloodGroup] = useState('');
  const[emergencyContact, setEmergencyContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Profile', {
      Name: name,
      Room: room,
      Age: age,
      Sex: sex,
      Address: address,
      MedicalCondition: medicalCondition,
      Medications: medications,
      BloodGroup: bloodGroup,
      EmergencyContact: emergencyContact
    })
      .then(result => {
        console.log(result);
        window.alert("Medical Information Added Successfully");
      })
      .catch(err => {
        console.error(err);
        window.alert("An error occurred");
      });
  };
  

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    axios.get(`http://localhost:3001/users/${loggedInUser}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error.message);
      });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    navigate('/HomePage'); 
  };

  return (
    <div>
        <h1 className="display-1 pt-3">Profile Information</h1>
        {userData ? (
          <div className="container">
            <div className='card text-white bg-dark px-3 py-4'>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ marginRight: '10px' }}>Name:</h2>
                <h3>{userData.Name}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ marginRight: '10px' }}>Email:</h2>
                <h3>{userData.Email}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ marginRight: '10px' }}>Phone:</h2>
                <h3>{userData.Phone}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '10px' }}>Room:</h2>
                <h3>{userData.Room}</h3>
              </div>
              <br></br>
              <button className="btn btn-secondary" style={{ width: '10%' }} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

      <br></br>
      <h2 class="display-1 pt-3">Add Emergency Medical information:</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input type= "name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"></input>
        <br></br>
        <input type= "room" className="form-control" onChange={(e) => setRoom(e.target.value)} placeholder="Room Number"></input>
        <br></br>
        <input type= "age" className="form-control" onChange={(e) => setAge(e.target.value)} placeholder="Age"></input>
        <br></br>
        <input type= "sex" className="form-control" onChange={(e) => setSex(e.target.value)} placeholder="Sex"></input>
        <br></br>
        <input type= "address" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address"></input>
        <br></br>
        <input type= "medicalCondition" className="form-control" onChange={(e) => setMedicalCondition(e.target.value)} placeholder="Medical Conditions (If any)"></input>
        <br></br>
        <input type= "medications" className="form-control" onChange={(e) => setMedications(e.target.value)} placeholder="Medications (If any)"></input>
        <br></br>
        <input type= "bloodGroup" className="form-control" onChange={(e) => setBloodGroup(e.target.value)} placeholder="Blood Group"></input>
        <br></br>
        <input type= "emergencyContact" className="form-control" onChange={(e) => setEmergencyContact(e.target.value)} placeholder="Emergency Contact Information"></input>
        <br></br>
        <input type="submit" className="form-control" value="Submit"></input>
      </form>
    </div>
  );
}
export default Profile;
