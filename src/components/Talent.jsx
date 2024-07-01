import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import "../Styles/Talent.css";
import Work from './Work';

function Talent() {
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    period: "",
    stipend: "",
    description: ""
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAdd = () => {
    const { title, skills, period, stipend, description } = formData;

    if (title && skills && period && stipend && description) {
      dataRef.ref().child("all").push(formData);
      setFormData({
        title: "",
        skills: "",
        period: "",
        stipend: "",
        description: ""
      });
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Job Title"
        className="input-field"
      />
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={onChange}
        placeholder="Skills required"
        className="input-field"
      />
      <input
        type="text"
        name="period"
        value={formData.period}
        onChange={onChange}
        placeholder="Time Period"
        className="input-field"
      />
      <input
        type="text"
        name="stipend"
        value={formData.stipend}
        onChange={onChange}
        placeholder="Stipend"
        className="input-field"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Description"
        className="textarea-field"
      />
      <center>
        <button type="button" className="apply-btn" onClick={handleAdd}>
          Post
        </button>
      </center>
    </div>
  );
}

export default Talent;
