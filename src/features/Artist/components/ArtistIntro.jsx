import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9; 
  object-fit: cover;
  object-position: 0% 20%;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: object-position 20s ease;
`;

const ArtistName = styled.h2`
  font-size: 24px;
  margin: 10px 0;
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
      <ArtistName>{name}</ArtistName>
      <ArtistBio>{bio}</ArtistBio>
    </ArtistCard>
  );
};

export default ArtistIntro; 