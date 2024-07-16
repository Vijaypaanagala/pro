// // ApplicantProfile.jsx
// import { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { dataRef } from './Firebases'; // Adjust this import as per your Firebase setup

// function ApplicantProfile() {
//   const { id } = useParams(); // Get the id parameter from the URL
//   const [applicantData, setApplicantData] = useState(null);
//   const history = useHistory();

//   useEffect(() => {
//     const fetchApplicantData = async () => {
//       try {
//         if (id) {
//           // Fetch applicant data based on the id
//           const snapshot = await dataRef.ref(`applicants/${id}`).once('value');
//           if (snapshot.exists()) {
//             setApplicantData(snapshot.val());
//           } else {
//             console.log(`No data found for applicant with id ${id}`);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching applicant data:', error);
//       }
//     };

//     fetchApplicantData();
//   }, [id]);

//   useEffect(() => {
//     // Redirect or handle invalid id scenarios
//     if (id === undefined || id === null || id === '') {
//       history.push('/'); // Redirect to home or error page
//     }
//   }, [id, history]);

//   if (!id) {
//     return <p>No applicant id specified.</p>;
//   }

//   if (!applicantData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="applicant-profile">
//       <h2>{applicantData.fname} {applicantData.lname}</h2>
//       <p>Email: {applicantData.email}</p>
//       <p>College: {applicantData.college}</p>
//       {/* Display other applicant details */}
//     </div>
//   );
// }

// export default ApplicantProfile;
