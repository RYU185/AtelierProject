import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useChatSocket = ({ userId, onMessageReceive }) => {
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId || clientRef.current) return;

    const client = new Client({
      brokerURL: undefined, // SockJS 사용 시 반드시 undefined로 설정
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket 연결 성공");

        setIsConnected(true);

        const topic = `/user/${userId}/queue/messages`;
        client.subscribe(topic, (msg) => {
          try {
            const message = JSON.parse(msg.body);
            console.log("📥 수신 메시지 구조 확인:", message);
            onMessageReceive(message);
          } catch (e) {
            console.error("❌ 메시지 파싱 오류:", e);
          }
        });
      },
      onDisconnect: () => {
        console.warn("⚠️ WebSocket 연결 해제됨");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("💥 STOMP 에러:", frame);
      },
      onWebSocketError: (event) => {
        console.error("💥 WebSocket 오류:", event);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
      console.log("🔌 WebSocket 종료");
    };
  }, [userId]);

  const sendMessage = (payload) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
      console.log("📤 전송:", payload);
    } else {
      console.warn("❌ WebSocket 연결 안됨 - 메시지 전송 실패");
    }
  };

  return { sendMessage, isConnected };
};

export default useChatSocket;
