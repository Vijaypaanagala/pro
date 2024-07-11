import React, { useEffect, useState } from 'react';
import { dataRef } from './Firebases';
import "../Styles/Work.css";
import Popup from './Popup';

function Work() {
  const [allValue, setAllValue] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      dataRef.ref().child("all").on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const allPosts = [];
          Object.values(data).forEach(userPosts => {
            Object.values(userPosts).forEach(post => {
              allPosts.push(post);
            });
          });
          setAllValue(allPosts.reverse());
        } else {
          setAllValue([]);
        }
      });
    };

    fetchData();

    // Cleanup function to unsubscribe from the dataRef when the component unmounts
    return () => dataRef.ref().child("all").off();
  }, []);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedJob(null);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setSelectedJob(null);
    // Add your job application logic here
  };

  return (
    <div className="work-container">
      <div className="all-data">
        {allValue.length > 0 ? (
          allValue.map((item, index) => (
            <div key={index} className="data-item">
              <h3>{item.title}</h3>
              <p><strong>Skills:</strong> {item.skills}</p>
              <p><strong>Period:</strong> {item.period}</p>
              <p><strong>Stipend:</strong> {item.stipend}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <button type="button" className="apply-btn" onClick={() => handleApplyNow(item)}>Apply Now</button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
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
