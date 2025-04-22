import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "../../components/AuthContext";

const useNotificationWebSocket = ({ onNotification }) => {
  const { token } = useAuth();
  const clientRef = useRef(null);

  useEffect(() => {
    console.log("알람용 WebSocket effect 실행됨");

    if (!token) {
      console.warn("WebSocket 연결 중단: JWT 없음");
      return;
    }

    console.log("📦 사용 중인 token:", token);

    const client = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8081/ws?token=${token}`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000, // 자동 재연결
      debug: (str) => console.log("📡 STOMP DEBUG:", str),
      onConnect: () => {
        console.log("WebSocket 연결 성asdfasdfasdfasdfasf");
      
        client.subscribe("/user/queue/notifications", (message) => {
          console.log("✅ 메시지 도착:", message.body); // ← 지금 이게 안 뜸
        });
      
        console.log("✅ 구독 완료"); // ← 이게 찍히는지 체크
      },
      
      onStompError: (frame) => {
        console.error("STOMP 오류 발생:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("WebSocket 연결 해제됨");
      client.deactivate();
    };
  }, [token, onNotification]);
};

export default useNotificationWebSocket;
