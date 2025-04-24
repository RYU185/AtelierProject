import React from "react";
import styled from "styled-components";


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 60px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  color: #e0e0e0;

  &:before {
    content: "GUIDE";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const FacilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FacilityCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FacilityImage = styled.div`
  width: 100%;
  height: 200px; // 원하는 높이
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 딱 맞게 */
  }
`;

const FacilityInfo = styled.div`
  padding: 20px;
`;

const FacilityTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
`;

const FacilityDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

const GuidePage = () => {
  const facilities = [
    {
      id: 1,
      title: "입장/운영 정보",
      description:
        "본 미술관은 오전 10시부터 오후 6시까지 운영되며, 입장 마감은 오후 5시 30분입니다. 매주 월요일은 정기 휴관입니다.",
      img: "/images/입장정보.jpg",
    },
    {
      id: 2,
      title: "이용 유의사항",
      description:
        "전시실 내에서는 플래시를 사용하지 않는 선에서의 사진 촬영이 가능합니다. 삼각대 및 셀카봉은 제한됩니다.",
      img: "/images/이용유의사항.jpg",
    },
    {
      id: 3,
      title: "부대시설 소개",
      description:
        "지하 1층에는 카페테리아와 뮤지엄 샵이 위치해 있으며, 다양한 굿즈와 도서 등을 구매하실 수 있습니다.",
      img: "/images/부대시설.jpg",
    },
    {
      id: 4,
      title: "소지품 보관 및 보안 안내",
      description:
        "안심하고 작품에 몰입하실 수 있도록, 미술관은 다음과 같은 소지품 보관 및 보안 서비스를 제공하고 있습니다.",
      img: "/images/소지품 보관.jpg",
    },
  ];

  return (
    <>
      
      <Container>
        <Title>시설 안내</Title>
        <FacilityGrid>
          {facilities.map((facility) => (
            <FacilityCard key={facility.id}>
              <FacilityImage>
                <img src={facility.img} alt={facility.title} />
              </FacilityImage>
              <FacilityInfo>
                <FacilityTitle>{facility.title}</FacilityTitle>
                <FacilityDescription>
                  {facility.description}
                </FacilityDescription>
              </FacilityInfo>
            </FacilityCard>
          ))}
        </FacilityGrid>
      </Container>
    </>
  );
};

export default GuidePage;
