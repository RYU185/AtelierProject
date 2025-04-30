import { useCallback, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useSocketStore from "./useSocketStore";
import { useAuth } from "../components/AuthContext";

export const useWebSocket = () => {
  const { token } = useAuth();

  const clientRef = useRef(null);
  const {
    setSocketConnected,
    setSendMessage,
    addNotification,
    addInquiry,
    addChatMessage,
    replaceTempMessage,
    clearAll,
  } = useSocketStore();

  const sendMessage = useCallback((payload) => {
    if (!clientRef.current || !clientRef.current.connected) {
      return;
    }

    console.log("PUBLISH 수행 직전", payload);

    clientRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(payload),
    });
    console.log("메세지 전송완료", payload);
  }, []);

  useEffect(() => {
    console.log("[WebSocket] useEffect 진입");
    if (!token) {
      console.warn("[WebSocket] 토큰 없음, 연결 안함");
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
        setSendMessage(sendMessage);

        client.subscribe("/user/queue/notifications", (message) => {
          try {
            const notification = JSON.parse(message.body);
            console.log("[Notification]", notification);
            addNotification(notification);
          } catch (error) {
            console.error("[Notification Parsing Error]", error);
          }
        });

        client.subscribe("/user/queue/inquiry", (message) => {
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
            const body = JSON.parse(message.body);
            console.log("🔥 WebSocket 수신:", body.sender, "→", body.content);

            if (body.tempId) {
              replaceTempMessage(body.tempId, {
                id: body.id,
                tempId: body.tempId,
                message: body.content,
                timestamp: body.timestamp,
                isTemporary: false,
                isArtist: body.sender === body.receiver,
                nickname: body.senderNickname || "익명",
                isTemporary: false,
                sender: body.sender,
              });

              return;
            }

            addChatMessage({
              id: body.id,
              sender: body.sender,
              message: body.content,
              timestamp: body.timestamp,
              nickname: body.senderNickname || "익명",
            });
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
  }, [
    token,
    setSocketConnected,
    setSendMessage,
    addNotification,
    addInquiry,
    addChatMessage,
    replaceTempMessage,
    clearAll,
  ]);
};
