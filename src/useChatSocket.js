import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useChatSocket = ({ userId, onMessageReceive }) => {
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId || clientRef.current) return;

    const client = new Client({
      brokerURL: undefined,
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket 연결됨");
        setIsConnected(true);

        client.subscribe(`/user/queue/messages`, (msg) => {
          const message = JSON.parse(msg.body);
          console.log("수신한 메시지:", message);
          onMessageReceive(message);
        });
      },
      onDisconnect: () => {
        console.log("WebSocket 연결 해제됨");
        setIsConnected(false);
      },
      onStompError: console.error,
      onWebSocketError: console.error,
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
      console.log("WebSocket 종료");
    };
  }, [userId]);

  const sendMessage = (payload) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
    } else {
      console.warn("WebSocket 연결 안됨 - 메시지 전송 실패");
    }
  };

  return { sendMessage, isConnected };
};

export default useChatSocket;
