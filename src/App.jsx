import NavBar from "./components/NavBar"
import Page from "./components/Page"
import Signup from "./components/Signup"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";



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
