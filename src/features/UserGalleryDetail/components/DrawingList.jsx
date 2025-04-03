import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Drawing from "./Drawing";

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

function DrawingList() {
  const artWorks = [
    {
      image: "/src/assets/UserDrawingIMG/Drawing.jpg",
      title: "발자취",
      artist: "김말자",
      date: "2024.01.13",
    },
    {
      image: "/src/assets/UserDrawingIMG/Drawing1.png",
      title: "추구미",
      artist: "최미숙",
      date: "2024.02.20",
    },
    {
      image: "/src/assets/UserDrawingIMG/Drawing2.png",
      title: "카우걸",
      artist: "이미자",
      date: "2024.03.15",
    },
    {
      image: "/src/assets/UserDrawingIMG/Drawing3.png",
      title: "단잠",
      artist: "최민지",
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
      {artWorks.map((user, index) => (
        <div key={index}>
          <Drawing
            image={user.image}
            artist={user.user}
            title={user.title}
            date={user.date}
          />
        </div>
      ))}
    </Slider>
  );
}

export default DrawingList;
