import { useNotification } from "./NotificationContext";
import { useAuth } from "../../components/AuthContext";
import useWebSocket from "../../socket/useWebSocket";

const ReservationNotificationComponent = () => {
  const { addNotification, reservationAlarms } = useNotification();
  const { token } = useAuth();
  const { client } = useWebSocket();

  useEffect(() => {
    if (!client || !token) return;

    const subscription = client.subscribe("/user/queue/notifications", (message) => {
      try {
        const notification = JSON.parse(message.body);
        console.log("[Notification]", notification);
        addNotification(notification);
      } catch (error) {
        console.error("[Notification Parsing Error]", error);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [client, token, addNotification]);

  return null;
};

export default ReservationNotificationComponent;
