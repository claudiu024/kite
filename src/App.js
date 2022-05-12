import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./login";
import Dashboard from "./dashboard"
import Signup from "./Signup"
import { useState } from "react";
import {LoginContext} from "./Helpers/LoginContext"
function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  return (
    <LoginContext.Provider value={{loggedIn,setLoggedIn}}>
    <Router> 

    <Routes>
     
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
    
    </Routes>
     
    
  </Router> 
  </LoginContext.Provider>
  );
}

export default App;
