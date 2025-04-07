import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const events = [
  { id: 1, image: "/images/event1.jpg", title: "그림1", date: "2025.05.17", location: "DW" },
  { id: 2, image: "/images/event2.jpg", title: "그림2", date: "2025.04.15", location: "블루스퀘어" },
  { id: 3, image: "/images/event3.jpg", title: "그림3", date: "2025.04.20", location: "블루스퀘어" },
  { id: 4, image: "/images/event4.jpg", title: "그림4", date: "2025.04.05", location: "SOL드림홀" },
  { id: 5, image: "/images/event5.jpg", title: "그림5", date: "2025.05.01", location: "블루스퀘어" },
  { id: 6, image: "/images/event6.jpg", title: "그림6", date: "2025.05.10", location: "블루스퀘어" },
  { id: 7, image: "/images/event7.jpg", title: "그림7", date: "2025.05.15", location: "블루스퀘어" },
  { id: 8, image: "/images/event8.jpg", title: "그림8", date: "2025.05.20", location: "블루스퀘어" },
  { id: 9, image: "/images/event9.jpg", title: "그림9", date: "2025.05.25", location: "블루스퀘어" },
  { id: 10, image: "/images/event10.jpg", title: "그림10", date: "2025.05.30", location: "블루스퀘어" },
];

const SLIDE_INTERVAL = 5000;

const WhatsOnSection = styled.section`
  position: relative;
  min-height: 90vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 2500px;
`;

const Title = styled.h1`
  font-size: 140px;
  opacity: 0.06;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-weight: 900;
  white-space: nowrap;
  letter-spacing: -5px;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  perspective: 2000px;
  perspective-origin: center 100%;
  transform: translateY(-350px)
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  transform-style: preserve-3d;
`;

const Slide = styled.div`
  position: absolute;
  width: 500px;
  height: 700px;
  border-radius: 16px;
  overflow: visible;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform, opacity;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const EventInfo = styled.div`
  position: absolute;
  bottom: -70px;
  width: 100%;
  text-align: center;
  opacity: 0.8;

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .date {
    font-size: 16px;
    opacity: 0.7;
  }
`;

const getSlideStyle = (offset) => {
  const radius = 1200;
  const angle = offset * 26
  const rad = (Math.PI / 180) * angle;

  const x = Math.sin(rad) * radius;
  const z = Math.cos(rad) * radius;

  return {
    transform: `
      translateX(${x}px)
      translateZ(${-z}px)
      rotateY(${-angle}deg)
    `,
    zIndex: 10 - Math.abs(offset),
    opacity: Math.abs(offset) > 3 ? 0 : 1,
  };
};


export default function WhatsOn() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const total = events.length;

  const nextSlide = () => setIndex((prev) => (prev + 1) % total);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => timeoutRef.current && clearInterval(timeoutRef.current);
  }, []);

  return (
    <WhatsOnSection>
      <Title>WHAT'S ON</Title>
      <SliderContainer>
        <SlideWrapper>
          {events.map((event, i) => {
            let offset = i - index;
            const half = Math.floor(total / 2);
            if (offset < -half) offset += total;
            if (offset > half) offset -= total;

            const { transform, transformOrigin, opacity, zIndex } = getSlideStyle(offset);

            return (
              <Slide
                key={event.id}
                style={{
                  transform,
                  transformOrigin,
                  opacity,
                  zIndex,
                  transition: "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
              >
                <img src={event.image} alt={event.title} />
                {offset === 0 && (
                  <EventInfo>
                    <div className="title">{event.title}</div>
                    <div className="date">
                      {event.date} | {event.location}
                    </div>
                  </EventInfo>
                )}
              </Slide>
            );
          })}
        </SlideWrapper>
      </SliderContainer>
    </WhatsOnSection>
  );
}
