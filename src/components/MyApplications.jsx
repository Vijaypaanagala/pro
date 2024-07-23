import React, { useState, useEffect } from 'react';
import { dataRef } from './Firebases'; // Assuming you have Firebase database reference
import { getAuth } from "firebase/auth";
import '../Styles/MyApplications.css'; // Make sure to create and link this CSS file

function MyApplications() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        try {
          // Fetch user's applied jobs from Firebase
          const userRef = dataRef.ref(`users/${authUser.uid}/applied`);
          userRef.on('value', async (snapshot) => {
            const appliedJobIds = snapshot.val();
            if (appliedJobIds) {
              const jobsPromises = appliedJobIds.map(async (appliedJob) => {
                // Fetch job details based on jobId and postedBy
                const jobSnapshot = await dataRef.ref(`all/${appliedJob.postedBy}/${appliedJob.jobId}`).once('value');
                return jobSnapshot.val();
              });
              const jobs = await Promise.all(jobsPromises);
              setAppliedJobs(jobs.filter(job => job !== null)); // Filter out null jobs
            } else {
              setAppliedJobs([]);
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error fetching applied jobs: ", error);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Clean up function to unsubscribe from Firebase
    return () => {
      const authUser = auth.currentUser;
      if (authUser) {
        dataRef.ref(`users/${authUser.uid}/applied`).off();
      }
    };
  }, [auth]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Jobs Applied by {auth.currentUser.email}</h2>
      {appliedJobs.length > 0 ? (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Skills</th>
              <th>Period</th>
              <th>Stipend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.skills}</td>
                <td>{job.period}</td>
                <td>{job.stipend}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs applied yet.</p>
      )}
    </div>
  );
}

export default MyApplications;
