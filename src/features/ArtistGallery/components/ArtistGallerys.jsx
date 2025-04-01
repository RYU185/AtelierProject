import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  border: none;
  margin-top: 40px;
  display: flex;
  cursor: pointer;
`;

const Img = styled.img`
  width: 180px;
  object-fit: cover;
  border-radius: 20px;
  margin-right: 40px;
  margin-left: 100px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const ArtistGalleryIntro = styled.div`
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

function ArtistGallerys({ id, imageUrl, title, date, artists, description }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate(`/gallery/artistgallery/${id}`); // 클릭 시 ArtistGalleryDetail로 이동
  };

  return (
    <Container onClick={handleClick}>
      {" "}
      {/* 클릭 이벤트 핸들러 추가 */}
      <Img src={imageUrl} alt="아티스트 갤러리 " />
      <ArtistGalleryIntro>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <h3>{artists}</h3>
        <p>{description}</p>
      </ArtistGalleryIntro>
    </Container>
  );
}

export default ArtistGallerys;
