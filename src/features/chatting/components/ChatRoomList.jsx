import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext";
import Header from "../../Header";
import Footer from "../../Footer";

const RoomListContainer = styled.div`
  padding: 20px 40px;
  height: 100vh;
  width: 50%;
  margin: 0 auto;
`;

const ChatListH2 = styled.div`
  font-size: 56px;
  font-weight: 600;
  color: #e1e1e1;
`;

const RoomItem = styled.div`
  padding: 20px;
  border-radius: 4px 4px 0 0;

  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #008cff;
    p {
      color: #eee;
    }
  }
`;

const RoomTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #ffffff;
`;

const LastMessage = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: #d3d3d3;
`;

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user?.username;
  const isArtist = user?.isArtist;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/chat-room/my");
        const filtered = res.data.filter((room) => room.userId !== room.artistId);
        setRooms(filtered);
      } catch (err) {
        console.error("채팅방 목록 불러오기 실패:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (room) => {
    console.log("선택된 채팅방 객체:", room);
    onSelectRoom(room);
  };

  return (
    <>
      <Header />
      <RoomListContainer>
        <ChatListH2>CHAT ROOM LIST</ChatListH2>
        {rooms.map((room) => {
          const displayName = isArtist ? room.userName : room.artistName;
          return (
            <RoomItem key={`${room.id}-${room.artistId}`} onClick={() => handleRoomClick(room)}>
              <RoomTitle>{displayName}</RoomTitle>
              <LastMessage>{room.lastMessage || "채팅을 시작해보세요."}</LastMessage>
            </RoomItem>
          );
        })}
      </RoomListContainer>
      <Footer />
    </>
  );
};

export default ChatRoomList;
