import React from "react";
import styled from "styled-components";
import ArtistGallerys from "./ArtistGallerys";

const Container = styled.div`
  width: 94%;
`;
const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 1000px;
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

function ArtistGalleryLsit({ galleryItems = [] }) {
  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item, index) => (
          <ArtistGallerys key={index} {...item} />
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default ArtistGalleryLsit;
