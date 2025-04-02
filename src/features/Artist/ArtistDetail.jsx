import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const ArtistDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <TitleContainer>
        <BackTitle>ARTIST {id}</BackTitle>
        <Title>ARTIST {id}</Title>
      </TitleContainer>
    </div>
  );
};

export default ArtistDetail;