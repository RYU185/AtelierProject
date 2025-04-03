import React from "react";
import styled from "styled-components";

const ArtContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const ArtImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
`;

function Art({ image, title }) {
  return (
    <ArtContainer>
      <ArtImage src={image} alt={title} />
    </ArtContainer>
  );
}

export default Art;
