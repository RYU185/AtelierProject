import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SLIDE_INTERVAL = 5000;
const IMAGE_BASE_URL = "/images/ArtistGalleryIMG/";

const WhatsOnSection = styled.section`
  position: relative;
  min-height: 95vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 2500px;
  overflow-x: hidden;
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
  transform: translateY(-350px);
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
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const EventInfo = styled.div`
  position: absolute;
  bottom: -90px; /* 이미지와 간격 조절 */
  width: 100%;
  text-align: center;
  opacity: 0.8;
  cursor: pointer;
`;

const EventTitle = styled.div`
  font-size: 28px; /* 글씨 크기 더 키움 */
  font-weight: 600;
  color: #333;
  margin-bottom: 12px; /* 제목과 날짜 간 간격 조절 */
`;

const EventDate = styled.div`
  font-size: 20px; /* 글씨 크기 더 키움 */
  opacity: 0.7;
  color: #555;
`;

const getSlideStyle = (offset) => {
  const radius = 1200;
  const angle = offset * 26;
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
  const [artistGalleries, setArtistGalleries] = useState([]);
  const timeoutRef = useRef(null);
  const total = artistGalleries.length;
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const handleGalleryClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`); // 올바른 경로 템플릿 리터럴 사용
  };

  useEffect(() => {
    const fetchArtistGalleries = async () => {
      try {
        const response = await axios.get("/api/artistgallery");
        setArtistGalleries(response.data);
      } catch (error) {
        console.error("Error fetching artist galleries:", error);
      }
    };

    fetchArtistGalleries();
  }, []);

  useEffect(() => {
    if (artistGalleries.length > 0) {
      timeoutRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
      return () => clearInterval(timeoutRef.current);
    }
  }, [artistGalleries]);

  return (
    <WhatsOnSection>
      <Title>WHAT'S ON</Title>
      <SliderContainer>
        <SlideWrapper>
          {artistGalleries.map((gallery, i) => {
            let offset = i - index;
            const half = Math.floor(total / 2);
            if (offset < -half) offset += total;
            if (offset > half) offset -= total;

            const { transform, transformOrigin, opacity, zIndex } =
              getSlideStyle(offset);
            const displayDate =
              gallery.startDate && gallery.endDate
                ? `${new Date(
                    gallery.startDate
                  ).toLocaleDateString()} ~ ${new Date(
                    gallery.endDate
                  ).toLocaleDateString()}`
                : "";
            const imageUrl = gallery.posterUrl
              ? IMAGE_BASE_URL + gallery.posterUrl
              : "";

            return (
              <Slide
                key={gallery.id}
                style={{
                  transform,
                  transformOrigin,
                  opacity,
                  zIndex,
                  transition: "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
                onClick={() => handleGalleryClick(gallery.id)}
              >
                {imageUrl && <img src={imageUrl} alt={gallery.title} />}
                {offset === 0 && (
                  <EventInfo onClick={() => handleGalleryClick(gallery.id)}>
                    <EventTitle>{gallery.title}</EventTitle>
                    <EventDate>{displayDate}</EventDate>
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
