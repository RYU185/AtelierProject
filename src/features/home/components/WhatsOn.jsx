import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CarouselWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 100px 0 60px;
  background: #fff;
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 800;
  color: #000;
  margin-bottom: 40px;
`;

const Slider = styled.div`
  position: relative;
  margin: 0 auto;
  width: 1000px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 2000px;
  user-select: none;
  overflow-x: auto; // ✅ 가로 넘침 허용
  overflow: visible;
`;

const Card = styled.div`
  position: absolute;
  width: 400px;
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  background: #111;
  transform-style: preserve-3d;
  transition: transform 0.6s ease, opacity 0.6s ease;
  opacity: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CenterText = styled.div`
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.6;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #000;
  color: #fff;
  border: none;
  padding: 12px 18px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;

  &:hover {
    background: #333;
  }

  ${({ direction }) => (direction === "left" ? `left: 20px;` : `right: 20px;`)}
`;
const BottomInfo = styled.div`
  margin-top: 40px;
  padding: 40px 100px;
  background: rgba(0, 34, 254, 0.76);
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: inline-block;
  transition: all 0.3s ease;

  h3 {
    font-size: 30px;
    font-weight: 800;
    margin: 0 0 10px;
  }

  p {
    margin: 0;
    font-size: 18px;
  }
`;

// ✅ 데이터
const whatsOnData = [
  {
    title: "이건무슨그림0",
    img: "/images/poster1.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림1",
    img: "/images/poster2.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림2",
    img: "/images/poster3.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림3",
    img: "/images/poster4.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림4",
    img: "/images/poster5.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림5",
    img: "/images/poster6.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림6",
    img: "/images/poster7.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림7",
    img: "/images/poster8.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림8",
    img: "/images/poster9.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
  {
    title: "이건무슨그림9",
    img: "/images/poster10.jpg",
    date: "TEAM.ACADEMY",
    place: "대전 중구 전시장",
  },
];

// ✅ 컴포넌트
const WhatsOn = () => {
  const [centerIndex, setCenterIndex] = useState(2);
  const startX = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      moveRight();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const moveLeft = () => {
    setCenterIndex((prev) => (prev === 0 ? whatsOnData.length - 1 : prev - 1));
  };

  const moveRight = () => {
    setCenterIndex((prev) => (prev + 1) % whatsOnData.length);
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    dragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    if (delta > 50) moveLeft();
    else if (delta < -50) moveRight();
    dragging.current = false;
  };

  return (
    <CarouselWrapper>
      <Title>WHAT’S ON</Title>
      <Slider
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => (dragging.current = false)}
      >
        {whatsOnData.map((item, i) => {
          const offset = i - centerIndex;

          const translateX = offset * 500;
          const rotateY = offset * -30;
          const scale = offset === 0 ? 1.1 : 0.95;

          return (
            <Card
              key={i}
              style={{
                transform: `
            translateX(${translateX}px)
            rotateY(${rotateY}deg)
            scale(${scale})
          `,
                opacity: 1,
                zIndex: 10 - Math.abs(offset),
              }}
            >
              <CardImage src={item.img} alt={item.title} />
            </Card>
          );
        })}
      </Slider>
      <BottomInfo>
        <h3>{whatsOnData[centerIndex].title}</h3>
        <p>📅 {whatsOnData[centerIndex].date}</p>
      </BottomInfo>
    </CarouselWrapper>
  );
};

export default WhatsOn;
