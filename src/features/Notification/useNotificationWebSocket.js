import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../../components/AuthContext";

const useNotificationWebSocket = ({ onNotification }) => {
  const { token } = useAuth();

  useEffect(() => {
    console.log("알람용 WebSocket effect 실행됨");

    if (!token) {
      console.warn("🚨 WebSocket 연결 중단: JWT 없음");
      return;
    }

    console.log("🔑 WebSocket용 JWT 토큰:", token);

    const client = new Client({
      connectHeaders: {},
      webSocketFactory: () =>
        new SockJS(`http://localhost:8081/ws?token=${token}`),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("[User] WebSocket 연결 성공");

        client.subscribe("/user/queue/notifications", (message) => {
          try {
            console.log("📥 수신된 메시지 body:", message.body);
            const noti = JSON.parse(message.body);
            console.log("알림 파싱 성공:", noti);
            onNotification?.(noti);
          } catch (err) {
            console.error("알림 파싱 실패:", err);
          }
        });
      },
      onStompError: (frame) => console.error("❌ STOMP 에러:", frame),
      onWebSocketError: (error) => console.error("❌ WebSocket 에러:", error),
    });

    client.activate();
    return () => client.deactivate();
  }, [token, onNotification]);
};

export default useNotificationWebSocket;
