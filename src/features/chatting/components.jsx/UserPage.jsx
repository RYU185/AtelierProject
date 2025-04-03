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
function UserPage({ url }) {
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);
  // client 연결객체는 상태관리는 필요하나 화면 렌더링과는 무관하므로
  // useRef로 생성하는 것이 바람직하다
  // useRef로 만드는 변수는 화면렌더링을 일으키지않아 성능에 유리하다.
  const stompClientRef = useRef(null);

  function connect(e){
    e.preventDefault();
    // 화면 리로드(새로고침) 방지
    if (userName && !stompClientRef.current){
      // 웹소켓 연결설정 (=엔드포인트) 설정
      const client = new Stomp.Client({
        webSocketFactory: ()=> new SockJS(`${url}/ws`),
        onConnect: ()=> { // 소켓 연결이 성공한다면
          console.log("Connected as", userName);
          stompClientRef.current = client;
          // useRef 사용법: .current를 꼭 써줘야한다
          setIsConnected(true);

          // 구독
          client.subscribe("/topic/public",onMessageReceived )
          // Join 전송
          client.publish({
            destination: "/app/chat.addUser",
            body: JSON.stringify({ sender: userName, type: "JOIN"}),
          })
        },
        onStompError: (frame)=>{
          console.log("Broker error", frame.headers["message"]);
        },
      });
      // 클라이언트 설정 끝나는 부분
      // 클라이언트 실행
      client.activate();
    }
  }

  function onMessageReceived(message){
    const body = JSON.parse(message.body);
    setMessage(body);
    console.log("Received", body);

  }
  //  useRef 사용법 
  // 1. 상태관리는 해야되는데 화면에 렌더링할 필요는 없을때
  // 2. Virtual DOM말고 실제 DOM을 참조하기 위해 사용할때

  return (
    <>
      {!isConnected ? (
        <Container>
          <h2>Type your username to enter the Chatroom</h2>
          <form onSubmit={connect}>
            <Input
              type="text"
              placeholder="UserName"
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button type="submit"> Start Chatting</Button>
          </form>
        </Container>
      ) : (
        <ChatPage 
          userName={userName}
          message={message}
          stompClientRef={stompClientRef}
        />
      )}
    </>
  );
}

export default UserPage;
