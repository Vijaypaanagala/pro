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
import Work from "./components/Work";
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <NavBar />
              <Intro />
              <Slide/>
              <Main />
              <Last/>
            </>
          } />
          <Route path="/page" element={<Page />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/talent" element={
            <>
              <NavBar />
              <Talent/>
            </>
          } />
          <Route path="/work" element={
            <>
              <NavBar />
              <Work/>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
