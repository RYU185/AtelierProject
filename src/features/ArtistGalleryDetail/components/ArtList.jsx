import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Art from "./Art";

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "❮";
    font-size: 35px;
    font-weight: bold;
    color: #018ec8;
  }

  &:hover:before {
    color: #007acc;
  }
`;

const LeftButton = (props) => {
  const { onClick } = props;
  return <ArrowButton onClick={onClick} style={{ left: "155px" }} />;
};

const RightButton = (props) => {
  const { onClick } = props;
  return (
    <ArrowButton
      onClick={onClick}
      style={{ right: "155px", transform: "translateY(-50%) rotate(180deg)" }}
    />
  );
};

function ArtList() {
  const artWorks = [
    {
      image: "/images/poster5.jpg",
      title: "정오",
      artist: "곽두팔 화백",
      date: "2024.01.13",
    },
    {
      image: "/images/poster6.jpg",
      title: "저녁 노을",
      artist: "곽두팔 화백",
      date: "2024.02.20",
    },
    {
      image: "/images/poster7.jpg",
      title: "밤의 항구",
      artist: "곽두팔 화백",
      date: "2024.03.15",
    },
    {
      image: "/images/poster8.jpg",
      title: "새벽 바다",
      artist: "곽두팔 화백",
      date: "2024.04.05",
    },
  ];

  const settings = {
    infinite: true, // 무한 루프
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
  };

  return (
    <Slider {...settings}>
      {artWorks.map((art, index) => (
        <div key={index}>
          <Art
            image={art.image}
            artist={art.artist}
            title={art.title}
            date={art.date}
          />
        </div>
      ))}
    </Slider>
  );
}

export default ArtList;
