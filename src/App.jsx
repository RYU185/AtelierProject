import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";
import InquiryNotifications from "./features/adminpage/components/InquiryNotifications";
import { InquiryProvider } from "./features/adminpage/components/InquiryContext";
import { AuthProvider } from "./components/AuthContext.jsx";
import { NotificationProvider } from "./features/Notification/NotificationContext.jsx";
import ReservationNotificationComponent from "./features/Notification/ReservationNotificationComponent.jsx";
import useWebSocket from "./socket/useWebSocket.js";

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <InquiryProvider>
          <Router>
            <AppContent />
          </Router>
        </InquiryProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

const AppContent = () => {
  useWebSocket();
  return (
    <>
      <InquiryNotifications />
      <ReservationNotificationComponent />
      <CustomCursor />
      <GlobalStyle />
      <AppRoutes />
    </>
  );
};

export default App;
