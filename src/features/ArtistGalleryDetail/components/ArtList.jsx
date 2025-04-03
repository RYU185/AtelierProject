import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Art from "./Art";

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
      title: "밤의 항구",
      artist: "곽두팔 화백",
      date: "2024.03.15",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
