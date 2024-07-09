import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Import necessary Firebase auth functions
import "../Styles/NavBar.css";
import { FiUser } from "react-icons/fi"; // Import profile icon from react-icons

function NavBar() {
  const [user, setUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase auth instance

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Redirect to home page ("/") after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Logo</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/' className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/Work' className="nav-link">Find Work</Link>
            </li>
            <li className="nav-item">
              <Link to='/Talent' className="nav-link">Find Talent</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link">Events</a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <div className="profile-icon" onClick={toggleUserDetails}>
                  <FiUser  style={{ fontSize: "23px" }}/>
                </div>
                {showUserDetails && (
                  <div className="dropdown-menu dropdown-menu-end show" style={{ right: "0", left: "auto" }}>
                    <div className="dropdown-item">{user.email}</div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/Page" className="nav-link">Login</Link>
                <Link to="/Signup" type="button" className="btn btn-success custom-btn">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
