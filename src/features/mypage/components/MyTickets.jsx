import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";

const Container = styled.div`
  width: 100%;
`;

const TicketCount = styled.div`
  background-color: white;
  padding: 14px 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  width: 730px;
  margin-left: auto;
  font-weight: 100;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 722px;
`;

const TicketCard = styled.div`
  display: flex;
  padding: 32px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MoreButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
`;

const TicketInfo = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
  margin-right: 40px;
`;

const TicketImage = styled.img`
  width: 110px;
  object-fit: cover;
  border-radius: 4px;
`;

const TicketDetails = styled.div`
  flex: 1;

  h3 {
    font-size: 23px;
    color: #141414;
    margin-bottom: 5px;
    font-weight: 500;
  }

  p {
    font-size: 18px;
    color: #141414;
    line-height: 1.8;
    font-weight: 300;
  }
`;

const TicketActions = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const MyTickets = ({ onTicketClick, onRefundClick }) => {
  const [reserve, setReserve] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyreserve = async () => {
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

    fetchMyreserve();
  }, []);

  return (
    <Container>
      <TicketCount>
        총 {reserve.length}개의 전시가 예약되어 있습니다.
      </TicketCount>

      <TicketList>
        {loading ? (
          <p>로딩 중...</p>
        ) : reserve.length === 0 ? (
          <p>예약된 전시가 없습니다.</p>
        ) : (
          reserve.map((rv) => (
            <TicketCard key={rv.reservationId}>
              <MoreButton>⋮</MoreButton>
              <TicketInfo>
                <TicketImage
                  src={`/images/ArtistGalleryIMG/${rv.posterImg}`}
                  alt={rv.galleryTitle}
                />
                <TicketDetails>
                  <h3>{rv.galleryTitle}</h3>
                  <p>예약 날짜: {rv.date}</p>
                  <p>예약 시간: {rv.time?.slice(0, 5)}</p>
                  <p>성인 {rv.headcount}명</p>
                </TicketDetails>
              </TicketInfo>
              <TicketActions>
                <ActionButton onClick={() => onTicketClick(rv)}>
                  티켓 확인하기
                </ActionButton>
                <ActionButton onClick={() => onRefundClick(rv)}>
                  환불 신청
                </ActionButton>
              </TicketActions>
            </TicketCard>
          ))
        )}
      </TicketList>
    </Container>
  );
};

export default MyTickets;
