import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../../components/AuthContext";

const useNotificationWebSocket = ({ onNotification }) => {
  const { token } = useAuth();

  useEffect(() => {
    console.log("알람용 WebSocket effect 실행됨");

    if (!token) {
      console.warn("WebSocket 연결 중단: JWT 없음");
      return;
    }

    console.log("🔑 WebSocket용 JWT 토큰:", token);

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(
          `http://localhost:8081/ws?token=${localStorage.getItem("authToken")}`
        ),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      onConnect: () => {
        console.log("[User] WebSocket 연결 성공");

        client.subscribe("/user/queue/notifications", (message) => {
          console.log("수신된 원본 메시지:", message);
        });

        client.subscribe("/queue/notifications", (message) => {
          console.log("[백업경로] 수신된 메시지:", message);
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [token, onNotification]);
};

export default useNotificationWebSocket;
