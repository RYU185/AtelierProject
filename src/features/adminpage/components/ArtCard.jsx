import React from 'react';
import styled from 'styled-components';

const CardWrap = styled.div`
  width: 280px;
  border: none;
  margin: 0 auto;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  text-align: center;
  margin-top: 10px;
  cursor: default;
`;

function ArtCard({ title, artist, date, imageUrl, onImageClick }) {
  return (
    <CardWrap>
      <Img src={imageUrl} alt={title} onClick={onImageClick} /> {/* 이미지에 클릭 이벤트 추가 */}
      <Info>
        <h3>{title}</h3>
        <p>{artist}</p>
        <p>{date}</p>
      </Info>
    </CardWrap>
  );
}

export default ArtCard;
