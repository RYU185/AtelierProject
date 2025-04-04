import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Autoplay,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const WhatsOnSection = styled.section`
  background: #fff;
  padding: 0;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 2500px;
  perspective-origin: 50% 50%;
`;

const Title = styled.h1`
  font-size: 140px;
  color: #000;
  margin: 0;
  padding: 20px 0;
  opacity: 0.06;
  font-weight: 900;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  white-space: nowrap;
  letter-spacing: -5px;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  transform-style: preserve-3d;

  .swiper {
    width: 100%;
    padding: 70px 0;
    overflow: visible;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .swiper-slide {
    width: 300px;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-style: preserve-3d;
    cursor: grab;
    transform-origin: center;
    backface-visibility: hidden;

    &:active {
      cursor: grabbing;
    }

    .slide-content {
      height: 420px;
      width: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: scale(0.85) translateZ(-50px);
      transition: transform 0.3s ease;
      will-change: transform;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
      box-shadow: none !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform-origin: center;
      backface-visibility: hidden;
      will-change: transform;
    }
  }

  .swiper-slide-active {
    opacity: 1;
    z-index: 1;

    .slide-content {
      transform: scale(1) translateY(-3px) translateZ(0);
    }

    img {
      box-shadow: none !important;
    }

    .event-info {
      opacity: 1;
      transform: translateY(20) translateZ(-150px);
    }
  }

  .swiper-slide-prev,
  .swiper-slide-next {
    opacity: 0.85;
    z-index: 2;
  }

  .swiper-slide-prev {
    transform: translate3d(20%, 0, 250px) rotateY(40deg) !important;
  }

  .swiper-slide-next {
    transform: translate3d(-20%, 0, 250px) rotateY(-40deg) !important;
  }

  .swiper-slide-prev-prev {
    transform: translate3d(58%, 0, 500px) rotateY(45deg) scale(1) !important;
    opacity: 0.9;
    z-index: 1;
  }
  .swiper-slide-next-next {
    transform: translate3d(-58%, 0, 500px) rotateY(-45deg) scale(1) !important;
    opacity: 0.85;
    z-index: 1;
  }
`;

const EventInfo = styled.div`
  text-align: center;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: translateY(12px);
  margin-top: 15px;
  color: #01000a;

  .title {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date {
    font-size: 20px;
    opacity: 0.7;
    font-weight: 300;
  }
`;

const WhatsOn = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const events = [
    {
      id: 1,
      image: "/images/event1.jpg",
      title: "그림1",
      date: "2025.05.17",
      location: "DW",
    },
    {
      id: 2,
      image: "/images/event2.jpg",
      title: "그림2",
      date: "2025.04.15",
      location: "블루스퀘어",
    },
    {
      id: 3,
      image: "/images/event3.jpg",
      title: "그림3",
      date: "2025.04.20",
      location: "블루스퀘어",
    },
    {
      id: 4,
      image: "/images/event4.jpg",
      title: "그림4",
      date: "2025.04.05",
      location: "SOL드림홀",
    },
    {
      id: 5,
      image: "/images/event5.jpg",
      title: "그림5t",
      date: "2025.05.01",
      location: "블루스퀘어",
    },
    {
      id: 6,
      image: "/images/event6.jpg",
      title: "그림6",
      date: "2025.05.10",
      location: "블루스퀘어",
    },
    {
      id: 7,
      image: "/images/event7.jpg",
      title: "그림7",
      date: "2025.05.15",
      location: "블루스퀘어",
    },
    {
      id: 8,
      image: "/images/event8.jpg",
      title: "그림8",
      date: "2025.05.20",
      location: "블루스퀘어",
    },
    {
      id: 9,
      image: "/images/event9.jpg",
      title: "그림9",
      date: "2025.05.25",
      location: "블루스퀘어",
    },
    {
      id: 10,
      image: "/images/event10.jpg",
      title: "그림10",
      date: "2025.05.30",
      location: "블루스퀘어",
    },
  ];

  return (
    <WhatsOnSection>
      <Title>WHAT'S ON</Title>
      <SliderContainer>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={5}
          initialSlide={2}
          speed={800}
          loop={true}
          loopedSlides={events.length}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Navigation, Autoplay, Mousewheel]}
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveIndex(realIndex);
            const slides = swiper.slides;

            slides.forEach((slide, index) => {
              slide.classList.remove(
                "swiper-slide-prev-prev",
                "swiper-slide-next-next"
              );

              if (index === swiper.activeIndex - 2) {
                slide.classList.add("swiper-slide-prev-prev");
              }

              if (index === swiper.activeIndex + 2) {
                slide.classList.add("swiper-slide-next-next");
              }
            });
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="slide-content">
                <img src={event.image} alt={event.title} />
              </div>
              <EventInfo className="event-info">
                <div className="title">{event.title}</div>
                <div className="date">
                  {event.date} | {event.location}
                </div>
              </EventInfo>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>
    </WhatsOnSection>
  );
};

export default WhatsOn;
