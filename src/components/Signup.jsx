import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <center>
    <div className="container">
      <div className="login-form">
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
    </center>
  );
}

export default Signup;
 