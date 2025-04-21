import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import ArtistIntro from "./components/ArtistIntro";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 50px;
  margin-top: 78px;
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

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  width: 70%;
  margin: 0 auto;
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
    <div>
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
    </div>
  );
};

export default Artist;
