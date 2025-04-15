// src/NotificationComponent.js
import React, { useState } from "react";
import useWebSocket from "./socket";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  const handleNewNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  useWebSocket(handleNewNotification);

  return (
    <div>
      <h2>알림</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification.sender}: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
