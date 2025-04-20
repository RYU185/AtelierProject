// src/pages/components/ChatRoomList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const RoomListContainer = styled.div`
  padding: 20px 40px;
`;

const RoomItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const RoomTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const LastMessage = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: #666;
`;

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/chat-room/my");
        console.log("서버 응답:", res.data);
        setRooms(res.data);
      } catch (err) {
        console.error("채팅방 목록 불러오기 실패:", err);
      }
    };  
    fetchRooms();
  }, []);

  const handleRoomClick = async (artistId) => {
    try {
      const res = await axiosInstance.post(`/chat-room/${artistId}`);
      onSelectRoom(res.data);
    } catch (err) {
      console.error("채팅방 생성 실패:", err);
    }
  };

  return (
    <RoomListContainer>
      {console.log("렌더링될 rooms:", rooms)}
      {rooms.map((room) => (
        <RoomItem key={`${room.id}-${room.artistId}`} onClick={() => handleRoomClick(room.artistId)}>
          <RoomTitle>{room.artistName}</RoomTitle>
          <LastMessage>{room.lastMessage || "채팅을 시작해보세요."}</LastMessage>
        </RoomItem>
      ))}
    </RoomListContainer>
  );
};

export default ChatRoomList;
