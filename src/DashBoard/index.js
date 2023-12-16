import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [energyData, setEnergyData] = useState([]);
  const chartRefs = useRef([]);

  useEffect(() => {
    const generateDeviceData = () => {
      const deviceTypes = ['tv', 'light', 'fridge', 'ac'];
      const deviceData = [];

      // Retrieve stored device states from session storage
      const storedDeviceStates = JSON.parse(sessionStorage.getItem('deviceStates'));

      for (let i = 1; i <= 4; i++) {
        const deviceType = deviceTypes[i - 1];
        const deviceEnergyData = [];

        // Get current hour
        const currentHour = new Date().getHours();

        for (let hour = 0; hour < 24; hour++) {
          let energyConsumed = 0;

          // If the device is off, change the energy consumption of the current hour to 0
          if (storedDeviceStates && storedDeviceStates[deviceType.toLowerCase()] === false && hour === currentHour) {
            energyConsumed = 0;
          } else if (hour <= currentHour) {
            energyConsumed = (Math.random()).toFixed(2);
          }

          deviceEnergyData.push(energyConsumed);
        }

        deviceData.push({
          'Device Type': deviceType,
          'Device ID': i,
          'Energy Data': deviceEnergyData,
        });
      }
      return deviceData;
    };

    const simulatedData = generateDeviceData();
    setEnergyData(simulatedData);
  }, []);

  useEffect(() => {
    if (chartRefs.current && chartRefs.current.length > 0) {
      energyData.forEach((device, index) => {
        const ctx = chartRefs.current[index].getContext('2d');

        if (chartRefs.current[index].chartInstance) {
          chartRefs.current[index].chartInstance.destroy();
        }

        chartRefs.current[index].chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: new Date().getHours() + 1 }, (_, i) => `${i}:00`),
            datasets: [
              {
                label: `Device ${device['Device ID']} (${device['Device Type']})`,
                data: device['Energy Data'],
                borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: `Energy Consumption for Device ${device['Device ID']} (${device['Device Type']})`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Hour of Day',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Energy Consumed (kWh)',
                },
              },
            },
          },
        });
      });
    }
  }, [energyData]);

  return (
    <div>
      <h1 className="display-3">Dashboard</h1>
      <br></br>
      <div className='card text-white bg-dark px-3 py-3'>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {energyData.map((_, index) => (
            <div key={index} style={{ width: '48%', marginBottom: '20px' }}>
              <h3>Device {energyData[index]['Device ID']} - {energyData[index]['Device Type']}</h3>
              <canvas ref={(el) => (chartRefs.current[index] = el)} width={400} height={200}></canvas>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
