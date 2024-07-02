import React, { useState } from "react";
import '../Styles/Pr.css'; // Make sure the path to the CSS file is correct

function Pr() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");  
  const [college, setCollege] = useState("");
  const [skills, setSkills] = useState("");
  const [exp, setExp] = useState("");
  const [ach, setAch] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onClgChange = (event) => {
    setCollege(event.target.value);
  };

  const onSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const onExpChange = (event) => {
    setExp(event.target.value);
  };

  const onAchChange = (event) => {
    setAch(event.target.value);
  };

  return (
    <div className="main-contain">
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Profile</h2>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder="Name"
            className="input-field"
          />
          <input
            type="text"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="text"
            value={college}
            onChange={onClgChange}
            placeholder="College"
            className="input-field"
          />
          <textarea
            value={skills}
            onChange={onSkillsChange}
            placeholder="Skills"
            className="input-field textarea-field"
          />
          <textarea
            value={exp}
            onChange={onExpChange}
            placeholder="Experience"
            className="input-field textarea-field"
          />
          <textarea
            value={ach}
            onChange={onAchChange}
            placeholder="Achievements"
            className="input-field textarea-field"
          />
          <div className="button-container">
            <button type="button" className="login-btn">
              Edit
            </button>
            <button type="button" className="login-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pr;
