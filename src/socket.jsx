// src/hooks/useWebSocket.js
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useInquiry } from "./features/adminpage/components/InquiryContext";

const useWebSocket = () => {
  const { addInquiry } = useInquiry();

  useEffect(() => {
    console.log("🧩 useWebSocket 실행됨");

    const client = new Client({
      brokerURL: "http://localhost:8081/ws",
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      onConnect: () => {
        console.log("✅ WebSocket 연결 성공");

        client.subscribe("/topic/inquiry", (message) => {
          const notification = JSON.parse(message.body);
          console.log("📩 받은 알림:", notification);

          const newInquiry = {
            id: notification.id,
            subject: notification.message,
            sender: notification.sender,
          };

          addInquiry(newInquiry); // ✅ 전역 상태에 알림 추가
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket STOMP 오류:", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket 자체 오류:", error);
      },
      onDisconnect: (frame) => {
        console.log("🛑 WebSocket 연결 종료", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
      console.log("🔌 WebSocket 클라이언트 비활성화");
    };
  }, [addInquiry]);

  return null;
};

export default useWebSocket;
