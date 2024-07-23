import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases'; // Assuming you have Firebase database reference
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Popup from './Popup'; // Assuming you have a Popup component defined
import "../Styles/Work.css"; // Ensure you have appropriate styling

function Work() {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]); // State for applied jobs
  const auth = getAuth();

  useEffect(() => {
    // Fetch job listings from Firebase
    const fetchData = () => {
      dataRef.ref('all').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const allPosts = [];
          Object.keys(data).forEach((userEmail) => {
            Object.keys(data[userEmail]).forEach((jobId) => {
              allPosts.push({
                ...data[userEmail][jobId],
                jobId,
                postedBy: userEmail // Include postedBy email
              });
            });
          });

          // Filter out jobs that the user has already applied for
          const filteredPosts = allPosts.filter(job => !appliedJobs.includes(job.jobId));
          setJobListings(filteredPosts.reverse()); // Reverse to show latest posts first
        } else {
          setJobListings([]);
        }
        setLoading(false); // Set loading to false after data is fetched
      });
    };

    fetchData();

    // Clean up function to unsubscribe from Firebase
    return () => dataRef.ref('all').off();
  }, [appliedJobs]);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        // Fetch applied jobs for the user
        const fetchAppliedJobs = () => {
          dataRef.ref(`users/${user.email}/appliedJobs`).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setAppliedJobs(Object.keys(data));
            } else {
              setAppliedJobs([]);
            }
          });
        };

        fetchAppliedJobs();

      } else {
        setUserEmail('');
        setAppliedJobs([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleApply = (job) => {
    if (userEmail) {
      setSelectedJob(job);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async () => {
    if (userEmail && selectedJob) {
      try {
        const jobId = selectedJob.jobId;

        // Update job with applicant's email
        const jobRef = dataRef.ref(`all/${selectedJob.postedBy}/${jobId}/applicants`);
        await jobRef.transaction((applicants) => {
          if (!applicants) {
            applicants = [];
          }
          if (!applicants.includes(userEmail)) {
            applicants.push(userEmail);
          }
          return applicants;
        });

        // Update applied jobs list
        const userAppliedJobsRef = dataRef.ref(`users/${userEmail}/appliedJobs`);
        await userAppliedJobsRef.child(jobId).set(true);

        console.log("Application submitted successfully!");

        // Remove the job from the current job listings
        setJobListings(prevJobListings =>
          prevJobListings.filter(job => job.jobId !== jobId)
        );

      } catch (error) {
        console.error("Error submitting application: ", error);
      } finally {
        setShowConfirmation(false);
        setSelectedJob(null);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="all-data">
      {jobListings.map((job, index) => (
        <div key={index} className="data-item">
          <h3>{job.title}</h3>
          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>Period:</strong> {job.period}</p>
          <p><strong>Stipend:</strong> {job.stipend}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <button className="apply-btn" onClick={() => handleApply(job)}>Apply</button>
        </div>
      ))}
      {showConfirmation && (
        <Popup
          job={selectedJob}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default Work;
