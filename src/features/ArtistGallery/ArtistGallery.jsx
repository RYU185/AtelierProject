import React from "react";
import Datacontrol from "./components/Datacontrol";
import ArtistGalleryLsit from "./components/ArtistGalleryLsit";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
`;
const BackTitle = styled.h1`
  font-size: 140px;
  text-align: center;
  color: #deeaff;
  padding-top: 100px;
  margin-bottom: 0px;
`;
const Title = styled.h1`
  font-size: 90px;
  text-align: center;
  margin-top: -130px;
  margin-bottom: 150px;
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
