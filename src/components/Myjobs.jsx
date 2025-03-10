import React, { useEffect, useState } from 'react';
import { dataRef, auth } from './Firebases';
import { useNavigate } from 'react-router-dom';
import "../Styles/MyJobs.css";

function MyJobs() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userEmail) {
      const sanitizedEmail = userEmail.replace(/\./g, ',');
      const postsRef = dataRef.ref(`all/${sanitizedEmail}`);

      const fetchUserPosts = postsRef.on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const userPostsData = Object.values(data).reverse();
          setUserPosts(userPostsData);
        } else {
          setUserPosts([]);
        }
        setLoading(false);
      });

      return () => postsRef.off('value', fetchUserPosts);
    }
  }, [userEmail]);

  const handleViewApplicants = (jobId, jobTitle) => {
    navigate(`/myjobs/${jobId}/applicants`, { state: { jobId, jobTitle } }); // Redirect to ViewApplicants with jobId and jobTitle in URL
  };

  const handleDeleteJob = (jobId) => {
    const sanitizedEmail = userEmail.replace(/\./g, ',');
    const jobRef = dataRef.ref(`all/${sanitizedEmail}/${jobId}`);
    
    jobRef.remove()
      .then(() => {
        // Remove the job from the local state
        setUserPosts(prevPosts => prevPosts.filter(post => post.jobId !== jobId));
      })
      .catch(error => {
        console.error("Error deleting job: ", error);
      });
  };

  const handleEditJob = (jobId, jobData) => {
    navigate(`/editjob/${jobId}`, { state: { jobData: { ...jobData, userEmail } } }); // Redirect to EditJob with jobData in URL
  };

  if (loading) {
    return <p className='loading'>Loading...</p>; 
  }

  return (
    <div className="my-jobs-container">
      <h2 className="my-jobs-title">My Jobs</h2>
      <div className="my-jobs-data">
        {userPosts.length > 0 ? (
          userPosts.map((item, index) => (
            <div key={index} className="my-jobs-item">
              <h4>{item.title}</h4>
              <p><strong>Skills:</strong> {item.skills}</p>
              <p><strong>Period:</strong> {item.period}</p>
              <p><strong>Stipend:</strong> {item.stipend}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <div className="my-jobs-buttons">
                <button 
                  type="button" 
                  className="my-jobs-btn" 
                  onClick={() => handleViewApplicants(item.jobId, item.title)}
                >
                  View Applicants
                </button>
                <button 
                  type="button" 
                  className="my-jobs-btn delete-btn" 
                  onClick={() => handleDeleteJob(item.jobId)}
                >
                  Delete
                </button>
                <button 
                  type="button" 
                  className="my-jobs-btn edit-btn" 
                  onClick={() => handleEditJob(item.jobId, item)}
                >
                  Edit
                </button>
                
              </div>
            </div>
          ))
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyJobs;
