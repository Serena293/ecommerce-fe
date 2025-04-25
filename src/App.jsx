import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import { useState } from "react";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
// import UserManagement from "./components/UserManagement"; // Componente commentato

function App() {
  // Stato per gestire autenticazione e dati utente
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userData") || "null");
   
    return {
      isAuthenticated: !!token,
      user: user,
   
    }
    
  }
);
console.log("App DEBUG - authState:", authState);
  // Gestione login con salvataggio dati
  const handleLoginSuccess = (userData) => {
    const normalizedUserData = {
      ...userData,
      role: userData.authorities?.[0]?.authority || null,
    };


    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setAuthState({
      isAuthenticated: true,
      user: normalizedUserData,
    });
  };

  // Gestione logout con pulizia dati
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    window.location.href = "/home";
  };

  // Componente per proteggere le route
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && authState.user?.role !== requiredRole) {
      return <Navigate to="/home" replace />;
    }

    return children;
  };
  


  return (
    <Router>
      <MyNavbar
        key={authState.user?.role || "guest"} 
        isAuthenticated={authState.isAuthenticated}
        userRole={authState.user?.role}
        onLogout={handleLogout}
      />

      <Routes>
        {/* Route pubblica */}
        <Route path="/home" element={<HomePage />} />

        {/* Route login con redirect se già autenticati */}
        <Route
          path="/login"
          element={
            authState.isAuthenticated ? (
              <Navigate to="/profile" replace />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Route protetta - profilo utente */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile user={authState.user} />
            </ProtectedRoute>
          }
        />

        {/* Route protetta - solo admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 
        Route protetta - gestione utenti (commentata)
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserManagement />
            </ProtectedRoute>
          }
        /> 
        */}
      </Routes>
    </Router>
  );
}

export default App;
