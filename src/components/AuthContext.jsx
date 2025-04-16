import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return username && role ? { username, roles: [role] } : null;
  });

  const login = ({ username, role }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setUser({ username, roles: [role] });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
