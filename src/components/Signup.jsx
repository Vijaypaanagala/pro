import React, { useState } from "react";
import { Link } from "react-router-dom";
import log from '../assets/singn.png';
import "../Styles/Signup.css"

function Signup() {
  const [email, setEmail] = useState("");  
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPass(event.target.value);
  };
  const onPassChange = (event) => {
    setCpass(event.target.value);
  };

  return (
    <div className="main-contain">
      <div className="image-form-container">
        <div className="image-form">
          <img src={log} alt="Logo" />
        </div>
      </div>
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Signup</h2>
          <input
            type="text"
            value={name}
            onChange={onChange}
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
            type="password"
            value={pass}
            onChange={onPasswordChange}
            placeholder="Password"
            className="input-field"
          />
          <input
            type="password"
            value={cpass}
            onChange={onPassChange}
            placeholder="Confirm Password"
            className="input-field"
          />
          <button type="button" className="login-btn">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;