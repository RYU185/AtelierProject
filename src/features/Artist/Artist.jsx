import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import ArtistIntro from "./components/ArtistIntro";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`;

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 7.25rem ;
  padding-bottom: 7.25rem;
`;

const BackTitle = styled.h1`
  font-size: 180px;
  text-align: center;
  color: #8d8d8d26;
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
  color: #f0f0f0;
`;

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
  padding-bottom: 5rem;
`;

const Artist = () => {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axiosInstance.get("/artist");
        setArtist(res.data);
      } catch (err) {
        console.error("작가 목록 불러오기 실패:", err);
      }
    };
    fetchArtist();
  }, []);

  return (
    <GradientBackground>
      <Header />
      <TitleContainer>
        <BackTitle>ARTIST</BackTitle>
        <Title>ARTIST</Title>
      </TitleContainer>
      <ArtistContainer>
        {artist.map((a) => (
          <ArtistIntro
            key={a.userId}
            artistId={a.id}
            userId={a.userId}
            name={a.name}
            imageUrl={`/images/ArtistIMG/${a.profile_img}`}
          />
        ))}
      </ArtistContainer>
      <Footer />
    </GradientBackground>
  );
};

export default Artist;
