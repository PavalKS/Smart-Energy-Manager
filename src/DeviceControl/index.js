import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceControl = () => {
  const initialDeviceStates = {
    tv: false,
    light: false,
    fridge: false,
    ac: false,
  };

  const [deviceStates, setDeviceStates] = useState(
    JSON.parse(sessionStorage.getItem('deviceStates')) || initialDeviceStates
  );

  const [devices, setDevices] = useState([]);  
  //const roomNumber = sessionStorage.getItem('roomNumber');
  const roomNumber="1";
  //const roomNumber = sessionStorage.getItem('roomNumber'); // Get room number from sessionStorage
  console.log("room number",roomNumber);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/deviceinfo/${roomNumber}`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (roomNumber) {
      fetchDevices();
    }
  }, [roomNumber]);

  const toggleDevice = async (device) => {
    try {
      const response = await axios.put(`http://localhost:3001/devices/${device}`, {
        state: !deviceStates[device],
      });

      if (response.status === 200) {
        setDeviceStates({ ...deviceStates, [device]: !deviceStates[device] });
        console.log(`Device ${device} toggled successfully!`);
      } else {
        console.error(`Failed to toggle device ${device}.`);
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  const getButtonLabel = (device) => {
    return deviceStates[device] ? 'Off' : 'On';
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 display-3">Device Control</h1>
      <br></br>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">TV</h5>
              <br></br>
              <button className="btn btn-primary" onClick={() => toggleDevice('tv')}>
                <i className="bi bi-tv"></i> {getButtonLabel('tv')}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">AC</h5>
              <br></br>
              <button className="btn btn-primary" onClick={() => toggleDevice('ac')}>
              <i class="bi bi-fan"></i> {getButtonLabel('ac')}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Light</h5>
              <br></br>
              <button className="btn btn-primary" onClick={() => toggleDevice('light')}>
                <i className="bi bi-lamp"></i> {getButtonLabel('light')}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h5 className="card-title">Fridge</h5>
              <br></br>
              <button className="btn btn-primary" onClick={() => toggleDevice('fridge')}>
                  <i class="bi bi-building"></i> {getButtonLabel('fridge')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="display-3">Devices in Room {roomNumber}</h1>
      <br></br>
      <ul>
        {devices.map((device, index) => (
          <div>
          <div key={index} className="card bg-dark text-white px-3 py-3">
            <h3>Device Name: {device.DeviceName}</h3>
            <br />
            <h3>Room Number: {device.RoomNumber}</h3>
          </div>
          <br></br>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DeviceControl;
