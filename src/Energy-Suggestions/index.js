import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertPage = () => {
  const [highConsumptionDevices, setHighConsumptionDevices] = useState([]);
  const [SuggestionData, setSuggestionData] = useState(null);

  useEffect(() => {
    // Retrieve stored data from local storage
    const storedData = JSON.parse(localStorage.getItem('energyConsumptionData'));
    if (storedData) {
      const devicesWithHighConsumption = storedData.filter(device => {
        let averageConsumption = 0;
        let deviceTypeMessage = '';
        switch (device['Device Type']) {
          case 'Lighting':
            averageConsumption = 0.05; // Normal average for lighting
            deviceTypeMessage = 'lighting consumption is 30% more than the average, please turn off if not in use';
            break;
          case 'Air Conditioner':
            averageConsumption = 3.5; // Normal average for AC
            break;
          case 'Television':
            averageConsumption = 0.1; // Normal average for TV
            break;
          case 'Refrigerator':
            averageConsumption = 0.06; // Normal average for refrigerator
            break;
          default:
            averageConsumption = 1.0; // Set a default value if needed
            break;
        }
        const totalConsumption = device['Energy Data'].reduce((acc, val) => acc + parseFloat(val), 0);
        const averageDeviceConsumption = averageConsumption * device['Energy Data'].length;
        const consumptionPercentage = (totalConsumption / averageDeviceConsumption) * 100;
        const exceedsThreshold = consumptionPercentage >= 130;
        return exceedsThreshold ? { ...device, deviceTypeMessage } : null;
      }).filter(Boolean);
      setHighConsumptionDevices(devicesWithHighConsumption);
    }

    axios.get('http://localhost:3001/Suggestion-Provider-Getter')
    .then(response => {
      setSuggestionData(response.data);
    })
    .catch(error => {
      console.log('Error fetching data');
    });
  }, []);
    
  return (
    <div>
      <h1 class="display-3 px-3 py-3">Energy Suggestions</h1>
      <br></br>
      <h2 class="display-4 px-3 py-3">High Energy Consumption Devices:</h2>
      <div className="device-groups px-3 py-3">
        {highConsumptionDevices.map((device, index) => (
          <div key={index} className="card text-white bg-dark px-3 py-3 mb-3">
            <div>
              <strong>Device Type:</strong> {device['Device Type']} <br />
              <strong>Device ID:</strong> {device['Device ID']} <br />
              <strong>Energy Data (% of average):</strong>{' '}
              {(
                (parseFloat(device['Energy Data'][device['Energy Data'].length - 1]) /
                  (device['Energy Data'].length * 0.05)) *
                100
              ).toFixed(2)}
              % <br />
              <strong>Message:</strong> {device.deviceTypeMessage} <br />
              {device['Energy Data'].some((val) => parseFloat(val) > 0) ? (
                <span style={{ color: 'red' }}>Consider turning off when not in use</span>
              ) : (
                <span style={{ color: 'green' }}>Currently not consuming energy</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <br></br>
      
      <h2 className="display-4 px-3 py-3">Suggestions from Energy Advisor:</h2>
      {SuggestionData && SuggestionData.length > 0 ? (
        <div>
          <br></br>
          {SuggestionData.map((suggestion, index) => (
            <div key={index} className="card text-white bg-dark px-3 py-3 mb-3">
              <strong>Suggestion Details:</strong> {suggestion.Suggestion} <br />
            </div>
          ))}
        </div>
      ) : (
        <div className='card text-white bg-dark px-3 py-3 mb-3'>
          No energy suggestions available!
        </div>
      )}

    </div>
  );
};

export default AlertPage;
