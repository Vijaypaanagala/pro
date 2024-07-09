import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../Styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const auth = getAuth();

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

  return (
    <div className="profile-container">
      {userData ? (
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
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
