import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ArtistGalleryPoster from "./components/ArtistGalleryPoster";
import ArtistGalleryInformation from "./components/ArtistGalleryInformation";
import TicketButton from "./components/TicketButton";
import ArtList from "./components/ArtList";
import axiosInstance from "../../api/axiosInstance";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 7.25rem;
  padding-bottom: 4.25rem;
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

const ButtonDiv = styled.div`
  width: 65%;
  margin: 0 auto;
  margin-top: 50px;
`;

const Button = styled.button`
  background-color: #018ec8;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  color: #ffffff;
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
  margin-bottom: 150px;
  color: #e0e0e0;
`;

function ArtistGalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getArtImageUrl = (filename) =>
    filename ? `/images/ArtListIMG/${filename}` : "";

  useEffect(() => {
    const fetchGalleryDetail = async () => {
      try {
        const res = await axiosInstance.get(`/artistgallery/id/${id}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGalleryDetail();
  }, [id]);

  return (
    <div>
      <GradientBackground>
        <TitleContainer>
          <BackTitle>ARTIST GALLERY</BackTitle>
          <Title>ARTIST GALLERY</Title>
        </TitleContainer>
        <ButtonDiv>
          <Button onClick={() => navigate("/gallery/artistgallery")}>
            전시회 목록
          </Button>
        </ButtonDiv>
        <Container>
          <PosterBox>
            {data && (
              <ArtistGalleryPoster
                url={`${import.meta.env.VITE_API_URL}${data.posterUrl}`}
              />
            )}
            {data && <TicketButton galleryId={id} />}
          </PosterBox>
          <InfoBox>
            <ArtistGalleryInformation data={data} />
          </InfoBox>
        </Container>

        <Info>참여 작품</Info>
        <ArtList posters={(data?.artPoster || []).map(getArtImageUrl)} />
      </GradientBackground>
    </div>
  );
}

export default ArtistGalleryDetail;
