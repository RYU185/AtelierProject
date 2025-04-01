import React from 'react';
import styled from 'styled-components';

const CardWrap = styled.div`
  width: 280px;
  border: none;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

const Info = styled.div`
  text-align: center;
  margin-top: 10px;
`;

function ArtCard({ title, artist, date, imageUrl }) {
  return (
    <CardWrap>
      <Img src={imageUrl} alt={title} />
      <Info>
        <h3>{title}</h3>
        <p>{artist}</p>
        <p>{date}</p>
      </Info>
    </CardWrap>
  );
}

export default ArtCard;
