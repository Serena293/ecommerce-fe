import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token in AuthProvider", token)

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Debug
        console.log("[AuthProvider] Decoded JWT:", decoded);

        const userData = {
          username: decoded.sub,
          userId: decoded.userId,
          role: decoded.authorities?.[0]?.replace("ROLE_", "") || "CUSTOMER",
        };

        setToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decoding failed:", error);
        logout();
      }
    }
  }, []);

  const setAuth = (token) => {
    localStorage.setItem("authToken", token);
    setToken(token);
    const decoded = jwtDecode(token);

    const userData = {
      username: decoded.sub,
      userId: decoded.userId,
      role: decoded.role || decoded.authorities?.[0],
    };
     
    
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, setAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
