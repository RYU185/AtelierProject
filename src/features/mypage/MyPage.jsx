import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "./components/Tabs";
import UserInfoCard from "./components/UserInfoCard";
import TicketTab from "./components/TicketTab";
import GoodsTab from "./components/GoodsTab";
import DrawingTab from "./components/DrawingTab";

const Container = styled.div`
  padding: 60px 80px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const MainSection = styled.div`
  display: flex;
  gap: 40px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const MyPage = () => {
  const [tab, setTab] = useState("ticket");

  return (
    <Container>
      <Title>마이 페이지</Title>

      <Tabs tab={tab} setTab={setTab} />

      <MainSection>
        <UserInfoCard
          user={{
            name: "김동균",
            phone: "010-1234-5678",
            birth: "1997-01-01",
            email: "fence365@naver.com",
            address: "대전광역시 둔산남로 30",
            points: 200,
          }}
        />

        <RightSection>
          {tab === "ticket" && <TicketTab />}
          {tab === "goods" && <GoodsTab />}
          {tab === "drawing" && <DrawingTab />}
        </RightSection>
      </MainSection>
    </Container>
  );
};

export default MyPage;
