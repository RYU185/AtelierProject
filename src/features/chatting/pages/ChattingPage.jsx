import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";
import ChatRoomList from "../components/ChatRoomList";
import { useAuth } from "../../../components/AuthContext";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.07);
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

const ChattingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoom, setSelectedRoom] = useState(
    location.state?.room ?? null
  );
  const { user } = useAuth();

  if (!user?.isArtist) {
    return <div>접근 권한이 없습니다.</div>;
  }

  return (
    <GradientBackground>
      <BackButton onClick={() => navigate("/artist")}>Artist List</BackButton>

      {!selectedRoom ? (
        <ChatRoomList onSelectRoom={setSelectedRoom} />
      ) : (
        <ChatRoom room={selectedRoom} />
      )}
    </GradientBackground>
  );
};

export default ChattingPage;
