import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataRef } from './Firebases';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../Styles/view.css";

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const jobId = location.state?.jobId || ""; // Use optional chaining and default value
  const jobTitle = location.state?.jobTitle || "Job"; // Use optional chaining and default value

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchApplicants = async () => {
    if (userEmail && jobId) {
      const sanitizedEmail = sanitizeEmail(userEmail); // Sanitize email to create valid Firebase path
      const applicantsRef = dataRef.ref(`all/${sanitizedEmail}/${jobId}/applicants`);

      try {
        const snapshot = await applicantsRef.once('value');
        if (snapshot.exists()) {
          const applicantEmails = Object.values(snapshot.val());

          const profiles = await Promise.all(applicantEmails.map(async (email) => {
            const id = await getIdFromEmail(email); // Retrieve user ID from email
            if (!id) return null;

            const profileRef = dataRef.ref(`users/${id}`);
            const profileSnapshot = await profileRef.once('value');
            return profileSnapshot.val();
          }));

          setApplicants(profiles.filter(profile => profile !== null)); // Filter out null profiles
        } else {
          setApplicants([]);
        }
      } catch (error) {
        console.error("Error fetching applicants: ", error);
      }
    }
  };

  // Function to sanitize email for Firebase path
  const sanitizeEmail = (email) => {
    return email.replace(/\./g, ',');
  };

  // Function to retrieve user ID from email
  const getIdFromEmail = async (email) => {
    try {
      const snapshot = await dataRef.ref('users').orderByChild('email').equalTo(email).once('value');
      if (snapshot.exists()) {
        const userId = Object.keys(snapshot.val())[0];
        return userId;
      } else {
        console.error(`No user found with email: ${email}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user ID: ", error);
      return null;
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchApplicants();
    }
  }, [userEmail, jobId]);

  return (
    <div className="view-applicants-container">
      <h1 className="view-applicants-title">Applicants for {jobTitle}</h1>
      {applicants.length === 0 ? (
        <p className="no-applicants">Loading..</p>
      ) : (
        <ul className="applicants-list">
          {applicants.map((applicant, index) => (
            <li key={index} className="applicant-card">
              <div className="applicant-info">
                <p><strong>Name:</strong> {applicant.fname} {applicant.lname}</p>
                <p><strong>Email:</strong> {applicant.email}</p>
                <p><strong>College:</strong> {applicant.college}</p>
              </div>
              <button className="view-profile-button">View Profile</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewApplicants;
