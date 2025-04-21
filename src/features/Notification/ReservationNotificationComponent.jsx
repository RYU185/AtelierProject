import { useNotification } from "./NotificationContext";
import useNotificationWebSocket from "./useNotificationWebSocket"; // D-1 알림용 WebSocket 훅

const ReservationNotificationComponent = () => {
  const { addNotification, reservationAlarms } = useNotification();

  console.log("[ReservationComponent] 현재 알림 목록:", reservationAlarms);

  useNotificationWebSocket({
    onNotification: (noti) => {
      console.log("[WebSocket 수신] 예약 알림:", noti);
      addNotification(noti);
    },
  });

  return null;
};

export default ReservationNotificationComponent;
