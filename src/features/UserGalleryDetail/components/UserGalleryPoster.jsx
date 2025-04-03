import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 20px;
`;

function UserGalleryPoster() {
  return (
    <div>
      <Img
        src="/src/assets/ArtistGalleryIMG/산업디자인.jpg"
        alt="유저 갤러리 "
      />
    </div>
  );
}

export default UserGalleryPoster;
