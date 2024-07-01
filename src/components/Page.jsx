import React, { useState } from "react";
import "../Styles/Page.css";
import log from '../assets/log.png';
import "../Styles/Page.css";

function Page() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const onChange = (event) => {
    setName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPass(event.target.value);
  };

  return (
     
    <div className="main-con">
      <div className="image-container">
        <img src={log} alt="Logo" />
      </div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            value={name}
            onChange={onChange}
            placeholder="Username"
            className="input-field"
          />
          <input
            type="password"
            value={pass}
            onChange={onPasswordChange}
            placeholder="Password"
            className="input-field"
          />
          <button type="button" className="login-btn">
            Login
          </button>
        </div>
      </div>
    </div>

  );
}

export default Page;
