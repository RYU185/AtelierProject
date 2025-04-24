import React from "react";
import styled from "styled-components";

const InformationContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  color: #d8d8d8;
`;

const InformationTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
`;

const InformationItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #bababa;
`;

const ItemLabel = styled.strong`
  width: 120px;
  padding-right: 20px;
  text-align: left;
  padding: 15px;
`;

const ItemValue = styled.p`
  flex-grow: 1;
  text-align: justify;
  padding: 15px;
`;

const InfoBox = styled.div`
  position: relative;
`;

const Title = styled.div`
  display: block;
  width: 120px;
  font-weight: bold;
  height: 51.33px;
  padding: 15px;
`;

const Info = styled.div`
  width: 100%;
  top: 0;
  right: 0px;
  position: relative;
  padding: 15px;
`;

function UserGalleryInformation({ data }) {
  if (!data) return null;
  return (
    <InformationContainer>
      <InformationTitle>전시 정보</InformationTitle>
      <InformationItem>
        <ItemLabel>제목</ItemLabel>
        <ItemValue>{data.title}</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>일정</ItemLabel>
        <ItemValue>
          {data.startDate} ~ {data.endDate}
        </ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>티켓 가격</ItemLabel>
        <ItemValue>{data.price}</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>작가</ItemLabel>
        <ItemValue>{data.userList.join(", ")}</ItemValue>
      </InformationItem>
      <InfoBox>
        <Title>전시 내용</Title>
        <Info>{data.description}</Info>
      </InfoBox>
    </InformationContainer>
  );
}

export default UserGalleryInformation;
