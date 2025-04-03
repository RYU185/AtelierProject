import React from "react";
import styled from "styled-components";

const InformationContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
  padding: 20px;
  background-color: #f4f4f4;
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

function ArtistGalleryInformation() {
  return (
    <InformationContainer>
      <InformationTitle>전시 정보</InformationTitle>
      <InformationItem>
        <ItemLabel>제목</ItemLabel>
        <ItemValue>삶의 예찬</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>일정</ItemLabel>
        <ItemValue>2024-11-29 ~ 2025-05-18</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>티켓 가격</ItemLabel>
        <ItemValue>25000 원</ItemValue>
      </InformationItem>
      <InformationItem>
        <ItemLabel>작가</ItemLabel>
        <ItemValue>곽두팔 화백, 김철용 화백</ItemValue>
      </InformationItem>
      <InfoBox>
        <Title>전시 내용</Title>
        <Info>
          첫 번째 상영작인 앙리 조르주 클루조 감독의 &lt;피카소의
          비밀&gt;(1956)은 끊임없는 생각들을 자신의 화폭에 담아가는 피카소의
          작업 과정을 담은 다큐멘터리이다. 이어지는 &lt;알토&gt;(2020)는
          핀란드를 대표하는 건축가 겸 디자이너 알바 알토와 건축가인 그의 아내
          아이노 알토의 삶과 창작의 과정을 탐구한다.
        </Info>
      </InfoBox>
    </InformationContainer>
  );
}

export default ArtistGalleryInformation;
