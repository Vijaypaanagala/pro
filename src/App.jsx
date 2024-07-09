import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import Signup from "./components/Signup";
import Intro from "./components/Intro";
import Main from "./components/Main";
import Slide from "./components/Slide";
import Talent from "./components/Talent";
import Pr from "./components/Pr";
import Work from "./components/Work";
import Last from "./components/Last";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<>
            <Intro />
            <Slide />
            <Main />
            <Last />
          </>} />
          <Route path="/page" element={<Page />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/work" element={<Work />} />
          <Route path="/edit" element={<Pr />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
