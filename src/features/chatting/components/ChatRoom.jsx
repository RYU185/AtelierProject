import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import Header from "../../Header";
import Footer from "../../Footer";
import useChatSocket from "../../../useChatsocket";

const ChatContainer = styled.div`
  max-width: 1200px;
  margin: 10px auto 0;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  position: relative;
  background: #fff;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  text-align: center;
  letter-spacing: -0.5px;
`;

const BackButton = styled.button`
  background: #0095e1;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 149, 225, 0.25);

  &::before {
    content: "←";
    font-size: 18px;
    margin-top: -2px;
  }

  &:hover {
    background: #0085d1;
    transform: translateX(-4px);
    box-shadow: 0 4px 12px rgba(0, 149, 225, 0.35);
  }

  &:active {
    transform: translateX(-2px);
    box-shadow: 0 2px 6px rgba(0, 149, 225, 0.3);
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  margin-top: 10px;
`;

const ProfileSection = styled.div`
  width: 260px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 12px;
  background: #fafafa;
  border-radius: 12px 0 0 12px;
`;

const ProfileBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;

  &:first-child {
    padding-top: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const ProfileCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isArtist ? "#0095E1" : "#f5f5f5")};
  color: ${(props) => (props.$isArtist ? "white" : "#666")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: ${(props) => (props.$isArtist ? "0 2px 8px rgba(0, 149, 225, 0.25)" : "none")};
`;

const ProfileText = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const DateText = styled.div`
  color: #999;
  font-size: 13px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #0095e1;
    margin-right: 6px;
    opacity: 0.8;
  }
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 0 12px 0 0;
`;

const ChatTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #0095e1;
  font-size: 14px;
  font-weight: 500;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #0095e1;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

const MessageBox = styled.div`
  background: #f8f9fb;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 10px;
  margin: 8px 0;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatFooter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: #fff;
  border-radius: 0 0 12px 0;
  padding: 8px 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  background: #fff;
`;

const ClipButton = styled.label`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  color: #999;
  font-size: 20px;
  transition: all 0.2s;

  &:hover {
    color: #666;
    transform: scale(1.05);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  background: #fafafa;
  transition: all 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: rgba(0, 149, 225, 0.3);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0, 149, 225, 0.08);
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 14px;
  color: #0095e1;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;
  letter-spacing: -0.3px;

  &:hover {
    opacity: 0.8;
    transform: translateX(2px);
  }
`;

const ChatRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  if (!room) {
    return (
      <div>
        <p>채팅방 정보가 없습니다.</p>
        <button onClick={() => navigate("/artist")}>작가 목록으로 이동</button>
      </div>
    );
  }

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);

  const { sendMessage } = useChatSocket({
    senderId: room.userId,
    receiverId: room.artistId,
    onMessageReceive: (msg) => {
      const formatted = {
        id: Date.now(),
        message: msg.content,
        timestamp: msg.timestamp?.slice(11, 16),
        isArtist: msg.sender === room.artistId,
      };
      setMessages((prev) => [...prev, formatted]);
    },
  });

  const scrollToBottom = () => {
    if (!isUserScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isScrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
      setIsUserScrolled(!isScrolledToBottom);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat-room/${room.id}/messages`);
        const loaded = res.data.map((msg, index) => ({
          id: index,
          message: msg.content,
          timestamp: msg.timestamp?.slice(11, 16) ?? "??:??",
          isArtist: msg.sender === room.artistId,
        }));
        setMessages(loaded);
      } catch (err) {
        console.error("메시지 로딩 실패:", err);
      }
    };
    fetchMessages();
  }, [room.id]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      const inputElement = document.querySelector('input[type="text"]');
      if (inputElement) inputElement.focus();
      return;
    }
    if (messages.length > 2) scrollToBottom();
  }, [messages, isInitialLoad]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNewMessage(`파일: ${file.name}`);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const payload = {
      sender: room.userId,
      receiver: room.artistId,
      content: newMessage,
    };
    sendMessage(payload);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: newMessage,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isArtist: false,
      },
    ]);

    setNewMessage("");
    setSelectedFile(null);
  };

  return (
    <>
      <Header />
      <ChatContainer>
        <PageTitle>
          <BackButton onClick={() => navigate("/artist")}>Artist List</BackButton>
          <Title>Chatting with ARTIST</Title>
        </PageTitle>
        <MainContent>
          <ProfileSection>
            <ProfileBox>
              <ProfileItem>
                <ProfileCircle $isArtist={true}>A</ProfileCircle>
                <ProfileText>ARTIST</ProfileText>
              </ProfileItem>
              <ProfileItem>
                <ProfileCircle $isArtist={false}>N</ProfileCircle>
                <ProfileText>NICKNAME</ProfileText>
              </ProfileItem>
              <DateText>2023.03.28</DateText>
            </ProfileBox>
          </ProfileSection>
          <ChatSection>
            <ChatHeader>
              <ChatTitle>ARTIST와의 대화</ChatTitle>
              <OnlineStatus>온라인</OnlineStatus>
            </ChatHeader>
            <ChatMessages ref={chatMessagesRef} onScroll={handleScroll}>
              <MessageBox>작품에 대해 궁금하신 점을 자유롭게 문의해주세요.</MessageBox>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isArtist={msg.isArtist}
                  file={msg.file}
                />
              ))}
              <div ref={messagesEndRef} />
            </ChatMessages>
            <ChatFooter>
              <InputContainer>
                <ClipButton htmlFor="file-upload">
                  📎
                  <FileInput
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </ClipButton>
                <ChatInput
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
                  placeholder="메시지를 입력하세요..."
                />
                <SendButton onClick={handleSendMessage}>전송</SendButton>
              </InputContainer>
            </ChatFooter>
          </ChatSection>
        </MainContent>
      </ChatContainer>
      <Footer />
    </>
  );
};

export default ChatRoom;
