import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";
import InquiryNotifications from "./features/adminpage/components/InquiryNotifications";


const App = () => {
  return (
    <Router>
      
      <InquiryNotifications />
      <CustomCursor />
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
};

export default App;
