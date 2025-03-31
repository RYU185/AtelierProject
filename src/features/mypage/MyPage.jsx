// src/features/mypage/MyPage.jsx

import React, { useState } from "react";
import styled from "styled-components";
import UserInfoCard from "./components/UserInfoCard";
import Tabs from "./components/Tabs";
import TicketSummaryBox from "./components/TicketSummaryBox";
import TicketItem from "./components/TicketItem";

const Container = styled.div`
  padding: 60px 80px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
`;

const MainSection = styled.div`
  display: flex;
  gap: 40px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const TicketList = styled.div`
  margin-top: 20px;
`;

const Placeholder = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;

const dummyUser = {
  name: "김동균",
  phone: "010-1234-5678",
  birth: "1997-01-01",
  email: "fence365@naver.com",
  address: "대전광역시 둔산남로 30",
  points: 200,
};

const dummyTickets = [
  {
    date: "2025.03.27",
    title: "삶의 예찬",
    cast: "김도명, 김준기, 노재석, 이태근, 이주원, 정운진, 최혜원",
    price: 42000,
    people: "성인 1인",
    image: "/images/ticket01.jpg",
  },
  {
    date: "2025.04.12",
    title: "FOLDER [:record and archive]",
    cast: "한범석 삼일디자인과",
    price: 21000,
    people: "성인 2인",
    image: "/images/ticket02.jpg",
  },
];

const MyPage = () => {
  const [tab, setTab] = useState("ticket");

  return (
    <Container>
      <Title>마이 페이지</Title>

      <Tabs tab={tab} setTab={setTab} />

      <MainSection>
        <UserInfoCard user={dummyUser} />

        <RightSection>
          {tab === "ticket" && (
            <>
              <TicketSummaryBox count={dummyTickets.length} />
              <TicketList>
                {dummyTickets.map((ticket, i) => (
                  <TicketItem key={i} ticket={ticket} />
                ))}
              </TicketList>
            </>
          )}

          {tab !== "ticket" && (
            <Placeholder>아직 해당 데이터가 없습니다.</Placeholder>
          )}
        </RightSection>
      </MainSection>
    </Container>
  );
};

export default MyPage;
