import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";

const Container = styled.div`
  width: 100%;
`;

const TicketCount = styled.div`
  background-color: rgba(255, 255, 255, 0.07);
  padding: 14px 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 14px;
  color: #0077ff;
  width: 100%;
  font-weight: 400;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 722px;

  & > p {
    display: flex;
    justify-content: center;
    color: #808080;
  }
`;

const TicketCard = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 12.5rem;
`;

const TicketInfo = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
`;

const TicketImage = styled.img`
  width: 140px;
  object-fit: cover;
  border-radius: 4px;
`;

const TicketDetails = styled.div`
  flex: 1;
  width: 17rem;

  h3 {
    font-size: 23px;
    color: #e1e1e1;
    margin: 25px 0 15px 0;
    font-weight: 500;
  }

  p {
    font-size: 16px;
    color: #e1e1e1;
    font-weight: 300;
  }
`;

const TicketActions = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
  justify-content: end;
  margin: 20px 20px 20px 0;
`;

const ActionButton = styled.button`
  width: 120px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #0077ff;
    color: #e1e1e1;
  }
`;

const MyTickets = ({ onTicketClick }) => {
  const [reserve, setReserve] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTomorrow = (dateStr) => {
    const targetDate = new Date(dateStr);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate.getTime() === tomorrow.getTime();
  };

  const isPastDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate < today;
  };

  const activeReservations = reserve.filter(
    (rv) => rv.status !== "CANCELED" && !isPastDate(rv.date)
  );

  const fetchMyReservations = async () => {
    try {
      const res = await axiosInstance.get("/reservation/my");
      setReserve(res.data);
    } catch (error) {
      console.error("예약 내역 조회 실패:", error);
      setError("예약 정보를 불러올 수 없습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const onRefundClick = async (reservation) => {
    const confirmed = window.confirm("해당 예약을 취소하시겠습니까? ");
    if (!confirmed) return;

    try {
      const res = await axiosInstance.delete(`/reservation/${reservation.reservationId}`);
      alert("예약이 성공적으로 취소되었습니다.");
      fetchMyReservations();
    } catch (err) {
      console.error("예약 취소 실패:", err);
      alert("지난 날짜나 당일 예약은 취소하실 수 없습니다. 고객센터에 연락해주세요.");
    }
  };

  return (
    <Container>
      <TicketCount>총 {activeReservations.length}개의 전시가 예약되어 있습니다.</TicketCount>

      <TicketList>
        {loading ? (
          <p>로딩 중...</p>
        ) : reserve.length === 0 ? (
          <p>예약된 전시가 없습니다.</p>
        ) : (
          activeReservations.map((rv) => (
            <TicketCard key={rv.reservationId}>
              <TicketInfo>
                <TicketImage
                  src={`${import.meta.env.VITE_API_URL}${rv.posterImg}`}
                  alt={rv.galleryTitle}
                />
                <TicketDetails>
                  <h3>
                    {rv.galleryTitle}
                    {isTomorrow(rv.date) && (
                      <span
                        style={{
                          color: "#9e0008",
                          marginLeft: "12px",
                          fontSize: "0.9rem",
                          fontWeight: "400",
                        }}
                      >
                        내일 예정된 전시입니다!
                      </span>
                    )}
                  </h3>
                  <p>예약 날짜: {rv.date}</p>
                  <p>예약 시간: {rv.time?.slice(0, 5)}</p>
                  <p>성인 {rv.headcount}명</p>
                </TicketDetails>
              </TicketInfo>
              <TicketActions>
                <ActionButton onClick={() => onTicketClick(rv)}>티켓 확인하기</ActionButton>
                <ActionButton onClick={() => onRefundClick(rv)}>티켓 취소하기</ActionButton>
              </TicketActions>
            </TicketCard>
          ))
        )}
      </TicketList>
    </Container>
  );
};

export default MyTickets;
