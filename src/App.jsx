import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import CustomCursor from "./components/CustomCursor";
import InquiryNotifications from "./features/adminpage/components/InquiryNotifications";
import { InquiryProvider } from "./features/adminpage/components/InquiryContext";
import { AuthProvider } from "./components/AuthContext.jsx";
import NotificationComponent from "./NotificationComponent";
import { NotificationProvider } from "./features/Notification/NotificationContext.jsx";
import ReservationNotificationComponent from "./features/Notification/ReservationNotificationComponent.jsx";

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <InquiryProvider>
          <Router>
            <InquiryNotifications />
            <NotificationComponent />
            <ReservationNotificationComponent />
            <CustomCursor />
            <GlobalStyle />
            <AppRoutes />
          </Router>
        </InquiryProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
