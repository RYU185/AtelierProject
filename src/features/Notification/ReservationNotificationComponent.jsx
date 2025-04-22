import { useNotification } from "./NotificationContext";
import useNotificationWebSocket from "./useNotificationWebSocket";
import { useAuth } from "../../components/AuthContext";
import { useEffect } from "react";

const ReservationNotificationComponent = () => {
  const { addNotification, reservationAlarms } = useNotification();
  const { token } = useAuth();

  if (!token) {
    return null;
  }

  useEffect(() => {
  }, [reservationAlarms]);

  useNotificationWebSocket({
    onNotification: (noti) => {
      addNotification(noti);
    },
  });

  return null;
};

export default ReservationNotificationComponent;
