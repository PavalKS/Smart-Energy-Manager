import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DashboardAdmin = () => {
  const [roomData, setRoomData] = useState([]);
  const chartRefs = useRef([]);

  const generateRoomData = () => {
    const roomCount = 3; // Change the number of rooms here
    const deviceTypes = ['Lighting', 'Air Conditioner', 'Television', 'Refrigerator'];
    const roomData = [];

    for (let i = 1; i <= roomCount; i++) {
      const devices = [];

      for (let j = 1; j <= 4; j++) {
        const deviceType = deviceTypes[j - 1];
        const deviceEnergyData = [];

        const currentHour = new Date().getHours();

        for (let hour = 0; hour <= currentHour; hour++) {
          const energyConsumed = (Math.random() * 5).toFixed(2);
          deviceEnergyData.push(energyConsumed);
        }

        devices.push({
          'Device Type': deviceType,
          'Device ID': j,
          'Energy Data': deviceEnergyData,
        });
      }

      roomData.push({
        Room: `Room ${i}`,
        Devices: devices,
      });
    }

    // Store roomData in session storage
    sessionStorage.setItem('roomEnergyConsumptionData', JSON.stringify(roomData));
    return roomData;
  };

  useEffect(() => {
    const storedRoomData = sessionStorage.getItem('roomEnergyConsumptionData');
    if (storedRoomData) {
      setRoomData(JSON.parse(storedRoomData));
    } 
    else {
      const simulatedRoomData = generateRoomData();
      setRoomData(simulatedRoomData);
    }
  }, []);

  useEffect(() => {
    if (chartRefs.current && chartRefs.current.length > 0) {
      roomData.forEach((room, roomIndex) => {
        room.Devices.forEach((device, deviceIndex) => {
          const ctx = chartRefs.current[roomIndex][deviceIndex].getContext('2d');

          if (chartRefs.current[roomIndex][deviceIndex].chartInstance) {
            chartRefs.current[roomIndex][deviceIndex].chartInstance.destroy();
          }

          chartRefs.current[roomIndex][deviceIndex].chartInstance = new Chart(ctx, {
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
                  text: `Energy Consumption for Device ${device['Device ID']} (${device['Device Type']}) in ${room.Room}`,
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
      });
    }
  }, [roomData]);

  return (
    <div>
      <h1 className="display-3 px-3 py-3">Admin Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {roomData.map((room, roomIndex) => (
          <div className='card text-white bg-dark px-3 py-3' key={roomIndex} style={{ width: '100%', marginBottom: '20px' }}>
            <h2>{room.Room}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {room.Devices.map((device, deviceIndex) => (
                <div key={deviceIndex} style={{ width: '48%', marginBottom: '20px' }}>
                  <h3>Device {device['Device ID']} - {device['Device Type']}</h3>
                  <canvas
                    ref={(el) => {
                      if (!chartRefs.current[roomIndex]) chartRefs.current[roomIndex] = [];
                      chartRefs.current[roomIndex][deviceIndex] = el;
                    }}
                    width={400}
                    height={200}
                  ></canvas>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
