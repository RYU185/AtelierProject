import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TicketCalendar from "../TicketPage/TicketCalendar";
import TicketInfo from "../TicketPage/TicketInfo";
import Header from "../Header";
import Footer from "../Footer";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";
import { useAuth } from "../../components/AuthContext";

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
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;

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
  margin-left: 20px;
`;

const ExhibitionDate = styled.p`
  color: #666;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const ExhibitionCapacity = styled.p`
  color: #666;
  margin-left: 20px;
`;

const formatDateForServer = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

function TicketPage() {
  const { galleryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [galleryInfo, setGalleryInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [count, setCount] = useState(1);
  const [isReserving, setIsReserving] = useState(false);
  const [reserveDateList, setReserveDateList] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleCloseTimeOverlay = () => {
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const getActiveDates = () => reserveDateList.map((d) => d.date);

  const findReserveDateId = (selectedDate) => {
    const selectedStr = formatDateForServer(selectedDate);
    const match = reserveDateList.find((d) => d.date === selectedStr);
    return match ? match.id : null;
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get(`/artistgallery/id/${galleryId}`);
        setGalleryInfo(res.data);
      } catch (error) {
        console.error("전시 정보 불러오기 실패:", error);
      }
    };

    const fetchReserveDates = async () => {
      try {
        const res = await axiosInstance.get(
          `/reservation/reserve-date?galleryId=${galleryId}`
        );
        setReserveDateList(res.data);
      } catch (error) {
        console.error("예약 가능 날짜 조회 실패:", error);
      }
    };
    fetchGallery();
    fetchReserveDates();
    const interval = setInterval(fetchReserveDates, 60000);
    return () => clearInterval(interval);
  }, [galleryId]);

  useEffect(() => {
    if (!selectedDate || reserveDateList.length === 0) return;

    const fetchReserveTimes = async () => {
      const reserveDateId = findReserveDateId(selectedDate);
      if (!reserveDateId) return;

      try {
        const res = await axiosInstance.get(
          `/reservation/available-times?date=${formatDateForServer(
            selectedDate
          )}`
        );

        setAvailableTimes(res.data);
      } catch (error) {
        console.error("예약 가능 시간 조회 실패:", error);
      }
    };

    fetchReserveTimes();
  }, [selectedDate, reserveDateList]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const remainingCount = reserveDateList.find(
    (d) => d.date === (selectedDate && formatDateForServer(selectedDate))
  )?.remaining;

  const handleCountChange = (newCount) => {
    if (newCount >= 1 && newCount <= 10) {
      setCount(newCount);
    }
  };

  const handleReservation = async () => {
    if (!selectedTime || count <= 0) {
      alert("시간과 인원을 선택해주세요.");
      return;
    }
    setIsReserving(true);

    try {
      const res = await axiosInstance.post("/reservation", {
        reserveTimeId: selectedTime.id,
        headcount: count,
      });

      navigate("/ticket/complete", {
        state: {
          title: galleryInfo?.title,
          price: galleryInfo?.price * count,
          memberName: user?.username,
          date: selectedDate.toISOString().slice(0, 10),
          time: selectedTime.time,
          count,
        },
      });
    } catch (error) {
      const data = error.response?.data;
      const message =
        typeof data === "object" && data !== null
          ? Object.values(data)[0] // 첫 번째 value 가져오기
          : "예약에 실패했습니다.";
      alert(message);
    } finally {
      setIsReserving(false);
    }
  };

  if (!galleryInfo) return null;
  if (!galleryInfo?.startDate || !galleryInfo?.endDate) return null;

  console.log("Calendar에 넘기기:", {
    start: galleryInfo?.startDate,
    end: galleryInfo?.endDate,
  });

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

            {galleryInfo?.artistList?.length > 0 && (
              <ExhibitionDate style={{ fontWeight: "bold", color: "#444" }}>
                {galleryInfo.artistList.join(", ")}
              </ExhibitionDate>
            )}
            <ExhibitionCapacity
              style={{ color: "#666", whiteSpace: "pre-line", lineHeight: 1.6 }}
            >
              {galleryInfo?.startDate}
              <span style={{ margin: "0 12px" }}>-</span>
              {galleryInfo?.endDate}
            </ExhibitionCapacity>
          </ExhibitionCard>

          <div style={{ position: "relative" }}>
            <TicketCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              activeDates={getActiveDates()}
              exhibitionStartDate={galleryInfo.startDate}
              exhibitionEndDate={galleryInfo.deadline} // 🔥 수정된 부분
            />
            {/* 시간 선택 UI : FRAMER MOTION 사용
            10:00 ~ 17:00 , 1시간 단위 */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "420px",
                  backgroundColor: "#ffffff",
                  padding: "30px",
                  zIndex: 10,
                  border: "1px solid #d4d4d4",
                  borderRadius: "12px",
                  // boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <button
                  onClick={handleCloseTimeOverlay}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "20px",
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    color: "#888",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>

                <h4 style={{ marginBottom: "40px", fontSize: "1.2rem" }}>
                  예약할 시간을 선택해주세요 <br />
                  <span style={{ fontSize: "0.95rem", color: "#888" }}>
                    남은 정원: {remainingCount}명
                  </span>
                </h4>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {availableTimes.map((time) => (
                    <button
                      key={time.id}
                      onClick={() => setSelectedTime(time)}
                      style={{
                        padding: "14px 14px",
                        borderRadius: "5px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        width: "100%",
                        backgroundColor:
                          selectedTime?.id === time.id ? "#0066ff" : "#ffffff",
                        color: selectedTime?.id === time.id ? "#fff" : "#333",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        border:
                          selectedTime?.id === time.id
                            ? "#0066ff"
                            : "1px solid #b9b9b9",
                        cursor: "pointer",
                      }}
                    >
                      {time.time.slice(0, 5)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <TicketInfo
            title={galleryInfo?.title}
            date={selectedDate}
            time={selectedTime?.time}
            price={galleryInfo?.price * count}
            count={count}
            onCountChange={handleCountChange}
            onReserve={handleReservation}
            isReserving={isReserving}
            availableTimes={availableTimes}
          />
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
}

export default TicketPage;
