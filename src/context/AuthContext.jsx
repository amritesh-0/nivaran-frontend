import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, name, role, token}
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // to avoid flickering on refresh

  // Load user from localStorage or sessionStorage on first render based on rememberMe
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    console.log('Loading user from storage:', storedUser ? 'found' : 'not found');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // login: save user info + token
  const login = (userData, rememberMe = false) => {
    setUser(userData);
    setIsAuthenticated(true);
    // User and token are already stored by authApi based on rememberMe
  };

  // logout: clear everything
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // authApi.logout() will clear the storages
    import('../services/authApi').then(({ default: authApi }) => {
      authApi.logout();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,            // full user object
        role: user?.role, // shortcut for role
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier usage
export function useAuth() {
  return useContext(AuthContext);
}
