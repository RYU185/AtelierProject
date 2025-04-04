import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import ChatPage from "./ChatPage";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 250px;
  background-color: white;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  border-radius: 2px;
  padding: 35px 55px 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin: 20px 0 10px;
`;

const Button = styled.button`
  display: inline-block;
  margin: 10px 0;
  padding: 10px 10px;
  color: white;
  background-color: dodgerblue;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UserPage = ({ artistId, artistName }) => {
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);
  const stompClientRef = useRef(null);

  // ✅ 이전에 입력했던 사용자 정보 불러오기
  useEffect(() => {
    const lastUser = localStorage.getItem("lastUserName");
    if (lastUser) {
      setUserName(lastUser);
    }
  }, []);

  const connect = (e) => {
    e.preventDefault();
    if (userName && !stompClientRef.current) {
      const client = new Stomp.Client({
        webSocketFactory: () => new SockJS(`http://localhost:8080/ws`),
        onConnect: () => {
          console.log("Connected as", userName);
          stompClientRef.current = client;
          setIsConnected(true);

          // ✅ 사용자 정보 저장 (임시, 향후 백엔드 연동 가능)
          const now = new Date().toISOString().split("T")[0];
          localStorage.setItem("lastUserName", userName);
          localStorage.setItem(
            `userinfo_${userName}`,
            JSON.stringify({
              nickname: `${userName}님`,
              joined: now,
            })
          );

          client.subscribe("/topic/public", onMessageReceived);

          client.publish({
            destination: "/app/chat.addUser",
            body: JSON.stringify({ sender: userName, type: "JOIN" }),
          });
        },
        onStompError: (frame) => {
          console.log("Broker error", frame.headers["message"]);
        },
      });

      client.activate();
    }
  };

  const onMessageReceived = (message) => {
    const body = JSON.parse(message.body);
    setMessage(body);
    console.log("Received", body);
  };

  return (
    <>
      {!isConnected ? (
        <Container>
          <h2>닉네임을 입력하고 채팅방에 입장하세요</h2>
          <form onSubmit={connect}>
            <Input
              type="text"
              placeholder="닉네임을 입력하세요"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button type="submit">채팅 시작</Button>
          </form>
        </Container>
      ) : (
        <ChatPage
          userName={userName}
          message={message}
          stompClientRef={stompClientRef} // ✅ 꼭 있어야 함!
          artistName={artistName}
        />
      )}
    </>
  );
};

export default UserPage;
