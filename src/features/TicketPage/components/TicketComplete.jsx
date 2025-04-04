import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CompleteMessage = styled.h1`
  font-size: 38px;
  color: #333;
  margin-bottom: 60px;
  text-align: center;
  font-weight: 600;

  span {
    color: #0066ff;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 600px;
  height: 1px;
  background-color: #e0e0e0;
  margin: 50px 0;
`;

const TicketInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 25px;
  font-size: 20px;
  text-align: center;
`;

const Label = styled.span`
  color: #666;
  flex: 1;
  text-align: right;
`;

const Value = styled.span`
  color: #333;
  font-weight: 500;
  flex: 1;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;

const Button = styled.button`
  padding: 18px 45px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.primary ? "#0066ff" : "white")};
  color: ${(props) => (props.primary ? "white" : "#0066ff")};
  border: ${(props) => (props.primary ? "none" : "1px solid #0066ff")};
  font-weight: 500;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0052cc" : "#f8f9fa")};
  }
`;

const StyledFooter = styled(Footer)`
  margin-top: auto;
`;

const TicketComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketInfo = location.state || {
    title: "GRAPHIC",
    price: 30000,
    memberName: "홍길동",
    date: new Date(),
    count: 1,
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  return (
    <Wrapper>
      <Header />
      <PageContainer>
        <CompleteMessage>
          티켓이 <span>예약 완료</span>되었습니다!
        </CompleteMessage>

        <TicketInfoContainer>
          <InfoRow>
            <Label>전시 제목</Label>
            <Value>{ticketInfo.title}</Value>
          </InfoRow>
          <InfoRow>
            <Label>예매 날짜</Label>
            <Value>{formatDate(ticketInfo.date)}</Value>
          </InfoRow>
          <InfoRow>
            <Label>예매 인원</Label>
            <Value>{ticketInfo.count}명</Value>
          </InfoRow>
          <InfoRow>
            <Label>결제 금액</Label>
            <Value>{ticketInfo.price.toLocaleString()}원</Value>
          </InfoRow>
          <InfoRow>
            <Label>결제 회원</Label>
            <Value>{ticketInfo.memberName}</Value>
          </InfoRow>
        </TicketInfoContainer>

        <Divider />

        <ButtonContainer>
          <Button onClick={() => navigate("/exhibition")} primary={false}>
            전시회 목록
          </Button>
          <Button onClick={() => navigate("/mypage")} primary={true}>
            나의 티켓 확인하기
          </Button>
        </ButtonContainer>
      </PageContainer>
      <StyledFooter />
    </Wrapper>
  );
};

export default TicketComplete;
