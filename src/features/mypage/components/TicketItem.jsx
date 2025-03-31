import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Date = styled.div`
  font-size: 13px;
  color: #888;
`;

const Title = styled.h3`
  margin: 6px 0 4px;
  font-size: 17px;
`;

const Cast = styled.div`
  font-size: 13px;
  color: #666;
`;

const Meta = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
`;

const DashedDivider = styled.div`
  width: 1px;
  height: 100%;
  background-image: linear-gradient(#aaa 40%, rgba(255, 255, 255, 0) 0%);
  background-position: right;
  background-size: 1px 10px;
  background-repeat: repeat-y;
  margin: 0 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionBtn = styled.button`
  padding: 10px 12px;
  font-size: 13px;
  border: 1px solid ${({ secondary }) => (secondary ? "#999" : "#007bff")};
  background: ${({ secondary }) => (secondary ? "white" : "#007bff")};
  color: ${({ secondary }) => (secondary ? "#333" : "white")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({ secondary }) => (secondary ? "#f2f2f2" : "#0056b3")};
  }
`;

const TicketItem = ({ ticket }) => {
  const { date, title, cast, people, price, image } = ticket;

  return (
    <Card>
      <Image src={image} alt="포스터" />
      <InfoSection>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Cast>{cast}</Cast>
        <Meta>{`${price.toLocaleString()}원 · ${people}`}</Meta>
      </InfoSection>
      <DashedDivider />
      <ButtonSection>
        <ActionBtn>티켓 확인하기</ActionBtn>
        <ActionBtn secondary>환불 신청</ActionBtn>
      </ButtonSection>
    </Card>
  );
};

export default TicketItem;
