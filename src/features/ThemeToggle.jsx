import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "#121212";
    document.body.style.color = theme === "light" ? "black" : "white";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const buttonStyle = {
    position: "fixed",
    top: "90px",
    right: "10px",
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: theme === "light" ? "#000" : "#fff",
    color: theme === "light" ? "#fff" : "#000",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
};

export default ThemeToggle;
