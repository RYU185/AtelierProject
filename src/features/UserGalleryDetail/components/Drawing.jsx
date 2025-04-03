import React from "react";
import styled from "styled-components";

const DrawingContainer = styled.div`
  text-align: center;
`;

const DrawingImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const DrawingTitle = styled.h3`
  margin-top: 10px;
`;

const DrawingUser = styled.p`
  color: #888;
  margin: 5px;
`;

const DrawingDate = styled.p`
  color: #888;
  margin: 5px;
`;

function Drawing({ image, title, user, date }) {
  return (
    <DrawingContainer>
      <DrawingImage src={image} alt={title} />
      <DrawingTitle>{title}</DrawingTitle>
      <DrawingUser>{user}</DrawingUser>
      <DrawingDate>{date}</DrawingDate>
    </DrawingContainer>
  );
}

export default Drawing;
