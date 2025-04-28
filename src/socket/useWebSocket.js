import { useCallback, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSocketStore } from "../socket/socketStore";
import { useAuth } from "../components/AuthContext";

const useWebSocket = () => {
  const { token } = useAuth();
  const clientRef = useRef(null);
  const {
    setSocketConnected,
    addNotification,
    addInquiry,
    addChatMessage,
    clearAll,
    isSocketConnected,
  } = useSocketStore();

  useEffect(() => {
    if (!token) {
      console.warn("[WebSocket] 토큰 없음, 연결하지 않음");
      return;
    }

    console.log("[WebSocket] 연결 시도 중...");

    const client = new Client({
      webSocketFactory: () => new SockJS(`/ws?token=${token}`),
      debug: (msg) => console.log("[STOMP DEBUG]", msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("[WebSocket] 연결 성공");
        setSocketConnected(true);

        client.subscribe("/user/queue/notifications", (message) => {
          try {
            const notification = JSON.parse(message.body);
            console.log("[Notification]", notification);
            addNotification(notification);
          } catch (error) {
            console.error("[Notification Parsing Error]", error);
          }
        });

        client.subscribe("/topic/inquiry", (message) => {
          try {
            const inquiry = JSON.parse(message.body);
            console.log("[Inquiry]", inquiry);
            addInquiry(inquiry);
          } catch (error) {
            console.error("[Inquiry Parsing Error]", error);
          }
        });

        client.subscribe("/user/queue/messages", (message) => {
          try {
            const chatMessage = JSON.parse(message.body);
            console.log("[Chat Message]", chatMessage);
            addChatMessage(chatMessage);
          } catch (error) {
            console.error("[Chat Message Parsing Error]", error);
          }
        });
      },

      onDisconnect: () => {
        console.log("[WebSocket] 연결 해제");
        setSocketConnected(false);
      },
      onWebSocketError: (error) => {
        console.error("[WebSocket Error]", error);
      },
      onStompError: (frame) => {
        console.error("[STOMP Error]", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("[WebSocket] 연결 종료 및 정리");
      client.deactivate();
      clientRef.current = null;
      setSocketConnected(false);
      clearAll();
    };
  }, [token, setSocketConnected, addNotification, addInquiry, addChatMessage, clearAll]);

  const sendMessage = useCallback(({ type, content, sender, receiver, tempId }) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.log("웹소켓 연결안됨-> 메세지 전송실패");
      return;
    }

    const payload = {
      type,
      content,
      sender,
      receiver,
      tempId,
    };

    clientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(payload),
    });

    console.log("메세지 전송완료", payload);
  }, []);
  return { sendMessage, client: clientRef.current, isConnected: isSocketConnected };
};

export default useWebSocket;
