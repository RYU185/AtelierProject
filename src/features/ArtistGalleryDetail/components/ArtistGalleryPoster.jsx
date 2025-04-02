import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 20px;
`;

function ArtistGalleryPoster() {
  return (
    <div>
      <Img
        src="/src/assets/ArtistGalleryIMG/삶의 예찬.jpg"
        alt="아티스트 갤러리 "
      />
    </div>
  );
}

export default ArtistGalleryPoster;
