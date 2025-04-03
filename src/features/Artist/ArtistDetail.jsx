import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import artist1 from "../../assets/ArtistIMG/artist1.jpg";
import artist2 from "../../assets/ArtistIMG/artist2.png";
import artist3 from "../../assets/ArtistIMG/artist3.jpg";
import artist4 from "../../assets/ArtistIMG/artist4.jpg";
import art1 from "../../assets/ArtIMG/1.jpg";
import art2 from "../../assets/ArtIMG/2.jpg";
import art3 from "../../assets/ArtIMG/3.jpg";

const DetailWrapper = styled.div`
  width: 50%;
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px 0;
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
  color: #ffffff;
  background-color: #005791;
  display: inline-block;
  padding: 5px 10px;
`;

const BioGraphyText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 20px 0;
`;

const WorksContainer = styled.div`
  margin-top: 40px;
`;

const WorksTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
  background-color: #005791;
  display: inline-block;
  padding: 5px 10px;
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 40px;
`;

const WorkCard = styled.div`
  border: none;
  overflow: hidden;
  width: 300px;
  height: 300px;
  cursor: pointer;
`;

const WorkImage = styled.img`
  width: 100%;
  height: auto;
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
  height: 60%;
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

  const getArtImage = (id) => {
    switch (id) {
      case "1":
        return art1;
      case "2":
        return art2;
      case "3":
        return art3;
    }
  };

  const art = {
    id: id,
    imageUrl: getArtImage(id),
  };

  const artist = {
    id: id,
    name: `작가 ${id}`,
    bio: ` ${id}.`,
    imageUrl: getArtistImage(id),
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

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

  return (
    <div>
      <Header />

      <DetailWrapper>
        <DetailContainer>
          <ImageContainer>
            <ArtistImage src={artist.imageUrl} alt={artist.name} />
          </ImageContainer>
          <DescriptionContainer>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quisquam, quos.
            </p>
          </DescriptionContainer>
        </DetailContainer>

        <BioGraphyContainer>
          <BioGraphyTitle>BIOGRAPHY</BioGraphyTitle>
          <h2>{artist.name}</h2>
          <BioGraphyText>
            개인전 14회
            <br />
            2024. 03. 05~11 13회 'Make New Wave' 스페이스엄 후원: 숲인더문 음악:박찬재
            <br />
            2022. 11. 01~15 11회 'MODERN TIMES' 초대개인전, 갤러리 자인제노
            <br />
            2022. 03. 09~15 10회 'Beyond' 초대개인전, 갤러리 이즈 / 주최 : 갤러리탐
            후원:탐앤탐스커피
            <br />
            2019. 09. 04~10 5회 '비밀의 숲' 일호갤러리 초대개인전, 삼청동
            <br />
            2014. 07. 29~08.03 1회 '바람이 분다.' 아라아트센터, 인사동, 대한민국 외 다수
            <br />
            <br />
            국내외 아트패어 18회
            <br />
            2025 ART FUTURE TAIPAI, 아트보다 갤러리
            <br />
            2024 뱅크아트페어 싱가포르, 아트보다 갤러리
            <br />
            2024 홍콩 어포더블 청화랑
            <br />
            2024 화랑미술제 갤러리자인제노 코엑스 Hall C
            <br />
            2019 싱가포르 어포더블, 일호갤러리
            <br />
            2019 뉴욕어포더블, 메크로폴리탄, 미국
            <br />
            <br />
            그룹전 37회
            <br />
            2025 안소영, 지나유 2인전, 명주갤러리
            <br />
            2022 '선과 색' 김미아, 지나유 2인전, 갤러리이즈 /주최:갤러리탐, 후원:탐앤탐스커피
            <br />
            2021 'VISUAL ARTIST MARKET' 예술경영지원센터가 지원하는 2021 온라인 기획
            경매작가미술장터와 케이옥션이 선정한 주목할 만한 작가 30명의 작품 68점 공개케이옥션,
            지원:예술경영지원센터, 문화체육관광부
            <br />
            2015 아시아 태평양 미술대상전. 동경도립미술관, 동경, 일본
            <br />
            2015 한국현대미술 대만 (그룹초대전) Chuto Hotel Special, 타이페이, 타이완
            <br />
            2015 미국 히달고 국경페스티벌 한국작가 (초대전) (우수작가상). 외 다수
          </BioGraphyText>
        </BioGraphyContainer>

        <WorksContainer>
          <WorksTitle>EXHIBITIONS</WorksTitle>
          <WorksGrid>
            {[1, 2, 3, 4].map((workId) => {
              const handleWorkClick = () => {
                // 모달창 상태관리
                setModalOpen(true);
                setSelectedWork(workId);
              };
              return (
                <WorkCard key={workId} onClick={handleWorkClick}>
                  <WorkImage src={art.imageUrl} alt={`작품 ${workId}`} />
                </WorkCard>
              );
            })}
          </WorksGrid>
        </WorksContainer>
      </DetailWrapper>
      {modalOpen && (
        <Overlay onClick={handleOverlayClick}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
            <ArtDetailImageContainer>
              <img src={art.imageUrl} alt={`작품 ${selectedWork}`} />
            </ArtDetailImageContainer>
            <ArtDetailDescriptionContainer>
              <h2>TITLE</h2>
              <p>
                {/* {art.description} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </ArtDetailDescriptionContainer>
          </Modal>
        </Overlay>
      )}
      <Footer />
    </div>
  );
};

export default ArtistDetail;
