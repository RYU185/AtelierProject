import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const isArtist = localStorage.getItem("isArtist") === "true";
    const nickname = localStorage.getItem("nickname");

    return username && role
    ? { username, roles: [role], isArtist , nickname}
    : null;
  });

  const login = ({ username, role, isArtist =false, nickname }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem("isArtist", isArtist);
    localStorage.setItem("nickname", nickname);
  setUser({ username, roles: [role], isArtist, nickname });
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
