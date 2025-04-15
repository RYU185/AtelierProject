// src/hooks/useWebSocket.js
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useInquiry } from "./features/adminpage/components/InquiryContext";

const useWebSocket = () => {
  const { setInquiries } = useInquiry();

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

          // 알림 객체 생성 (message와 sender로 중복 체크)
          const newInquiry = {
            id: notification.id, // 서버에서 전달된 고유 ID 사용
            subject: notification.message, // 메시지 제목
            sender: notification.sender,  // 보낸 사람
            createdAt: new Date().toISOString(), // 알림 받은 시간
          };

          // 중복 체크 조건을 완화: 같은 내용이 아니면 추가
          setInquiries((prevInquiries) => {
            const isDuplicate = prevInquiries.some(
              (inquiry) =>
                inquiry.id === newInquiry.id || // 동일 ID가 존재하면 중복
                (inquiry.subject === newInquiry.subject &&
                 inquiry.sender === newInquiry.sender)
            );

            if (!isDuplicate) {
              console.log("➕ 새로운 알림 추가됨");
              return [newInquiry, ...prevInquiries];
            } else {
              console.log("⚠️ 중복 알림 무시됨");
            }

            return prevInquiries;
          });
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket Error: ", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket 연결 오류: ", error);
      },
      onDisconnect: (frame) => {
        console.log("WebSocket 연결 끊어짐", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
      console.log("🛑 WebSocket 연결 종료");
    };
  }, [setInquiries]);

  return null;
};

export default useWebSocket;
