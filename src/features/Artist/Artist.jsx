import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import ArtistIntro from "./components/ArtistIntro";
import artist1 from "../../assets/ArtistIMG/artist1.jpg";
import artist2 from "../../assets/ArtistIMG/artist2.png";
import artist3 from "../../assets/ArtistIMG/artist3.jpg";
import artist4 from "../../assets/ArtistIMG/artist4.jpg";

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
  const artists = [
    { id: 1, name: "Artist 1", bio: "", imageUrl: artist1 },
    { id: 2, name: "Artist 2", bio: "", imageUrl: artist2 },
    { id: 3, name: "Artist 3", bio: "", imageUrl: artist3 },
    { id: 4, name: "Artist 4", bio: "", imageUrl: artist4 },
    { id: 1, name: "Artist 1", bio: "", imageUrl: artist1 },
    { id: 2, name: "Artist 2", bio: "", imageUrl: artist2 },
    { id: 3, name: "Artist 3", bio: "", imageUrl: artist3 },
    { id: 4, name: "Artist 4", bio: "", imageUrl: artist4 },
  ];

  return (
    <div>
      <Header />
      <TitleContainer>
        <BackTitle>ARTIST</BackTitle>
        <Title>ARTIST</Title>
      </TitleContainer>
      <ArtistContainer>
        {artists.map((artist) => (
          <ArtistIntro key={artist.id} {...artist} />
        ))}
      </ArtistContainer>
      <Footer />
    </div>
  );
};

export default Artist;
