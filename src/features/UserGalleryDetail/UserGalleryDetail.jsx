import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserGalleryPoster from "./components/UserGalleryPoster";
import UserGalleryInformation from "./components/UserGalleryInformation";
import DrawingList from "./components/DrawingList";
import styled from "styled-components";
import axios from "axios";

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

function UserGalleryDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getdImageUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}${path}`;
  };

  useEffect(() => {
    axios
      .get(`/api/usergallery/id/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("갤러리 정보를 불러오지 못했습니다:", error);
      });
  }, [id]);

  return (
    <GradientBackground>
      <TitleContainer>
        <BackTitle>USER GALLERY</BackTitle>
        <Title>USER GALLERY</Title>
      </TitleContainer>
      <ButtonDiv>
        <Button onClick={() => navigate("/gallery/Usergallery")}>
          &lt; 목록 보기
        </Button>
      </ButtonDiv>
      <Container>
        <PosterBox>
          {data && (
            <UserGalleryPoster
              url={`${import.meta.env.VITE_API_URL}${data.posterUrl}`}
            />
          )}
        </PosterBox>
        <InfoBox>
          <UserGalleryInformation data={data} />
        </InfoBox>
      </Container>

      <Info>참여 작품</Info>
      <DrawingList posters={(data?.drawingImg || []).map(getdImageUrl)} />
    </GradientBackground>
  );
}

export default UserGalleryDetail;
