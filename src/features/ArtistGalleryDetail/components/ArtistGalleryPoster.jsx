import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 20px;
`;

function ArtistGalleryPoster({ url }) {
  return (
    <div>
      <Img src={url} alt="아티스트 갤러리 포스터" />
    </div>
  );
}

export default ArtistGalleryPoster;
