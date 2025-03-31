import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Wrapper = styled.div`
  padding: 100px 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
`;

const Highlight = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const Divider = styled.hr`
  margin: 30px auto;
  width: 80%;
  border: 1px solid #3da9fc;
`;

const InfoTable = styled.div`
  margin: 30px auto;
  max-width: 400px;
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Label = styled.div`
  color: #555;
`;

const Value = styled.div`
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: white;
  border: 2px solid #007bff;
  color: #007bff;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #eef6ff;
  }
`;

const PrimaryButton = styled(Button)`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const TicketComplete = () => {
  const navigate = useNavigate();

  const ticketInfo = {
    title: "GRAPHIC",
    price: 30000,
    user: "홍길동",
  };

  return (
    <Wrapper>
      <Header />
      <Title>
        티켓이 <Highlight>예약 완료</Highlight>되었습니다!
      </Title>

      <Divider />

      <InfoTable>
        <Row>
          <Label>전시 제목</Label>
          <Value>{ticketInfo.title}</Value>
        </Row>
        <Row>
          <Label>결제 금액</Label>
          <Value>{ticketInfo.price.toLocaleString()}원</Value>
        </Row>
        <Row>
          <Label>결제 회원</Label>
          <Value>{ticketInfo.user}</Value>
        </Row>
      </InfoTable>

      <ButtonGroup>
        <Button onClick={() => navigate("/")}>전시회 목록</Button>
        <PrimaryButton onClick={() => navigate("/mypage")}>
          나의 티켓 확인하기
        </PrimaryButton>
      </ButtonGroup>
      <Footer />
    </Wrapper>
  );
};

export default TicketComplete;
