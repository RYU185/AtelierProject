import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ArtistGalleryPoster from "./components/ArtistGalleryPoster";
import ArtistGalleryInformation from "./components/ArtistGalleryInformation";
import TicketButton from "./components/TicketButton";
import ArtList from "./components/ArtList";
import axios from "axios";
const images = import.meta.glob("/src/assets/ArtistGalleryIMG/*", {
  eager: true,
});
const artImages = import.meta.glob("/src/assets/ArtListIMG/*", {
  eager: true,
});

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
  height: 560px;
  border-right: 1.3px solid #bababa;
  padding-left: 30px;
`;

const InfoBox = styled.div`
  width: 70%;
  padding-left: 20px;
`;

const Info = styled.h1`
  margin-top: 130px;
  text-align: center;
  margin-bottom: 50px;
`;

function ArtistGalleryDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getImageUrl = (filename) => {
    const matched = Object.entries(images).find(([path]) =>
      path.endsWith(filename)
    );
    return matched ? matched[1].default : "";
  };

  const getArtImageUrl = (filename) => {
    const matched = Object.entries(artImages).find(([path]) =>
      path.endsWith(filename)
    );
    return matched ? matched[1].default : "";
  };

  useEffect(() => {
    axios
      .get(`/api/artistgallery/id/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("갤러리 정보를 불러오지 못했습니다:", error);
      });
  }, [id]);

  return (
    <div>
      <TitleContainer>
        <BackTitle>ARTIST GALLERY</BackTitle>
        <Title>ARTIST GALLERY</Title>
      </TitleContainer>
      <ButtonDiv>
        <Button onClick={() => navigate("/gallery/artistgallery")}>
          &lt; 목록 보기
        </Button>
      </ButtonDiv>
      <Container>
        <PosterBox>
          {data && <ArtistGalleryPoster url={getImageUrl(data.posterUrl)} />}
          <TicketButton />
        </PosterBox>
        <InfoBox>
          <ArtistGalleryInformation data={data} />
        </InfoBox>
      </Container>

      <Info>참여 작품</Info>
      <ArtList posters={(data?.artPoster || []).map(getArtImageUrl)} />
    </div>
  );
}

export default ArtistGalleryDetail;
