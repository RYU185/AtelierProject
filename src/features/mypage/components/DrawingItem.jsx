import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: #eee;
`;

const Info = styled.div`
  padding: 14px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Status = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ status }) => (status === "완성" ? "#3da9fc" : "#ff5a5a")};
`;

const Description = styled.div`
  font-size: 12px;
  color: #666;
  margin: 6px 0;
`;

const Date = styled.div`
  font-size: 12px;
  color: #999;
`;


const DrawingItem = ({ item }) => {
  const { image, title, status, description, updatedAt } = item;

  return (
    <Card>
      <Image src={image} alt="드로잉" />
      <Info>
        <TopRow>
          <Title>{title}</Title>
          <Status status={status}>{status}</Status>
        </TopRow>
        <Description>{description}</Description>
        <Date>최근 수정일: {updatedAt}</Date>
      </Info>
    </Card>
  );
};

export default DrawingItem;
