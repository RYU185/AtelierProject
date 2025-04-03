import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CarouselWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 80px 0;
  background: #fff;
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 100px;
  font-weight: 800;
  color: #d1d1d1;
  margin-bottom: 40px;
  position: absolute;
  top: 20px;
  left: 50px;

  @media (max-width: 768px) {
    font-size: 50px;
    left: 20px;
  }
`;

const Slider = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 2000px;
  user-select: none;
`;

const Card = styled.div`
  position: absolute;
  width: 280px;
  height: 420px;
  border-radius: 16px;
  overflow: hidden;
  background: #111;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BottomInfo = styled.div`
  margin-top: 30px;
  padding: 20px 40px;
  background: rgba(0, 34, 254, 0.76);
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: inline-block;
  transition: all 0.3s ease;

  h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;

const whatsOnData = [
  { title: "공연 1", img: "/images/poster1.jpg", date: "2025.04.12", place: "서울" },
  { title: "공연 2", img: "/images/poster2.jpg", date: "2025.05.10", place: "부산" },
  { title: "공연 3", img: "/images/poster3.jpg", date: "2025.06.20", place: "대구" },
  { title: "공연 4", img: "/images/poster4.jpg", date: "2025.07.01", place: "인천" },
  { title: "공연 5", img: "/images/poster5.jpg", date: "2025.08.15", place: "광주" },
];

// 무한 루프
const infiniteData = [...whatsOnData, ...whatsOnData, ...whatsOnData];

const WhatsOn = () => {
  const [centerIndex, setCenterIndex] = useState(whatsOnData.length);
  const startX = useRef(null);
  const dragging = useRef(false);
  const transitionEnabled = useRef(true);

  useEffect(() => {
    const timer = setInterval(() => {
      moveRight();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (centerIndex >= infiniteData.length - whatsOnData.length) {
      setTimeout(() => {
        transitionEnabled.current = false;
        setCenterIndex(whatsOnData.length);
      }, 500);
    }
    if (centerIndex <= whatsOnData.length - 1) {
      setTimeout(() => {
        transitionEnabled.current = false;
        setCenterIndex(infiniteData.length - whatsOnData.length - 1);
      }, 500);
    }
  }, [centerIndex]);

  const moveLeft = () => {
    transitionEnabled.current = true;
    setCenterIndex((prev) => prev - 1);
  };

  const moveRight = () => {
    transitionEnabled.current = true;
    setCenterIndex((prev) => prev + 1);
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    dragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? moveLeft() : moveRight();
      dragging.current = false;
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  return (
    <CarouselWrapper>
      <Title>WHAT’S ON</Title>
      <Slider
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {infiniteData.map((item, i) => {
          const offset = i - centerIndex;
          const translateX = offset * 280;
          const translateY = Math.abs(offset) * 8;
          const translateZ = Math.abs(offset) === 0 ? -250 : Math.abs(offset) === 1 ? -120 : 0;
          const scale = 1 + Math.abs(offset) * 0.08;
          const rotateY = offset * -15;

          return (
            <Card
              key={i}
              style={{
                transform: `
          translateX(${translateX}px)
          translateY(${translateY}px)
          translateZ(${translateZ}px)
          scale(${scale})
          rotateY(${rotateY}deg)
        `,
                zIndex: 10 - Math.abs(offset),
                transition: transitionEnabled.current ? "transform 0.5s ease" : "none",
              }}
            >
              <CardImage src={item.img} alt={item.title} />
            </Card>
          );
        })}
      </Slider>
      <BottomInfo>
        <h3>{infiniteData[centerIndex].title}</h3>
        <p>
          {infiniteData[centerIndex].date} | {infiniteData[centerIndex].place}
        </p>
      </BottomInfo>
    </CarouselWrapper>
  );
};

export default WhatsOn;
