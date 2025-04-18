import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";
import ChatRoomList from "../components/ChatRoomList";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
`;

const Header = styled.div`
  padding: 30px 40px;
  text-align: center;
  border-bottom: 1px solid #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 40px;
  background: #0095e1;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #0084ca;
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: normal;
`;

const ChattingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoom, setSelectedRoom] = useState(location.state?.room ?? null);

  return (
    <PageContainer>
      <Header>
        <Title>Chatting with ARTIST</Title>
        <BackButton onClick={() => navigate("/artist")}>Artist List</BackButton>
      </Header>
      {!selectedRoom ? (
        <ChatRoomList onSelectRoom={(room) => setSelectedRoom(room)} />
      ) : (
        <ChatRoom room={selectedRoom} />
      )}
    </PageContainer>
  );
};

export default ChattingPage;
