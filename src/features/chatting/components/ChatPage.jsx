import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const getAvatar = (sender) => `/images/${sender}.png` || "/images/avatar2.png";

const getUserInfo = (sender) => {
  const stored = localStorage.getItem(`userinfo_${sender}`);
  return stored
    ? JSON.parse(stored)
    : { nickname: "익명 사용자", joined: "미상" };
};
const Container = styled.div`
  max-width: px;
  height: 1000px;
  background: #fff;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`;
const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Messages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  gap: 10px;
  margin: 4px 0;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  align-self: flex-start;
`;
const Bubble = styled.div`
  background: ${(props) => (props.isMine ? "#007aff" : "#f1f1f1")};
  color: ${(props) => (props.isMine ? "#fff" : "#000")};
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 60%;
  line-height: 1.5;
  word-break: break-word;
`;

const Sender = styled.div`
  font-size: 12px;
  color: #999;
  margin: 2px 10px;
  text-align: ${(props) => (props.isMine ? "right" : "left")};
`;

const Time = styled.div`
  font-size: 11px;
  color: #aaa;
  margin-top: 4px;
  text-align: ${(props) => (props.isMine ? "right" : "left")};
`;

const SystemMessage = styled.div`
  font-size: 13px;
  color: #888;
  text-align: center;
  margin: 10px 0;
`;

const DateLabel = styled.div`
  text-align: center;
  font-size: 13px;
  color: #888;
  margin: 10px 0 4px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
`;

const Input = styled.textarea`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  resize: none;
  font-size: 14px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 0 16px;
  background-color: #007aff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

const TopRightActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button`
  font-size: 13px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const ChatPage = ({ userName, message, stompClientRef, artistName }) => {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!message) return;

    const timestamp = new Date();
    const time = timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formatted = {
      sender: message.sender,
      content: message.content,
      type: message.type,
      time,
      timestamp,
    };

    if (message.type === "JOIN") {
      formatted.content = `${message.sender}님이 입장하셨습니다`;
    } else if (message.type === "LEAVE") {
      formatted.content = `${message.sender}님이 퇴장하셨습니다`;
    }

    setMessageList((prev) => [...prev, formatted]);
  }, [message]);

  useEffect(() => {
    const timestamp = new Date();
    const time = timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const testMessage = {
      sender: userName,
      content: "안녕하세요! 이건 테스트 메시지입니다 🧪",
      type: "CHAT",
      time,
      timestamp,
    };

    setMessageList((prev) => [...prev, testMessage]);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!value.trim() || !stompClientRef?.current) return;

    const chatMessage = {
      sender: userName,
      content: value,
      type: "CHAT",
    };

    stompClientRef.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(chatMessage),
    });

    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const leaveChat = () => {
    if (window.confirm("채팅방을 나가시겠습니까?")) {
      if (stompClientRef?.current) {
        stompClientRef.current.publish({
          destination: "/app/chat.leaveUser",
          body: JSON.stringify({ sender: userName, type: "LEAVE" }),
        });
        stompClientRef.current.deactivate();
      }
      window.location.href = "/"; // 나가기 후 이동 경로
    }
  };

  const groupByDate = (messages) => {
    return messages.reduce((acc, msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});
  };

  return (
    <Container>
      <Header>
        <span>작가 {artistName}님과의 채팅방입니다</span>
        <TopRightActions>
          <ToggleButton onClick={leaveChat}>나가기</ToggleButton>
        </TopRightActions>
      </Header>
      <Messages>
        {Object.entries(groupByDate(messageList)).map(([date, messages]) => (
          <div key={date}>
            <DateLabel>{date}</DateLabel>
            {messages.map((msg, i) =>
              msg.type === "JOIN" || msg.type === "LEAVE" ? (
                <SystemMessage key={i}>{msg.content}</SystemMessage>
              ) : (
                <MessageRow key={i} isMine={msg.sender === userName}>
                  <Avatar src={getAvatar(msg.sender)} alt="avatar" />
                  <div>
                    <Sender
                      title={`${getUserInfo(msg.sender).nickname}\n가입일: ${
                        getUserInfo(msg.sender).joined
                      }`}
                      isMine={msg.sender === userName}
                    >
                      {msg.sender}
                    </Sender>
                    <Bubble isMine={msg.sender === userName}>
                      {msg.content}
                    </Bubble>
                    <Time isMine={msg.sender === userName}>{msg.time}</Time>
                    <Button
                      onClick={() => {
                        const now = new Date();
                        const fake = {
                          sender: "admin",
                          content: "이건 임시 테스트용 메시지입니다.",
                          type: "CHAT",
                          time: now.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                          timestamp: now,
                        };
                        setMessageList((prev) => [...prev, fake]);
                      }}
                    >
                      임시 메시지 추가
                    </Button>
                  </div>
                </MessageRow>
              )
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </Messages>
      <Form onSubmit={sendMessage}>
        <Input
          placeholder="메시지를 입력하세요..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="submit">전송</Button>
      </Form>
    </Container>
  );
};

export default ChatPage;
