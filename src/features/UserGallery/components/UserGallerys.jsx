import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  border: none;
  margin-top: 40px;
  display: flex;
`;

const Img = styled.img`
  width: 180px;
  object-fit: cover;
  border-radius: 20px;
  margin-right: 40px;
  margin-left: 100px;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const UserGalleryIntro = styled.div`
  & h1 {
    font-size: 35px;
    color: #1e1e1e;
  }
  & h2 {
    font-size: 20px;
    color: #606060;
    margin-top: 10px;
  }
  & h3 {
    font-size: 18px;
    color: #606060;
    margin-top: 10px;
  }
  & p {
    font-size: 14px;
    color: #606060;
    margin-top: 10px;
  }
`;

function UserGallerys({ imageUrl, title, date, artists, description }) {
  console.log("UserGallerys 컴포넌트 렌더링:", {
    imageUrl,
    title,
    date,
    artists,
    description,
  });
  return (
    <div>
      <Container>
        <Img
          src={imageUrl || "/src/assets/ArtistGalleryIMG/산업디자인.jpg"}
          alt={title || "유저 갤러리"}
        />
        <UserGalleryIntro>
          <h1>{title || "산업 디자인"}</h1>
          <h2>{date || "2025.01.20 ~ 2025.02.01"}</h2>
          <h3>{artists || "곽두팔 화백, 김철용 화백"}</h3>
          <p>{description || "아티스트 갤러리 포스터 설명..."}</p>
        </UserGalleryIntro>
      </Container>
    </div>
  );
}

export default UserGallerys;
