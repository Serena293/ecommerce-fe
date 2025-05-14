import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoginForm from "./components/LoginForm";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import OriginalsPage from "./components/Originals";
import "./App.css";

function App() {
  const { user, isAuthenticated, setAuth, logout } = useAuth(); 

  const handleLoginSuccess = (userData) => {
    setAuth(userData); 
  };

  const handleLogout = () => {
    logout(); 
    window.location.href = "/home"; 
  };

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/home" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <MyNavbar
          key={user?.role || "guest"}
          isAuthenticated={isAuthenticated}
          userRole={user?.role}
          onLogout={handleLogout}
        />

        <main className="flex-fill">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
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
                isAuthenticated ? (
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
                  <Profile user={user} />
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
