import { useNotification } from "./NotificationContext";
import { useAuth } from "../../components/AuthContext";
import { useWebSocket } from "../../socket/useWebSocket";

const ReservationNotificationComponent = () => {
  const { reservationAlarms } = useNotification();
  const { token } = useAuth();

  return null; // 아무 UI나 구독(subscribe) 필요 없음
};

export default ReservationNotificationComponent;
