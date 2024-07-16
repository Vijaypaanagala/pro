import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dataRef } from './Firebases';
import "../Styles/Editjob.css";

function EditJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobData } = location.state;
  const [formData, setFormData] = useState({
    title: jobData.title,
    skills: jobData.skills,
    period: jobData.period,
    stipend: jobData.stipend,
    description: jobData.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedEmail = jobData.userEmail.replace(/\./g, ',');
    const jobRef = dataRef.ref(`all/${sanitizedEmail}/${jobData.jobId}`);

    jobRef.update(formData)
      .then(() => {
        // Navigate back to Work component after successful update
        navigate('/work');
      })
      .catch(error => {
        console.error("Error updating job: ", error);
      });
  };

  return (
    <div className="edit-job-container">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Skills:
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        </label>
        <label>
          Period:
          <input type="text" name="period" value={formData.period} onChange={handleChange} required />
        </label>
        <label>
          Stipend:
          <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit" className="edit-job-btn">Save</button>
      </form>
    </div>
  );
}

export default EditJob;
