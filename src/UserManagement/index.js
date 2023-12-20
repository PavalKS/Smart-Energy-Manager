import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/UserManagement');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error (e.g., show error message)
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/UserManagement/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Update the users state after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <table class = 'table table-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room Number</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>{user.Room}</td>
              <td>{user.User}</td>
              <td>
                <button class="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
