import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm"
// import MyNavbar from "./components/MyNavbar"
import HomePage from "./components/HomePage"

function App() {
 

  return (
    <>
    <Router>
      {/* <MyNavbar /> */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
