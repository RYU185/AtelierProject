import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
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

const DetailWrapper = styled.div`
  width: 50%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 160px 0;
`;

const DetailContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 50%;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-width: 50%;

  & > p {
    font-size: 15px;
    color: #e0e0e0;
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

const BioGraphyContainer = styled.div`
  margin-top: 20px;
`;

const BioGraphyTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #1f1f1f;
  background-color: #e0e0e0;
  display: inline-block;
  padding: 5px 10px;
`;

const BiographyName = styled.h2`
  font-size: 25px;
  color: #e0e0e0;
  padding-top: 15px;
`;

const BioGraphyText = styled.div`
  font-size: 16px;
  color: #b1b1b1;
  line-height: 1.5;
  margin: 20px 0;
`;

const WorksContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10rem;
`;

const WorksTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #1f1f1f;
  background-color: #e0e0e0;
  display: inline-block;
  padding: 5px 10px;
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 40px;
`;

const WorkCard = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  cursor: pointer;
`;

const WorkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* 모달 오버레이 */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

/* 모달 컨테이너 */
const Modal = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
  gap: 20px;
  background-color: white;
  max-width: 900px;
  width: 100%;
  height: auto;
  position: relative;
`;

/* 닫기 버튼 */
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #303030;
  }
`;

const ArtDetailImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArtDetailDescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 30px;

  & > h2 {
    font-size: 32px;
    color: #333;
  }

  & > p {
    font-size: 16px;
    color: #333;
    padding-top: 10px;
  }
`;

const ArtistDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [artist, setArtist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [arts, setArts] = useState([]);
  const artistId = location.state?.artistId || id;

  useEffect(() => {
    const fetchArtistDetail = async () => {
      try {
        const res = await axiosInstance.get(`/artist/user-id/${id}`);
        setArtist(res.data);
      } catch (err) {
        console.error("작가 상세정보 불러오기 실패:", err);
      }
    };
    fetchArtistDetail();
  }, [id]);

  useEffect(() => {
    if (!artistId) return;

    const fetchArt = async () => {
      try {
        const res = await axiosInstance.get(`/artist/user/${id}`);
        setArts(res.data);
      } catch (err) {
        console.error("참여작품 불러오기 실패:", err);
      }
    };
    fetchArt();
  }, [artistId]);

  const handleOverlayClick = () => {
    setModalOpen(false); // 모달 닫기
  };

  // 모달 열림 상태에 따라 body 스크롤 잠금
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = "0";
    };
  }, [modalOpen]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <GradientBackground>
      <Header />

      <DetailWrapper>
        <DetailContainer>
          <ImageContainer>
            <ArtistImage
              src={`${import.meta.env.VITE_API_URL}${artist.profile_img}`}
              alt={artist.name}
            />
          </ImageContainer>
          <DescriptionContainer>
            <p>{artist.description}</p>
          </DescriptionContainer>
        </DetailContainer>

        <BioGraphyContainer>
          <BioGraphyTitle>BIOGRAPHY</BioGraphyTitle>
          <BiographyName>{artist.name}</BiographyName>
          <BioGraphyText>
            {artist.biographyList && artist.biographyList.length > 0 ? (
              [...artist.biographyList]
                .sort((a, b) => new Date(a.year) - new Date(b.year))
                .map((bio) => (
                  <div key={bio.id}>
                    <strong>{bio.year}</strong> {bio.award}
                    <br />
                  </div>
                ))
            ) : (
              <p>수상 경력이 없습니다.</p>
            )}
          </BioGraphyText>
        </BioGraphyContainer>

        <WorksContainer>
          <WorksTitle>EXHIBITIONS</WorksTitle>
          <WorksGrid>
            {arts.length > 0 ? (
              arts.map((art) => {
                const handleWorkClick = () => {
                  setModalOpen(true);
                  setSelectedWork(art);
                };
                return (
                  <WorkCard key={art.id} onClick={handleWorkClick}>
                    <WorkImage
                      src={`${import.meta.env.VITE_API_URL}${art.imgUrl}`}
                      alt={art.title}
                    />
                  </WorkCard>
                );
              })
            ) : (
              <p>등록된 작품이 없습니다.</p>
            )}
          </WorksGrid>
        </WorksContainer>
      </DetailWrapper>

      {/* 모달 표시 */}
      {modalOpen && selectedWork && (
        <Overlay onClick={handleOverlayClick}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ArtDetailImageContainer>
              <img
                src={getImageUrl(selectedWork.imgUrl)}
                alt={selectedWork.title}
              />
            </ArtDetailImageContainer>
            <ArtDetailDescriptionContainer>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.description}</p>
            </ArtDetailDescriptionContainer>
            <CloseButton onClick={() => setModalOpen(false)}>×</CloseButton>
          </Modal>
        </Overlay>
      )}

      <Footer />
    </GradientBackground>
  );
};

export default ArtistDetail;
