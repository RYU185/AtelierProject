import React from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  width: 300px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 30px;
`;

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const Value = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const CounterSection = styled.div`
  margin-top: 20px;
`;

const CounterLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CountButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: #0066ff;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0052cc;
  }
`;

const CountDisplay = styled.span`
  font-size: 1rem;
  color: #333;
  min-width: 30px;
  text-align: center;
`;

const PriceSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const ReserveButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0052cc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Notice = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-top: 10px;
`;

const TicketInfo = ({ title, time, date, price, count, onCountChange, onReserve, isReserving }) => {
  const formatDate = (date) => {
    if (!date) return "날짜를 선택해주세요";
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <InfoContainer>
      <Title>예약 안내</Title>
      <InfoSection>
        <Label>전시회</Label>
        <Value>{title}</Value>
      </InfoSection>
      <InfoSection>
        <Label>날짜</Label>
        <Value>{formatDate(date)}</Value>
      </InfoSection>
      <InfoSection>
        <Label>시간</Label>
        <Value>{time ? time.slice(0, 5) : "시간을 선택해주세요"}</Value>
      </InfoSection>
      <CounterSection>
        <CounterLabel>인원 선택</CounterLabel>
        <CounterControls>
          <CountButton onClick={() => onCountChange(count - 1)} disabled={count <= 1}>
            -
          </CountButton>
          <CountDisplay>{count}</CountDisplay>
          <CountButton onClick={() => onCountChange(count + 1)} disabled={count >= 10}>
            +
          </CountButton>
        </CounterControls>
      </CounterSection>
      <PriceSection>
        <Label>총 금액</Label>
        <TotalPrice>{price.toLocaleString()}원</TotalPrice>
      </PriceSection>
      <ReserveButton onClick={onReserve} disabled={!date || isReserving}>
        {isReserving ? "예매 처리중..." : "예매하기"}
      </ReserveButton>
      <Notice>* 인원 10명까지만 예매하실 수 있습니다.</Notice>
    </InfoContainer>
  );
};

export default TicketInfo;
