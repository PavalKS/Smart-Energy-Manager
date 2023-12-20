import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'; // Import axios for API requests
import Dashboard from './DashBoard';
import HomePage from './HomePage';
import Emergency from './Emergency';
import Navbarr from './nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';
import DeviceControl from './DeviceControl';
import EnergySuggestions from './Energy-Suggestions';
import EmergencyResponse from './Emergency-Response';
import Login from "./Login/client/Login";
import Signup from "./Login/client/Signup";
import DashboardAdmin from './DashBoard-Admin';
import SuggestionProvider from './Suggestion-Provider/provider';
import BillingPage from './Billing';
import UserManagement from './UserManagement';
import DeviceRegistration from './DeviceRegistration';

function App() {
  const [userData, setUserData] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      axios.get(`http://localhost:3001/users/${loggedInUser}`)
        .then(response => {
          setUserData(response.data);
          setUserType(response.data.User); // Set the userType after fetching user data
        })
        .catch(error => {
          console.error("Error fetching user data:", error.message);
        });
    }
  }, []);

  const handleLogin = (loggedInUserData) => {
    setUserData(loggedInUserData);
    setUserType(loggedInUserData.User);
  };

  return (
    <BrowserRouter>
      <div className='container' style={{ "marginLeft": "-10px" }}>
        <div className="row pt-3">
          <div className="col-3">
            <Navbarr userType={userData.User} />
          </div>
          <div className="col-9 pt-3" style={{ "position": "relative" }}>
            <Routes>
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Login" element={<Login onLogin={handleLogin} />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Emergency" element={<Emergency />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/DeviceControl" element={<DeviceControl />} />
              <Route path="/Energy-Suggestions" element={<EnergySuggestions />} />
              <Route path="/Emergency-Response" element={<EmergencyResponse />} />
              <Route path="/DashBoard-Admin" element={<DashboardAdmin />} />
              <Route path="/Suggestion-Provider" element={<SuggestionProvider/>}/>
              <Route path="/Billing" element={<BillingPage/>}/>
              <Route path="/UserManagement" element={<UserManagement/>}/>
              <Route path="/DeviceRegistration" element={<DeviceRegistration/>}/>            
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


/*
function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      axios.get(`http://localhost:3001/users/${loggedInUser}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error.message);
        });
    }
  }, []);
  const userType = null
  if (userData) {
    const userType = userData.User;
  }
  console.log(userType);

  return (
    <div>
      <MainLayout userType={userType} />
    </div>
  );
}*/
