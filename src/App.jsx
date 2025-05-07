import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import OriginalsPage from "./components/Originals";
import "./App.css"; // Assicurati di avere il CSS giusto qui

function App() {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userData") || "null");

    return {
      isAuthenticated: !!token,
      user: user,
    };
  });

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    window.location.href = "/home";
  };

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
      <div className="d-flex flex-column min-vh-100">
        <MyNavbar
          key={authState.user?.role || "guest"}
          isAuthenticated={authState.isAuthenticated}
          userRole={authState.user?.role}
          onLogout={handleLogout}
        />

        <main className="flex-fill">
          <Routes>
            <Route path="/home" element={<HomePage />} />

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

            <Route
              path="/register"
              element={<Navigate to="/registration" replace />}
            />
            <Route
              path="/registration"
              element={
                authState.isAuthenticated ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <RegistrationForm />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile user={authState.user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/original" element={<OriginalsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
