import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Debug
        console.log("[AuthProvider] Decoded JWT:", decoded);

        const userData = {
          username: decoded.sub,
          userId: decoded.userId,
          role: decoded.role || decoded.authorities?.[0],//controlla
        };

        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token decoding failed:", error);
        logout();
      }
    }
  }, []);

  const setAuth = (token) => {
    localStorage.setItem('authToken', token);

    const decoded = jwt_decode(token);

    const userData = {
      username: decoded.sub,
      userId: decoded.userId,
      role: decoded.role || decoded.authorities?.[0],
    };

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
