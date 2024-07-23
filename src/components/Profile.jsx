import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Fetch user data from Firebase
        dataRef.ref(`users/${user.uid}`).once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              setShowPopup(true);
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error("Error reading data: ", error);
          });
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleCreateProfile = () => {
    navigate('/edit');
  };

  return (
    <div className="profile-container-profile-unique">
      {userData ? (
        <>
          <div className="profile-details-profile-unique">
            <h2 className="profile-details-header-profile-unique">Profile Details</h2>
            <p className="profile-details-info-profile-unique"><strong>First Name:</strong> {userData.fname}</p>
            <p className="profile-details-info-profile-unique"><strong>Last Name:</strong> {userData.lname}</p>
            <p className="profile-details-info-profile-unique"><strong>Additional Name:</strong> {userData.aname}</p>
            <p className="profile-details-info-profile-unique"><strong>Email:</strong> {userData.email}</p>
            <p className="profile-details-info-profile-unique"><strong>College:</strong> {userData.college}</p>
            <p className="profile-details-info-profile-unique"><strong>Location:</strong> {userData.location}</p>
            <p className="profile-details-info-profile-unique"><strong>Experience:</strong> {userData.exp}</p>
            <p className="profile-details-info-profile-unique"><strong>Achievements:</strong> {userData.ach}</p>
            <div className="profile-skills-profile-unique">
              <strong>Skills:</strong>
              <ul className="profile-skills-list-profile-unique">
                {userData.skills && userData.skills.map((skill, index) => (
                  <li key={index} className="skill-tag-profile-unique">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/edit" type="button" className="edit-btn">
            Edit
          </Link>
        </>
      ) : (
        <p className="loading-message-profile-unique">Loading...</p>
      )}
      {showPopup && (
        <div className="profile-empty-popup-profile-unique">
          <p>No profile data found. Please create your profile.</p>
          <button onClick={handleCreateProfile} className="profile-empty-popup-button-profile-unique">Create Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
