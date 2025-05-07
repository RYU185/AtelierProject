import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import useSocketStore from "../../../socket/useSocketStore";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 0% 0%,
    rgb(0, 0, 0),
    rgb(1, 9, 26) 40%,
    #000000 100%
  );
`;

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
  color: #f5f5f5;
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
  color: #fdfdfd;
  flex: 1;
  font-size: 25px;
`;

const Value = styled.span`
  color: #d8d8d8;
  font-weight: 300;
  font-size: 25px;
  flex: 1;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 18px 45px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  width: 300px;
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
  const { clearNotifications: clearNotification } = useSocketStore();

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
    <GradientBackground>
      <Wrapper>
        <Header />
        <PageContainer>
          <CompleteMessage>
            전시가 <span>예약 완료</span>되었습니다!
          </CompleteMessage>

          <TicketInfoContainer>
            <InfoRow>
              <Label>전시 제목</Label>
              <Value>{ticketInfo.title}</Value>
            </InfoRow>
            <InfoRow>
              <Label>예약 날짜</Label>
              <Value>{formatDate(ticketInfo.date)}</Value>
            </InfoRow>
            <InfoRow>
              <Label>예약 인원</Label>
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
            <Button
              onClick={() => navigate("/gallery/artistgallery")}
              primary={false}
            >
              전시회 목록
            </Button>
            <Button
              onClick={() => {
                navigate("/mypage");
                clearNotification();
              }}
              primary={true}
            >
              나의 티켓 확인하기
            </Button>
          </ButtonContainer>
        </PageContainer>
        <StyledFooter />
      </Wrapper>
    </GradientBackground>
  );
};

export default TicketComplete;
