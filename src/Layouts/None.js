import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbarr from '../nav'; // Import your navigation 
import HomePage from '../HomePage';
import Dashboard from '../DashBoard';
import Login from '../Login/client/Login';
import Signup from '../Login/client/Signup';
import Emergency from '../Emergency';
import Profile from '../Profile';
import DeviceControl from '../DeviceControl';
import EnergySuggestions from '../Energy-Suggestions';
import EmergencyResponse from '../Emergency-Response';

function generateRoutes(userType) {
  switch (userType) {
    case 'admin':
      return (
        <>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Emergency" element={<Emergency />} />
            <Route path="/Profile" element={<Profile />} />
        </>
      );
    case 'temp':
      return (
        <>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Emergency" element={<Emergency />} />
          <Route path="/DeviceControl" element={<DeviceControl/>}/>
          <Route path="/Energy-Suggestions" element={<EnergySuggestions/>}/>
        </>
      );
    case 'emergency':
    return (
        <>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Emergency" element={<Emergency />} />
        <Route path="/Emergency-Response" element={<EmergencyResponse/>}/>
        <Route path="/DeviceControl" element={<DeviceControl/>}/>
        <Route path="/Energy-Suggestions" element={<EnergySuggestions/>}/>
        </>
    );
    case 'energy':
        return (
            <>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/DeviceControl" element={<DeviceControl/>}/>
            <Route path="/Energy-Suggestions" element={<EnergySuggestions/>}/>
            </>
        );
    case null:
        return (
            <>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            </>
        );
    
    // Add more cases for other user types
    default:
      return (
        <>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
        </>
      );
  }
}
function MainLayout({ userType }) {
  const routes = generateRoutes(userType);

  return (
    <BrowserRouter>
      <div className='container' style={{ marginLeft: '-10px' }}>
        <div className="row pt-3">
          <div className="col-3">
            <Navbarr active="Home" />
          </div>
          <div className="col-9 pt-3" style={{ position: 'relative' }}>
            <Routes>{routes}</Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default MainLayout;
