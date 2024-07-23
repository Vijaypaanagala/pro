import React, { useState, useEffect } from "react";
import { dataRef } from './Firebases';
import '../Styles/Pr.css'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Pr() {
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState(""); 
  const [aname, setAname] = useState(""); 
  const [email, setEmail] = useState("");  
  const [college, setCollege] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [exp, setExp] = useState("");
  const [ach, setAch] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [applied, setApplied] = useState([]); // New state for applied jobs

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email); // Set email based on logged-in user

        // Fetch existing user data from Firebase
        const userRef = dataRef.ref(`users/${user.uid}`);
        userRef.once('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFname(data.fname || "");
            setLname(data.lname || "");
            setAname(data.aname || "");
            setCollege(data.college || "");
            setUserLocation(data.location || "");
            setExp(data.exp || "");
            setAch(data.ach || "");
            setSkills(data.skills || []);
            setAvailableSkills(data.skills || []);
            setApplied(data.applied || []); // Load applied jobs
          }
        });
      } else {
        setUser(null);
        setEmail(""); // Clear email if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    setSkills((prevSkills) => 
      checked ? [...prevSkills, name] : prevSkills.filter(skill => skill !== name)
    );
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills((prevSkills) => [...prevSkills, skillInput]);
      setAvailableSkills((prevSkills) => [...prevSkills, skillInput]);
    }
    setSkillInput("");
  };

  const onFnameChange = (event) => {
    setFname(event.target.value);
  };
  const onLnameChange = (event) => {
    setLname(event.target.value);
  };
  const onAnameChange = (event) => {
    setAname(event.target.value);
  };
  const onClgChange = (event) => {
    setCollege(event.target.value);
  };
  const onLocationChange = (event) => {
    setUserLocation(event.target.value);
  };
  const onExpChange = (event) => {
    setExp(event.target.value);
  };
  const onAchChange = (event) => {
    setAch(event.target.value);
  };

  const AddtoFire = () => {
    const userData = {
      fname,
      lname,
      aname,
      email,
      college,
      location: userLocation,
      exp,
      ach,
      skills,
      applied // Save applied jobs
    };

    if (user) {
      dataRef.ref(`users/${user.uid}`).set(userData)
        .then(() => {
          console.log("Data added successfully");
          // Clear all fields after successful save
          setFname("");
          setLname("");
          setAname("");
          setEmail("");
          setCollege("");
          setUserLocation("");
          setExp("");
          setAch("");
          setSkills([]);
          setSkillInput("");
        })
        .catch((error) => {
          console.error("Error adding data: ", error);
        });
    }
  };

  return (
    <div className="main-contain-pr">
      <div className="ps-form-container-pr">
        <div className="ps-form-pr">
          <h2>Edit Profile</h2>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={fname} onChange={onFnameChange} className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={lname} onChange={onLnameChange} className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>Account Name</label>
            <input type="text" value={aname} onChange={onAnameChange} className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} readOnly className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>College</label>
            <input type="text" value={college} onChange={onClgChange} className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={userLocation} onChange={onLocationChange} className="input-field-pr" />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <textarea value={exp} onChange={onExpChange} className="textarea-field-pr" />
          </div>
          <div className="form-group">
            <label>Achievements</label>
            <textarea value={ach} onChange={onAchChange} className="textarea-field-pr" />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <div className="skills-container-pr">
              {availableSkills.map((skill) => (
                <label key={skill} className="skills-list-pr">
                  <input
                    type="checkbox"
                    name={skill}
                    checked={skills.includes(skill)}
                    onChange={handleSkillChange}
                    className="skill-checkbox-pr"
                  />
                  {skill}
                </label>
              ))}
              <div className="add-skill">
                <input
                  type="text"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  placeholder="Add new skill"
                  className="add-skill-input"
                />
                <button type="button" onClick={handleAddSkill} className="add-skill-btn">Add</button>
              </div>
            </div>
          </div>
          <div className="button-container-pr">
            <button className="l-btn-pr" onClick={AddtoFire}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pr;
