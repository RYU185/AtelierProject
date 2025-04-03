import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  pointer-events: none;
`;

const ArtistName = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
`;

const CommunicateButton = styled.button`
  padding: 8px 16px;
  color: #ffffff;
  background-color: #111111;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.5s;
  font-weight: bold;

  &:hover {
    color: #ffffff;
  }
`;

const ArtistBio = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

const ArtistIntro = ({ id, name, bio, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artist/${id}`);
  };

  return (
    <ArtistCard onClick={handleClick}>
      <ArtistImage src={imageUrl} alt={name} />
      <ArtistInfo className="artist-info">
        <ArtistName>{name}</ArtistName>
        <CommunicateButton>작가와의 소통</CommunicateButton>
      </ArtistInfo>
      <ArtistBio>{bio}</ArtistBio>
    </ArtistCard>
  );
};

export default ArtistIntro;
