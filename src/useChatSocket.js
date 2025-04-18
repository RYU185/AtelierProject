// src/hooks/useChatSocket.js
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useChatSocket = ({ userId, onMessageReceive }) => {
  const clientRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const client = new Client({
      brokerURL: undefined, // SockJS 사용 시 생략
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      onConnect: () => {
        console.log("채팅 WebSocket 연결됨");

        client.subscribe(`/user/queue/messages`, (msg) => {
          const message = JSON.parse(msg.body);
          console.log("메시지 수신:", message);
          onMessageReceive(message); // 콜백으로 메시지 처리
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket 오류:", error);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("채팅 WebSocket 종료됨");
      }
    };
  }, [userId, onMessageReceive]);

  const sendMessage = (payload) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    } else {
      console.warn("WebSocket 연결되지 않음, 메시지 전송 실패");
    }
  };

  return { sendMessage };
};

export default useChatSocket;
