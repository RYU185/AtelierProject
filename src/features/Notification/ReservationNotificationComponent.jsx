import { useNotification } from "./NotificationContext";
import { useAuth } from "../../components/AuthContext";
import useWebSocket from "../../socket/useWebSocket";
import { useEffect } from "react";

const ReservationNotificationComponent = () => {
  const { reservationAlarms } = useNotification();
  const { token } = useAuth();
  const { client } = useWebSocket();

  return null; // 아무 UI나 구독(subscribe) 필요 없음
};

export default ReservationNotificationComponent;
