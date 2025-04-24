import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm"
import MyNavbar from "./components/MyNavbar"
import HomePage from "./components/HomePage"
import { useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  
    window.location.href = '/home'; 
  };
  return (
    <>
    <Router>
    <MyNavbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
