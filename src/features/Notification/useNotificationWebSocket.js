import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../../components/AuthContext";

const useNotificationWebSocket = ({ onNotification }) => {
  const { token } = useAuth();
  const clientRef = useRef(null);

  useEffect(() => {
    console.log("알림 WebSocket 연결 시작");

    if (!token) {
      console.warn(" JWT 토큰 없음: 연결 중단");
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8081/ws?token=${token}`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (msg) => console.log("📡 STOMP DEBUG:", msg),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket 연결 성공");
        console.log("알림 구독 시작");
        client.subscribe("/user/queue/notifications", (message) => {
          console.log("메시지 도착:", message.body);
          try {
            const parsed = JSON.parse(message.body);
            console.log("파싱된 메시지:", parsed);
            if (onNotification) onNotification(parsed);
          } catch (e) {
            console.error("메시지 파싱 실패:", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("WebSocket 연결 해제");
      client.deactivate();
    };
  }, [token, onNotification]);
};

export default useNotificationWebSocket;
