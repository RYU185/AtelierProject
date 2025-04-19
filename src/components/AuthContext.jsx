import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const isArtist = localStorage.getItem("isArtist") === "true";

    return username && role
    ? { username, roles: [role], isArtist }
    : null;
  });

  const login = ({ username, role, isArtist =false }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem("isArtist", isArtist);
  setUser({ username, roles: [role], isArtist });
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
