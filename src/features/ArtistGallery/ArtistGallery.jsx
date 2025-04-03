import React from "react";
import Datacontrol from "./components/Datacontrol";
import ArtistGalleryLsit from "./components/ArtistGalleryLsit";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

function ArtistGallery() {
  return (
    <div>
      <TitleContainer>
        <BackTitle>ARTIST GALLERY</BackTitle>
        <Title>ARTIST GALLERY</Title>
      </TitleContainer>
      <Datacontrol />
      <ArtistGalleryLsit />
    </div>
  );
}

export default ArtistGallery;
