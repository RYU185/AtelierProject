import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TicketCalendar from "./components/TicketCalendar";
import TicketInfo from "./components/TicketInfo";
import Header from "../Header";
import Footer from "../Footer";
import axiosInstance from "../../api/axiosInstance";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 24px;
  margin-bottom: 54px;
  margin-top: 10%;
`;

const ExhibitionCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ExhibitionImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ExhibitionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ExhibitionDate = styled.p`
  color: #666;
  margin-bottom: 5px;
`;

const ExhibitionCapacity = styled.p`
  color: #666;
`;

function TicketPage() {
  const { galleryId } = useParams();
  console.log("🎯 galleryId:", galleryId);
  const navigate = useNavigate();

  const [galleryInfo, setGalleryInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [count, setCount] = useState(1);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get(`/api/artistgallery/id/${galleryId}`);
        setGalleryInfo(res.data);
      } catch (error) {
        console.error("전시 정보 불러오기 실패:", error);
      }
    };

    fetchGallery();
  }, [galleryId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleCountChange = (newCount) => {
    if (newCount >= 1 && newCount <= 10) {
      setCount(newCount);
    }
  };

  const handleReservation = async () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    setIsReserving(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/ticket/complete", {
        state: {
          title: galleryInfo?.title,
          price: galleryInfo?.price * count,
          memberName: "홍길동",
          date: selectedDate,
          count: count,
        },
      });
    } catch (error) {
      alert("예매 처리 중 오류가 발생했습니다.");
      setIsReserving(false);
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Title>티켓 구매</Title>
        <ContentWrapper>
          <ExhibitionCard>
            <ExhibitionImage
              src={`/images/ArtistGalleryIMG/${galleryInfo?.posterUrl}`}
              alt={galleryInfo?.title}
            />
            <ExhibitionTitle>{galleryInfo?.title}</ExhibitionTitle>
            <ExhibitionDate>
              {selectedDate ? selectedDate : "날짜를 선택해주세요"}
            </ExhibitionDate>
            <ExhibitionCapacity>인원: {count}명</ExhibitionCapacity>
          </ExhibitionCard>

          <TicketCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            galleryId={galleryId}
          />

          <TicketInfo
            title={galleryInfo?.title}
            date={selectedDate}
            price={galleryInfo?.price * count}
            count={count}
            onCountChange={handleCountChange}
            onReserve={handleReservation}
            isReserving={isReserving}
          />
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
}

export default TicketPage;
