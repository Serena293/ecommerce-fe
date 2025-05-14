// AuthContext.jsx
import { createContext, useContext } from 'react';

// Create the context with a default value (for when no provider is used)
export const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
