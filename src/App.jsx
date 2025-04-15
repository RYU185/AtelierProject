import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";
import InquiryNotifications from "./features/adminpage/components/InquiryNotifications";
import { InquiryProvider } from "./features/adminpage/components/InquiryContext"; // 📌 import 추가
import NotificationComponent from "./NotificationComponent";

const App = () => {
  return (
    <InquiryProvider> {/* 🔥 Context로 감싸줌 */}
      <Router>
        <InquiryNotifications />
        <CustomCursor />
        <GlobalStyle />
        <AppRoutes />
        <NotificationComponent />
      </Router>
    </InquiryProvider>
    
  );
};

export default App;
