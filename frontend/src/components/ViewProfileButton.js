import React, { useState } from 'react';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const ViewProfileButton = ({ email, token }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
        if (!email) {
            throw new Error('Email is required');
          }

      const response = await fetch(`${BASE_API_URL}/api/user/${email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user profile (${response.status} ${response.statusText})`);
      }
  
      const json = await response.json();
      setSelectedUser(json);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to fetch user profile');
    }
  };

  const handleButtonClick = () => {
    if (isProfileVisible) {
      setSelectedUser(null);
      setIsProfileVisible(false);
    } else {
      fetchUserProfile();
      setIsProfileVisible(true);
    }
  };
  

  return (
    <div>
      <button className="button" onClick={handleButtonClick}>{isProfileVisible ? "Hide" : "Show"} User's Profile</button>
      {error && <div className="error">{error}</div>}
      {selectedUser && (
        <div className="user-profile text-gray-700">
          <h3 className='font-semibold'>User's Profile</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Residence: {selectedUser.residence}</p>
          <p>Telegram handle: {selectedUser.tele}</p>
        </div>
      )}
    </div>
  );
};

export default ViewProfileButton;