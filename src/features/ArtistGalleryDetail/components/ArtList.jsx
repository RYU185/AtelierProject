import React, { useState } from "react";
import Art from "./Art";
import styled from "styled-components";

const ArtListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ArtButton = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  color: #018ec8;
  cursor: pointer;
`;

const ArtDetails = styled.div`
  text-align: center;
  margin: 0 20px;
`;

const ArtTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0 5px;
`;

const ArtArtist = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ArtDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

function ArtList() {
  const artData = [
    {
      imageUrl: "/images/museum.jpg",
      title: "정오",
      artist: "곽두팔 화백",
      date: "2024.01.13",
    },
    {
      imageUrl: "/images/poster1.jpg",
      title: "자정",
      artist: "김철용 작가",
      date: "2024.02.15",
    },
    {
      imageUrl: "/images/poster2.jpg",
      title: "2PM",
      artist: "박용팔 화백",
      date: "2024.02.15",
    },
    {
      imageUrl: "/images/poster3.jpg",
      title: "2AM",
      artist: "강진철 작가",
      date: "2024.02.15",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ArtListContainer>
      <ArtInfoContainer>
        <ArtButton onClick={handlePrev}>&lt;</ArtButton>

        <ArtButton onClick={handleNext}>&gt;</ArtButton>
      </ArtInfoContainer>
      <Art {...artData[currentIndex]} />
    </ArtListContainer>
  );
}

export default ArtList;
