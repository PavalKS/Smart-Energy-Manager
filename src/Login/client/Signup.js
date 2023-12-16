import React, { useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom";

function Signup() {
  //const history = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[room, setRoom] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/Signup', {
      Name: name,
      Phone: phone,
      Email: email,
      Room: room,
      Password: password,
      User: userType
    })
    .then(result => {
      console.log(result);
      window.alert("Sucessfully Signed Up, Please Login");
    })
    .catch(err => {
      console.log(err);
      window.alert("An error occurred during SignUp");
    })
  }
  

  return (
    <div className="login col-4">
      <h1 className="display-3">Signup</h1> 
      <br></br>
      <form onSubmit={handleSubmit}>
        <input type="name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <br></br>
        <input type="phone" className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
        <br></br>
        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br></br>
        <input type="room" className="form-control" onChange={(e) => setRoom(e.target.value)} placeholder="Room Number" />
        <br></br>
        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br></br>
        <select className="form-select" value={userType} onChange={(e) => setUserType(e.target.value)} placeholder="User Type">
          <option value="temp">Temporary User</option>
          <option value="admin">Admin User</option>
          <option value="emergency">Emergency User</option>
          <option value="energy">Energy Advisor</option>
        </select>
        <br></br>
        <input type="submit" className="form-control" value="Submit" />
      </form>
      <br />
      <p>Already have an account ?</p>
      <br />
      <Link to="/Login">Login Page</Link>
    </div>
  );
}

export default Signup;
