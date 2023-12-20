import React, { useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom";

function DeviceRegistration() {
  //const history = useNavigate();
  const [name, setName] = useState('');
  const [room, setRoom]= useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/DeviceRegistration', {
        DeviceName: name,
        RoomNumber: room
    })
    .then(result => {
      console.log(result);
      window.alert("Sucessfully Registered");
    })
    .catch(err => {
      console.log(err);
      window.alert("An error occurred");
    })
  }
  

  return (
    <div className="login">
      <h1 className="display-3">Device Registration</h1> 
      <br></br>
      <form onSubmit={handleSubmit} className="col-4">
        <input type="name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Device Name" />
        <br></br>
        <input type="room" className="form-control" onChange={(e) => setRoom(e.target.value)} placeholder="Room Number" />
        <br></br>
        <input type="submit" className="form-control" value="Submit" />
      </form>
      <br />
    </div>
  );
}

export default DeviceRegistration;
