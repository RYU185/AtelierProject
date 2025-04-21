import { useNotification } from "./NotificationContext";
import useNotificationWebSocket from "./useNotificationWebSocket";
import { useAuth } from "../../components/AuthContext";
import { useEffect } from "react";

const ReservationNotificationComponent = () => {
  const { addNotification, reservationAlarms } = useNotification();
  const { token } = useAuth();

  if (!token) {
    console.log("Reservation 알림 대기 중: token 없음");
    return null;
  }

  useEffect(() => {
    console.log("[ReservationComponent] 현재 알림 목록:", reservationAlarms);
  }, [reservationAlarms]);

  useNotificationWebSocket({
    onNotification: (noti) => {
      console.log("[WebSocket 수신] 예약 알림:", noti);
      addNotification(noti);
    },
  });

  return null;
};

export default ReservationNotificationComponent;
