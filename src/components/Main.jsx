import React from 'react';
import '../Styles/Main.css'

function Main() {
  return (
    <div className="main-container">
      <h3 className="browse-jobs-heading">
        Find Talent for Your Projects and Browse Opportunities to Apply
      </h3>
      <div className="browse-jobs-container">
        <div className="browse-jobs-box browse-jobs-developers">
          <h2>For Students</h2>
          <p>Browse Skill Based Jobs</p>
          <a type="button" className="btn btn-primary browse-jobs-button">
            Browse Jobs
          </a>
        </div>
        <div className="browse-jobs-box browse-jobs-employers">
          <h2>For Employers</h2>
          <p>Post your Jobs here</p>
          <a type="button" className="btn btn-primary browse-jobs-button">
            Add Job
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
