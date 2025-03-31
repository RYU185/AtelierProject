import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  align-items: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Cast = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
`;

const Date = styled.div`
  font-size: 13px;
  margin-bottom: 6px;
`;

const People = styled.div`
  font-size: 13px;
  margin-bottom: 6px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 24px;
`;

const Button = styled.button`
  padding: 10px 14px;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.$secondary ? "#eee" : "#339dff")};
  color: ${(props) => (props.$secondary ? "#333" : "#fff")};

  &:hover {
    opacity: 0.9;
  }
`;

const TicketItem = ({ ticket }) => {
  const { title, cast, date, people, price, image } = ticket;

  return (
    <Card>
      <Image src={image} alt={title} />
      <Info>
        <Title>{title}</Title>
        <Cast>{cast}</Cast>
        <Date>{date}</Date>
        <People>{people}</People>
        <Price>{price.toLocaleString()}원</Price>
      </Info>
      <ButtonGroup>
        <Button>티켓 보기</Button>
        <Button $secondary>교환 / 환불</Button>
      </ButtonGroup>
    </Card>
  );
};

export default TicketItem;
