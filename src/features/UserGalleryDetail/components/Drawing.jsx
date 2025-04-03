import React from "react";
import styled from "styled-components";

const DrawingContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const DrawingImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
`;

function Drawing({ image, title }) {
  return (
    <DrawingContainer>
      <DrawingImage src={image} alt={title} />
    </DrawingContainer>
  );
}

export default Drawing;
