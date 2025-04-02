import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <Router>
      <CustomCursor />
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
};

export default App;
