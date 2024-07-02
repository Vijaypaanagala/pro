import React from "react";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import Signup from "./components/Signup";
import Intro from "./components/Intro";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Slide from "./components/Slide";
import Talent from "./components/Talent";
import Pr from "./components/Pr";
import Last from "./components/Last";
import Work from "./components/Work";


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
            <Pr/>
           
            
            
          </>} />
          <Route path="/page" element={<Page />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Talent" element={
            <>
            <NavBar />
            <Talent/>
            
            </>
          } />
          <Route path="/Work" element={
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
