import React from "react";
import styled from "styled-components";

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
  width: 722px;
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
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const TicketDetails = styled.div`
  flex: 1;

  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 12px;
    font-weight: 500;
    font-weight: 100;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 4px 0;
    line-height: 1.8;
    font-weight: 100;

    &:last-child {
      margin-top: 12px;
    }
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
  const tickets = [
    {
      id: 1,
      title: "삶의 예찬",
      date: "2025.03.27",
      image: "/images/삶의 예찬.jpg",
      description: "김도영, 김준기, 노보캣, 이다은, 이봉일, 정은진, 최혜원",
      price: "42000원 · 성인 1인",
    },
    {
      id: 2,
      title: "FOLDER [:record and archive]",
      date: "2025.04.12",
      image: "/images/산업디자인.jpg",
      description: "한밭대 산업디자인과",
      price: "21000원 · 성인 2인",
    },
  ];

  return (
    <Container>
      <TicketCount>
        총 {tickets.length}개의 티켓이 활성화 되어 있습니다.
      </TicketCount>
      <TicketList>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id}>
            <MoreButton>⋮</MoreButton>
            <TicketInfo>
              <TicketImage src={ticket.image} alt={ticket.title} />
              <TicketDetails>
                <h3>{ticket.title}</h3>
                <p>{ticket.date}</p>
                <p>{ticket.description}</p>
                <p>{ticket.price}</p>
              </TicketDetails>
            </TicketInfo>
            <TicketActions>
              <ActionButton onClick={() => onTicketClick(ticket)}>
                티켓 확인하기
              </ActionButton>
              <ActionButton onClick={() => onRefundClick(ticket)}>
                환불 신청
              </ActionButton>
            </TicketActions>
          </TicketCard>
        ))}
      </TicketList>
    </Container>
  );
};

export default MyTickets;
