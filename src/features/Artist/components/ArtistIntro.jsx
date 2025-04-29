import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);

    .artist-info {
      opacity: 1;
    }
  }

  pointer-events: auto;
`;

const ArtistImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: 0% 20%;
  border-radius: 8px;
  margin: 0;
  transition: object-position 20s ease;
`;

const ArtistInfo = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 2;
  padding: 0 20px 10px 20px;
  margin: 0;
  background-color: #111111;
  border-radius: 0 0 8px 8px;
`;

const ArtistName = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
`;

const CommunicateButton = styled(NavLink)`
  padding: 8px 16px;
  color: #ffffff;
  background-color: #111111;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.5s;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: #333;
  }
`;

const ArtistBio = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

const ArtistIntro = ({ artistId, userId, name, bio, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artist/${artistId}`);
  };

  const handleChat = async (e) => {
    e.stopPropagation();

    try {
      const res = await axiosInstance.post(`/chat-room/${userId}`);
      const room = res.data;

      const correctedRoom = {
        ...room,
        userId: room.userId,
        artistId: room.artistId,
        userName: name,
        artistName: name,
      };

      navigate(`/artist/${userId}/chat`, {
        state: { room: correctedRoom },
      });

    } catch (err) {
      console.error("채팅방 생성 실패:", err);
    }
  };

  return (
    <ArtistCard onClick={handleClick}>
      <ArtistImage src={imageUrl} alt={name} />
      <ArtistInfo className="artist-info">
        <ArtistName>{name}</ArtistName>
        <CommunicateButton as="button" onClick={handleChat}>
          작가와의 소통
        </CommunicateButton>
      </ArtistInfo>
      <ArtistBio>{bio}</ArtistBio>
    </ArtistCard>
  );
};

export default ArtistIntro;
