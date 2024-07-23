import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/ap.css';

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
        }
      } catch (error) {
        console.error("Error reading data: ", error);
      }
    };

    fetchApplicantData();
  }, [email]);

  const handleAccept = () => {
    setAccepted(true); // Set accepted to true on click
  };

  const handleDecline = () => {
    setAccepted(false); // Set accepted to false on click
  };

  return (
    <div className="profile-container-unique">
      {userData ? (
        <>
          <div className="profile-details-unique">
            <h2 className="profile-details-header-unique">Applicant Details</h2>
            <p className="profile-details-info-unique"><strong>First Name:</strong> {userData.fname}</p>
            <p className="profile-details-info-unique"><strong>Last Name:</strong> {userData.lname}</p>
            <p className="profile-details-info-unique"><strong>Additional Name:</strong> {userData.aname}</p>
            <p className="profile-details-info-unique"><strong>Email:</strong> {userData.email}</p>
            <p className="profile-details-info-unique"><strong>College:</strong> {userData.college}</p>
            <p className="profile-details-info-unique"><strong>Location:</strong> {userData.location}</p>
            <p className="profile-details-info-unique"><strong>Experience:</strong> {userData.exp}</p>
            <p className="profile-details-info-unique"><strong>Achievements:</strong> {userData.ach}</p>
            <div className="profile-skills-unique">
              <strong>Skills:</strong>
              <ul className="profile-skills-list-unique">
                {userData.skills && userData.skills.map((skill, index) => (
                  <li key={index} className="skill-tag-unique">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="action-buttons-unique">
            <button onClick={handleAccept} className="accept-btn-unique">Accept</button>
            <button onClick={handleDecline} className="decline-btn-unique">Decline</button>
          </div>
        </>
      ) : (
        <p className="loading-message-unique">Loading...</p>
      )}
      {showPopup && (
        <div className="profile-empty-popup-unique">
          <p>No applicant data found.</p>
        </div>
      )}
    </div>
  );
}

export default ApplicantProfile;
