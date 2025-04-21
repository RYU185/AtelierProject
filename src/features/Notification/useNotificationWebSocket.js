import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useNotificationWebSocket = ({ onNotification }) => {
  useEffect(() => {
    console.log("유저 알람용 WebSocket effect 실행됨");

    const client = new Client({
      brokerURL: "http://localhost:8081/ws",
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      onConnect: () => {
        console.log("[User] WebSocket 연결 성공");

        client.subscribe("/user/queue/notifications", (message) => {
          console.log("📥 수신된 원본 메시지:", message);
          try {
            const noti = JSON.parse(message.body);
            console.log("✅ 예약 수신 알림:", noti);
            onNotification(noti);
          } catch (e) {
            console.error("❌ 메시지 파싱 실패", e);
          }
        });
      },
      onStompError: (frame) => console.error("STOMP 에러:", frame),
      onWebSocketError: (error) => console.error("WebSocket 에러:", error),
    });

    client.activate();
    return () => client.deactivate();
  }, [onNotification]);
};

export default useNotificationWebSocket;
