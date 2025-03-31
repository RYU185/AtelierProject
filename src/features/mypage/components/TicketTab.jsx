import React from "react";
import styled from "styled-components";
import TicketItem from "./TicketItem";

const Wrapper = styled.div``;

const SummaryBox = styled.div`
  padding: 16px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  margin-bottom: 30px;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const dummyTickets = [
  {
    date: "2025.03.27",
    title: "삶의 예찬",
    cast: "권하윤, 김도명, 김준기, 노재석, 이태근, 이주원, 정운진, 최혜원",
    price: 42000,
    people: "성인 1인",
    image: "/images/삶의 예찬.jpg",
  },
  {
    date: "2025.04.12",
    title: "FOLDER [:record and archive]",
    cast: "한범석 삼일디자인과",
    price: 21000,
    people: "성인 2인",
    image: "/images/산업디자인.jpg",
  },
];

const TicketTab = () => {
  return (
    <Wrapper>
      <SummaryBox>
        총 {dummyTickets.length}개의 티켓이 활성화 되어 있습니다.
      </SummaryBox>

      <TicketList>
        {dummyTickets.map((ticket, i) => (
          <TicketItem key={i} ticket={ticket} />
        ))}
      </TicketList>
    </Wrapper>
  );
};

export default TicketTab;
