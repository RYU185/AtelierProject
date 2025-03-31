import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background-color: #eef6ff;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 8px;
  width: 50px;
`;

const Value = styled.div`
  color: #333;
`;


const TicketPoster = () => {
  const title = "GRAPHIC";
  const date = "2025년 3월 24일";
  const people = "3명";

  return (
    <Wrapper>
      <Poster src="/images/삶의 예찬.jpg" alt="공연 포스터" />

      <InfoBox>
        <InfoItem>
          <Label>제목 :</Label>
          <Value>{title}</Value>
        </InfoItem>
        <InfoItem>
          <Label>일시 :</Label>
          <Value>{date}</Value>
        </InfoItem>
        <InfoItem>
          <Label>인원 :</Label>
          <Value>{people}</Value>
        </InfoItem>
      </InfoBox>
    </Wrapper>
  );
};

export default TicketPoster;
