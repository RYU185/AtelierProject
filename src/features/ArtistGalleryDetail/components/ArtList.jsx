import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Art from "./Art";

const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  text-align: center;
  position: relative;
  width: 1400px;
  height: 600px;
  margin: 0 auto;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  animation: ${fadeInSlide} 0.6s ease-in-out;
  width: 100%;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 20px 30px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  color: #018ec8;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #ebf2ff;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: -80px;
`;

const RightButton = styled(NavigationButton)`
  right: -80px;
`;

function ArtList() {
  const artWorks = [
    {
      image: "/src/assets/ArtIMG/Art1.jpg",
      title: "정오",
      artist: "곽두팔 화백",
      date: "2024.01.13",
    },
    {
      image: "/src/assets/ArtIMG/Art3.png",
      title: "저녁 노을",
      artist: "곽두팔 화백",
      date: "2024.02.20",
    },
    {
      image: "/src/assets/ArtIMG/Art2.jpg",
      title: "밤의 항구",
      artist: "곽두팔 화백",
      date: "2024.03.15",
    },
    {
      image: "/src/assets/ArtIMG/Art4.jpg",
      title: "새벽 바다",
      artist: "곽두팔 화백",
      date: "2024.04.05",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artWorks.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artWorks.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container>
      <LeftButton onClick={prevImage}>❮</LeftButton>
      <ImageWrapper key={currentIndex}>
        <Art image={artWorks[currentIndex].image} />
      </ImageWrapper>
      <RightButton onClick={nextImage}>❯</RightButton>
    </Container>
  );
}

export default ArtList;
