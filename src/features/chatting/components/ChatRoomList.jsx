import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext";

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
  const { user } = useAuth();
  const currentUserId = user?.username;
  const isArtist = user?.isArtist;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/chat-room/my");
        console.log("서버 응답:", res.data);

        const filteredRooms = res.data.filter(
          (room) => room.userId !== room.artistId
        );

        setRooms(filteredRooms);
      } catch (err) {
        console.error("채팅방 목록 불러오기 실패:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (room) => {
    onSelectRoom(room);
  };

  return (
    <RoomListContainer>
      {rooms.map((room) => {
        const displayName = isArtist ? room.userName : room.artistName;

        return (
          <RoomItem
            key={`${room.id}-${room.artistId}`}
            onClick={() => handleRoomClick(room)}
          >
            <RoomTitle>{displayName}</RoomTitle>
            <LastMessage>
              {room.lastMessage || "채팅을 시작해보세요."}
            </LastMessage>
          </RoomItem>
        );
      })}
    </RoomListContainer>
  );
};

export default ChatRoomList;
