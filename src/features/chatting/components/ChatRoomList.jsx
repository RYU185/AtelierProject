// src/pages/components/ChatRoomList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";

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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/chat-room/my");
        setRooms(res.data);
      } catch (err) {
        console.error("채팅방 목록 불러오기 실패:", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <RoomListContainer>
      {rooms.map((room) => (
        <RoomItem key={room.id} onClick={() => onSelectRoom(room)}>
          <RoomTitle>{room.artistName}</RoomTitle>
          <LastMessage>{room.lastMessage || "채팅을 시작해보세요."}</LastMessage>
        </RoomItem>
      ))}
    </RoomListContainer>
  );
};

export default ChatRoomList;
