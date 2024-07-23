import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/Profile.css';

function ApplicantProfile() {
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [accepted, setAccepted] = useState(false); // State for acceptance status
  const { email } = useParams(); // Getting email from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const snapshot = await dataRef.ref('users').orderByChild('email').equalTo(email).once('value');
        if (snapshot.exists()) {
          const userId = Object.keys(snapshot.val())[0];
          const userSnapshot = await dataRef.ref(`users/${userId}`).once('value');
          setUserData(userSnapshot.val());
        } else {
          setShowPopup(true);
          console.log("No data available for the applicant");
        }
      } catch (error) {
        console.error("Error reading data: ", error);
      }
    };

    if (email) {
      fetchApplicantData();
    }
  }, [email]);

  const handleCreateProfile = () => {
    navigate('/edit');
  };

  const handleAccept = () => {
    // Logic to mark applicant as accepted
    setAccepted(true);
  };

  const handleDecline = () => {
    // Logic to mark applicant as declined
    setAccepted(false);
  };

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <p><strong>First Name:</strong> {userData.fname}</p>
            <p><strong>Last Name:</strong> {userData.lname}</p>
            <p><strong>Additional Name:</strong> {userData.aname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>College:</strong> {userData.college}</p>
            <p><strong>Location:</strong> {userData.location}</p>
            <p><strong>Experience:</strong> {userData.exp}</p>
            <p><strong>Achievements:</strong> {userData.ach}</p>
            <div className="profile-skills">
              <strong>Skills:</strong>
              <ul>
                {userData.skills && userData.skills.map((skill, index) => (
                  <li key={index} className="skill-tag">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          {!accepted && (
            <div className="action-buttons">
              <button className="accept-btn" onClick={handleAccept}>Accept</button>
              <button className="decline-btn" onClick={handleDecline}>Decline</button>
            </div>
          )}
        </>
      ) : (
        <p className="loading-message">Loading ...</p>
      )}
      {showPopup && (
        <div className="profile-empty-popup">
          <p>No profile data found. Please create your profile.</p>
          <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
      )}
    </div>
  );
}

export default ApplicantProfile;
