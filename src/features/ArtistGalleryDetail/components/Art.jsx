import React from "react";
import styled from "styled-components";

const ArtContainer = styled.div`
  text-align: center;
`;

const ArtImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const ArtTitle = styled.h3`
  margin-top: 10px;
`;

const ArtArtist = styled.p`
  color: #888;
`;

const ArtDate = styled.p`
  color: #888;
`;

function Art({ image, title, artist, date }) {
  return (
    <ArtContainer>
      <ArtImage src={image} alt={title} />
      <ArtTitle>{title}</ArtTitle>
      <ArtArtist>{artist}</ArtArtist>
      <ArtDate>{date}</ArtDate>
    </ArtContainer>
  );
}

export default Art;
