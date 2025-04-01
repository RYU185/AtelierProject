import React from "react";
import UserGallerys from "./UserGallerys";
import styled from "styled-components";

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 1200px;
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

function UserGalleryList() {
  const galleryItems = [
    {
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
    {
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
    {
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
    {
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
    {
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
  ];

  return (
    <div>
      <GalleryGrid>
        {galleryItems.map((item, index) => (
          <UserGallerys key={index} {...item} />
        ))}
      </GalleryGrid>
    </div>
  );
}

export default UserGalleryList;
