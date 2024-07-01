import React from "react";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import Signup from "./components/Signup";
import Intro from "./components/Intro";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Slide from "./components/Slide";

import Last from "./components/Last";




function App() {
  return (
    <Router>
      <div className="app-container">
       
        <Routes>
          <Route path="/" element={<>
            <NavBar />
            <Intro />
            <Slide/>
            <Main />
            <Last/>
            
            
          </>} />
          <Route path="/page" element={<Page />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
