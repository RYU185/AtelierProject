import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import Header from "../../Header";
import Footer from "../../Footer";
import axiosInstance from "../../../api/axiosInstance";
import useChatSocket from "../../../useChatsocket";
import { useAuth } from "../../../components/AuthContext";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  max-width: 1200px;
  margin: 10px auto 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
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
  color: #e0e0e0;
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
  padding-bottom: 30px;
  overflow: hidden;
`;

const ProfileSection = styled.div`
  width: 260px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 12px;
  border-radius: 12px 0 0 12px;
  border: 1px solid #2b2b2b;
`;

const ProfileBox = styled.div`
  border-radius: 12px;
  border: 1px solid #2b2b2b;
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
  color: #e1e1e1;
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
  height: 100%;
`;

const ChatHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #2b2b2b;
  border-left: none;
  border-radius: 0 12px 0 0;
`;

const ChatTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #e1e1e1;
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
  border-right: 1px solid #2e2e2e;

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
  border: 1px solid #2b2b2b;
  border-radius: 0 0 12px 0;
  padding: 8px 0;
  border-left: none;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
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
  border: 1px solid #2b2b2b;
  transition: all 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: rgba(0, 149, 225, 0.3);
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

const ChatRoom = ({ room: propRoom }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const nicknameRef = useRef(user?.nickname ?? localStorage.getItem("nickname") ?? "익명");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const [isUserScrolled, setIsUserScrolled] = useState(false);
  const { artistId } = useParams();
  const [room, setRoom] = useState(propRoom || location.state?.room || null);

  const { sendMessage, isConnected } = useChatSocket({
    userId: user?.username,
    receiverId: room?.artistId,
    onMessageReceive: (msg) => {
      const formattedMessage = {
        id: Date.now(),
        message: msg.content || "내용 없음",
        timestamp: msg.timestamp,
        isArtist: msg.sender === room.artistId,
        nickname: msg.nickname || "익명", // nickname을 제대로 처리
      };

      console.log("받은 메시지:", formattedMessage);
      setMessages((prev) => [...prev, formattedMessage]);
    },
  });

  useEffect(() => {
    if (!room) return;
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat-room/${room.id}/messages`);
        const loadedMessages = res.data.map((msg) => ({
          id: msg.id,
          message: msg.content,
          timestamp: msg.timestamp ?? null,
          isArtist: msg.sender === room.artistId,
          nickname: msg.sender === room.artistId ? room.artistName : room.userName,
        }));
        setMessages(loadedMessages);
      } catch (err) {
        console.error("메시지 로딩 실패:", err);
      }
    };
    fetchMessages();
  }, [room]);

  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) inputElement.focus();
  }, []);

  useEffect(() => {
    if (!isUserScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isScrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
      setIsUserScrolled(!isScrolledToBottom);
    }
  };

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

    const isArtistSender = user?.username === room?.artistId;
    const nickname = nicknameRef.current;

    if (!isConnected) {
      alert("서버와 연결 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const payload = {
      sender: user?.username,
      receiver: isArtistSender ? room?.userId : room?.artistId,
      content: newMessage,
      senderNickname: nickname,
    };

    sendMessage(payload);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: newMessage,
        timestamp: new Date().toISOString(),
        isArtist: isArtistSender,
        nickname: nickname,
      },
    ]);
    setNewMessage("");
    setSelectedFile(null);
  };

  console.log("user 객체 상태", user);

  const lastDate = messages.length
    ? new Date(messages[messages.length - 1].timestamp).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : null;

  return (
    <PageWrapper>
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
                <ProfileCircle $isArtist={true}>
                  {(room && (user?.isArtist ? room.artistName : room.userName))?.[0] ?? "?"}
                </ProfileCircle>
                <ProfileText>
                  {room && (user?.isArtist ? room.artistName : room.userName)}
                </ProfileText>
              </ProfileItem>
              <ProfileItem>
                <ProfileCircle $isArtist={false}>
                  {(room && (!user?.isArtist ? room.artistName : room.userName))?.[0] ?? "?"}
                </ProfileCircle>
                <ProfileText>
                  {room && (!user?.isArtist ? room.artistName : room.userName)}
                </ProfileText>
              </ProfileItem>
              <DateText>{lastDate ?? "????"}</DateText>
            </ProfileBox>
          </ProfileSection>

          <ChatSection>
            <ChatHeader>
              <ChatTitle>{user?.isArtist ? "USER와의 대화" : "ARTIST와의 대화"}</ChatTitle>
              <OnlineStatus>{isConnected ? "온라인" : "오프라인"}</OnlineStatus>
            </ChatHeader>

            <ChatMessages ref={chatMessagesRef} onScroll={handleScroll}>
              {messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id || `${msg.timestamp}-${index}`} // 고유한 키 사용
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isArtist={msg.isArtist}
                  file={msg.file}
                  nickname={msg.nickname}
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
    </PageWrapper>
  );
};

export default ChatRoom;
