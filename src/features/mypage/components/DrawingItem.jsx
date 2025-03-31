import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 14px 16px;
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Status = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) =>
    props.status === "당첨"
      ? "#2e87ff"
      : props.status === "미당첨"
      ? "#ff4c4c"
      : "#555"};
`;

const DrawingItem = ({ item }) => {
  const { title, status, image } = item;

  return (
    <Card>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Status status={status}>{status}</Status>
      </Content>
    </Card>
  );
};

export default DrawingItem;
