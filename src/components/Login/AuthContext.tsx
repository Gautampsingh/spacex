import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

type UserRole = 'admin' | 'guest';
type User = { username: string; role: UserRole } | null;

interface AuthContextType {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  error: null,
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<User>(() => {
    const stored = sessionStorage.getItem("loggedInInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("loggedInInfo", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("loggedInInfo");
    }
  }, [user]);

  const validUsers = useMemo(() => [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "guest", password: "guest123", role: "guest" }
  ], []);

  const login = useCallback((username: string, password: string) => {
    const found = validUsers.find(
      user => user.username === username && user.password === password
    );
    if (found) {
      setUser({ username: found.username, role: found.role as UserRole });
      setError(null);
    } else {
      setUser(null);
      setError("Invalid username or password.");
    }
  }, [validUsers]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    sessionStorage.removeItem("loggedInInfo");
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const contextValue = useMemo(() => ({ user, login, logout, error, clearError }), [user, login, logout, error, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
