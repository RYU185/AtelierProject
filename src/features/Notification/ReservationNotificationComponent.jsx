import { useNotification } from "./NotificationContext";
import { useAuth } from "../../components/AuthContext";
import useWebSocket from "../../socket/useWebSocket";
import { useEffect } from "react";

const ReservationNotificationComponent = () => {
  const { addNotification, reservationAlarms } = useNotification();
  const { token } = useAuth();
  const { client } = useWebSocket();

  useEffect(() => {
    if (!client || !token || !client.connected) {
      console.warn("🚫 아직 소켓 연결 안됨 - 구독 시도 안 함");
      return;
    }

    const subscription = client.subscribe(
      "/user/queue/notifications",
      (message) => {
        try {
          const notification = JSON.parse(message.body);
          console.log("[Notification]", notification);
          addNotification(notification);
        } catch (error) {
          console.error("[Notification Parsing Error]", error);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [client, token, client?.connected]);

  return null;
};

export default ReservationNotificationComponent;
