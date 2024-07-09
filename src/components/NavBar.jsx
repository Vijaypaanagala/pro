import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
        <NavLink to="/" className="navbar-brand">Logo</NavLink>
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
              <NavLink to='/' className="nav-link" activeClassName="active" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/Work' className="nav-link" activeClassName="active">Find Work</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/Talent' className="nav-link" activeClassName="active">Find Talent</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/Events' className="nav-link" activeClassName="active">Events</NavLink>
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
                <NavLink to="/Page" className="nav-link" activeClassName="active">Login</NavLink>
                <NavLink to="/Signup" className="btn btn-success custom-btn">Sign up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
