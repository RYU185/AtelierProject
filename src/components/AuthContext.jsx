import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const isArtist = localStorage.getItem("isArtist") === "true";
    const nickname = localStorage.getItem("nickname");

    return username && role ? { userId, username, roles: [role], isArtist, nickname } : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  const login = ({ userId, username, role, isArtist = false, nickname, authToken }) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem("isArtist", isArtist);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("authToken", authToken);

    setUser({ userId, username, roles: [role], isArtist, nickname });
    setToken(authToken);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
