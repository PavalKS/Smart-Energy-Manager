import React, { useState, useEffect } from 'react';

const BillingPage = () => {
  const [roomData, setRoomData] = useState([]);
  const [roomBills, setRoomBills] = useState([]);

  useEffect(() => {
    // Retrieve roomData from session storage
    const storedRoomData = sessionStorage.getItem('roomEnergyConsumptionData');
    if (storedRoomData) {
      const parsedData = JSON.parse(storedRoomData);
      setRoomData(parsedData);
    }
  }, []);

  useEffect(() => {
    // Calculate energy bill for each room and device type
    const calculateRoomBills = () => {
      const bills = roomData.map(room => {
        let roomTotal = 0;
        const devicesBill = room.Devices.map(device => {
          let deviceBill = 0;
          device['Energy Data'].forEach(energy => {
            const energyConsumed = parseFloat(energy);
            if (energyConsumed <= 100) {
              deviceBill += energyConsumed * 4.8;
            } else if (energyConsumed > 100 && energyConsumed <= 500) {
              deviceBill += 100 * 4.8 + (energyConsumed - 100) * 6.7;
            } else {
              deviceBill += 100 * 4.8 + 400 * 6.7 + (energyConsumed - 500) * 7.1;
            }
          });
          roomTotal += deviceBill;
          return { [device['Device Type']]: deviceBill.toFixed(2) };
        });
        return { Room: room.Room, Devices: devicesBill, Total: roomTotal.toFixed(2) };
      });
      setRoomBills(bills);
    };

    if (roomData.length > 0) {
      calculateRoomBills();
    }
  }, [roomData]);

  return (
    <div>
      <h1 className="display-3 px-3 py-3">Energy Billing Information</h1>
      <div className="px-3 py-3">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Room</th>
              <th>Device Breakdown</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {roomBills.map((roomBill, index) => (
              <tr key={index}>
                <td>{roomBill.Room}</td>
                <td>
                  {roomBill.Devices.map((device, devIndex) => (
                    <span key={devIndex}>
                      {Object.keys(device)}: {Object.values(device)} Rs<br />
                    </span>
                  ))}
                </td>
                <td>{roomBill.Total} Rs</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total for all rooms</td>
              <td>{roomBills.reduce((acc, curr) => acc + parseFloat(curr.Total), 0).toFixed(2)} Rs</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BillingPage;
