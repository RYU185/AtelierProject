import React from "react";
import styled from "styled-components";

const InformationContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
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
  width: 589.85px;
  top: 0;
  right: 0px;
  position: absolute;
  padding: 15px;
`;

function UserGalleryInformation() {
  return (
    <InformationContainer>
      <InformationTitle>전시 정보</InformationTitle>
      <InformationItem>
        <ItemLabel>제목</ItemLabel>
        <ItemValue>산업 디자인인</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>일정</ItemLabel>
        <ItemValue>2024-11-29 ~ 2025-06-18</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>티켓 가격</ItemLabel>
        <ItemValue>25000 원</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>작가</ItemLabel>
        <ItemValue>김철용 화백, 곽두팔 화백, 김성우 작가</ItemValue>
      </InformationItem>
      <InfoBox>
        <Title>전시 내용</Title>
        <Info>
          일상의 틀을 깨고 새로운 시각으로 세상을 바라보는 현대 미술. 작가들은
          색과 형태, 감정의 조화를 통해 우리에게 질문을 던집니다. 시간과 공간을
          초월한 감각적인 색채와 추상적인 형태. 현대 미술은 관객의 해석 속에서
          완성됩니다.
        </Info>
      </InfoBox>
    </InformationContainer>
  );
}

export default UserGalleryInformation;
