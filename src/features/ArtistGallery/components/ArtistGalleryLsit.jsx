import React from "react";
import styled from "styled-components";
import ArtistGallerys from "./ArtistGallerys";

const Container = styled.div`
  width: 94%;
`;
const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 1000px;
  margin-top: 70px;
  margin-bottom: 70px;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #018ec8;
    border-radius: 5px;
    max-height: 30px;
  }
`;

function ArtistGalleryLsit() {
  const galleryItems = [
    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },

    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },

    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },

    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
  ];

  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item, index) => (
          <ArtistGallerys key={index} {...item} /> // ArtistGallerys 컴포넌트 사용
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default ArtistGalleryLsit;
