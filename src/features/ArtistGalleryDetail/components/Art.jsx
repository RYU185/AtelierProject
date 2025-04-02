import React from "react";
import styled from "styled-components";

const ArtContainer = styled.div``;
const Box = styled.div`
  width: 700px;
  height: 700px;
  margin: 20px;
  text-align: center;
  border: 2px solid #018ec8;
`;

const ArtImage = styled.img`
  object-fit: cover;
  width: 60%;
  margin: 0 auto;
`;

const ArtBox = styled.div`
  text-align: center;
  margin-bottom: 150px;
`;
const ArtTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0 5px;
`;

const ArtArtist = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ArtDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

function Art({ imageUrl, title, artist, date }) {
  return (
    <ArtContainer>
      <Box>
        <ArtImage src={imageUrl} alt={title} />
      </Box>
      <ArtBox>
        <ArtTitle>{title}</ArtTitle>
        <ArtArtist>{artist}</ArtArtist>
        <ArtDate>{date}</ArtDate>
      </ArtBox>
    </ArtContainer>
  );
}

export default Art;
