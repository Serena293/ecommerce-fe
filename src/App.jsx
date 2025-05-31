import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoginForm from "./components/LoginForm";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import OriginalPage from "./components/OriginalPage";
import "./App.css";
import PrintPage from "./components/PrintPage";
import OrderPage from "./components/OrderPage";
import CartProvider from "./CartProvider";
import AuthProvider from "./AuthProvider";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import ShoppingPage from "./components/ShoppingPage";


function App() {
  const { user, isAuthenticated, setAuth, logout } = useAuth();

  const handleLoginSuccess = (token) => {
    console.log(token, "in app.jsx")
    setAuth(token);
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
      <CartProvider>
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
                    <Navigate to="/home" replace />
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
              {/* aggiustare */}
              <Route path="/cart" element={<CartPage />} />

              <Route
                path="/original"
                element={
                  <OriginalPage
                    isAuthenticated={isAuthenticated}
                    userRole={user?.role}
                  />
                }
              />

              <Route
                path="/print"
                element={
                  <PrintPage
                    isAuthenticated={isAuthenticated}
                    userRole={user?.role}
                  />
                }
              />

              <Route path="/commissions" element={<OrderPage />} />
              
              <Route path="/checkout"element={<CheckoutPage/>} />

              <Route path="/shop" element={<ShoppingPage/>}/>


            </Routes>

          </main>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
