import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 20px;
`;

function UserGalleryPoster({ url }) {
  return (
    <div>
      <Img src={url} alt="유저 갤러리 포스터  " />
    </div>
  );
}

export default UserGalleryPoster;
