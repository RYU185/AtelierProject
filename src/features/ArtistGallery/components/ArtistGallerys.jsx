import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center; 
  cursor: pointer;
  border: 1px solid #53535334;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(0.99);
  }
`;

const Img = styled.img`
  width: 220px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 40px;
  flex-shrink: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const ArtistGalleryIntro = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 40px;

  & h1 {
    font-size: 26px;
    color: #e6e6e6;
  }

  & h2 {
    font-size: 18px;
    color: #e6e6e6;
    margin-top: 10px;
  }

  & h3 {
    font-size: 16px;
    color: #cfcfcf;
    margin-top: 10px; 
  }

  & p {
    font-size: 14px;
    color: #dadada;
    overflow: hidden;
    text-overflow: ellipsis;
    
  }
`;

function ArtistGallerys({ id, imageUrl, title, date, artists, description }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Img src={imageUrl} alt={title} />
      <ArtistGalleryIntro>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <h3>{artists}</h3>
        <p>{description}</p>
      </ArtistGalleryIntro>
    </Container>
  );
}

export default ArtistGallerys;
