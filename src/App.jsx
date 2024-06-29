import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Page from "./components/Page";
import Signup from './components/Signup'

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/page" element={<Page />} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
