import React from "react";
import styled from "styled-components";

const Card = styled.div`
  margin-top: 20px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
`;

const InfoArea = styled.div`
  flex: 1;
`;

const Status = styled.div`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Title = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
`;

const Price = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  margin: 0 24px;
  background-image: linear-gradient(#ccc 40%, rgba(255, 255, 255, 0) 0%);
  background-size: 1px 8px;
  background-repeat: repeat-y;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  font-size: 13px;
  background: #f4f4f4;
  border: 1px solid #bbb;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;


const GoodsItem = ({ item }) => {
  const { date, image, status, title, price, quantity } = item;

  return (
    <Card>
      <Date>{date}</Date>
      <Content>
        <Image src={image} />
        <InfoArea>
          <Status>{status}</Status>
          <Title>{title}</Title>
          <Price>{`${price.toLocaleString()}원 · ${quantity}개`}</Price>
        </InfoArea>
        <Divider />
        <ButtonGroup>
          <Button>리뷰 작성하기</Button>
          <Button>장바구니 담기</Button>
          <Button>교환 / 환불 신청</Button>
        </ButtonGroup>
      </Content>
    </Card>
  );
};

export default GoodsItem;
