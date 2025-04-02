import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
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

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ArtistImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ArtistName = styled.h2`
  font-size: 32px;
  margin: 10px 0;
`;

const ArtistBio = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ArtistDetail = () => {
  const { id } = useParams();
  
  const getArtistImage = (id) => {
    switch (id) {
      case "1":
        return artist1;
      case "2":
        return artist2;
      case "3":
        return artist3;
      case "4":
        return artist4;
      default:
        return artist1;
    }
  };

  const artist = {
    id: id,
    name: `작가 ${id}`,
    bio: `작가 바이오그래피입니다: ${id}.`,
    imageUrl: getArtistImage(id),
  };

  return (
    <div>
      <Header />
      <TitleContainer>
        <BackTitle>ARTIST {id}</BackTitle>
        <Title>ARTIST {id}</Title>
      </TitleContainer>
      <DetailContainer>
        <ArtistImage src={artist.imageUrl} alt={artist.name} />
        <ArtistName>{artist.name}</ArtistName>
        <ArtistBio>{artist.bio}</ArtistBio>
      </DetailContainer>
      <Footer />
    </div>
  );
};

export default ArtistDetail;