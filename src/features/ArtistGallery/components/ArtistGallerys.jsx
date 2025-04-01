import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  border: none;
  margin-top: 40px;
  display: flex;
`;

const Img = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 20px;
  margin-right: 40px;
`;

const ArtistGalleryIntro = styled.div`
  & h1 {
    font-size: 45px;
    color: #1e1e1e;
  }
  & h2 {
    font-size: 25px;
    color: #606060;
    margin-top: 10px;
  }
  & h3 {
    font-size: 20px;
    color: #606060;
    margin-top: 10px;
  }
  & p {
    font-size: 15px;
    color: #606060;
    margin-top: 10px;
  }
`;

function ArtistGallerys() {
  return (
    <div>
      <Container>
        <Img
          src="/src/assets/ArtistGalleryIMG/삶의 예찬.jpg"
          alt="아티스트 갤러리 "
        />
        <ArtistGalleryIntro>
          <h1>삶의 예찬</h1>
          <h2>2025.01.20 ~ 2025.02.01</h2>
          <h3>곽두팔 화백, 김철용 화백</h3>
          <p>
            아티스트 갤러리 포스터 설명아티스트 갤러리 포스터 설명 아티스트
            갤러리 포스터 설명 아티스트 갤러리 포스터 설명 아티스트 갤러리
            포스터 설명 아티스트 갤러리 포스터 설명 아티스트 갤러리 포스터 설명
            아티스트 갤러리 포스터 설명 아티스트 갤러리 포스터 설명 아티스트
            갤러리 포스터 설명 아티스트 갤러리 포스터 설명 아티스트 갤러리
            포스터 설명 아티스트 갤러리 포스터 설명 아티스트 갤러리 포스터 설명
            아티스트 갤러리 포스터 설명
          </p>
        </ArtistGalleryIntro>
      </Container>
    </div>
  );
}

export default ArtistGallerys;
