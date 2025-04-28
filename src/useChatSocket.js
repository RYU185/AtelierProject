import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useChatSocket = ({ userId, onMessageReceive }) => {
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    if (!userId || clientRef.current) return;

    const client = new Client({
      brokerURL: undefined,
      webSocketFactory: () =>
        new SockJS(`/ws?token=${localStorage.getItem("accessToken")}`),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("WebSocket 연결 성공 (userId:", userId, ")");
        setIsConnected(true);

        const topic = `/user/queue/messages`;

        if (!isSubscribedRef.current) {
          console.log("구독 시작:", topic);
          client.subscribe(topic, (msg) => {
            try {
              const message = JSON.parse(msg.body);
              console.log("수신한 메시지:", message);
              onMessageReceive(message);
            } catch (e) {
              console.error("수신 메시지 파싱 실패:", e);
            }
          });

          isSubscribedRef.current = true;
        }
      },
      onDisconnect: () => {
        console.warn("WebSocket 연결 해제");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket 오류:", event);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
      clientRef.current = null;
      isSubscribedRef.current = false;
      console.log("🔌 WebSocket 종료");
    };
  }, [userId]);

  const sendMessage = (payload) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
      });
      console.log("메시지 전송:", payload);
    } else {
      console.warn("WebSocket 연결 안됨 - 메시지 못 보냄");
    }
  };

  return { sendMessage, isConnected };
};

export default useChatSocket;
