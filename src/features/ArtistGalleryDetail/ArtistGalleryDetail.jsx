import React from "react";
import Header from "../Header";
import ArtistGalleryPoster from "./components/ArtistGalleryPoster";
import ArtistGalleryInformation from "./components/ArtistGalleryInformation";
import TicketButton from "./components/TicketButton";
import ArtList from "./components/ArtList";
import Footer from "../Footer";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
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

const ButtonDiv = styled.div`
  width: 65%;
  margin: 0 auto;
  margin-top: 50px;
`;
const Button = styled.button`
  background-color: #ebf2ff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  &:hover {
    background-color: #b0c1e1;
  }
`;

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  border-top: 1.5px solid #bababa;
  padding-top: 50px;
  display: flex;
`;
const PosterBox = styled.div`
  width: 30%;
  height: 500px;
  border-right: 1.3px solid #bababa;
  padding-left: 40px;
`;

const InfoBox = styled.div`
  width: 70%;
  padding-left: 20px;
`;
const Box = styled.div`
  margin-top: 130px;
  margin-bottom: 150px;
  & h1 {
    text-align: center;
  }
`;

function ArtistGalleryDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <TitleContainer>
        <BackTitle>ARTIST GALLERY</BackTitle>
        <Title>ARTIST GALLERY</Title>
      </TitleContainer>
      <ButtonDiv>
        <Button onClick={() => navigate("/gallery/artistgallery")}>
          {" "}
          &lt; 목록 보기
        </Button>
      </ButtonDiv>
      <Container>
        <PosterBox>
          <ArtistGalleryPoster />
          <TicketButton />
        </PosterBox>
        <InfoBox>
          <ArtistGalleryInformation />
        </InfoBox>
      </Container>
      <Box>
        <h1>참여 작품</h1>
        <ArtList />
      </Box>
    </div>
  );
}

export default ArtistGalleryDetail;
