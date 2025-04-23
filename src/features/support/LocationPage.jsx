import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #e1e1e1;
  margin-bottom: 40px;
  text-align: center;
  position: relative;

  &::after {
    content: "LOCATION";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f8f9fa;
  margin-bottom: 30px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
  width: 100px;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: #333333;
`;

const TransportSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TransportTitle = styled.h4`
  font-size: 16px;
  color: #e1e1e1;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 16px;
    background-color: #007aff;
    margin-right: 8px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #e1e1e1;

  li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 8px;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #007aff;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const LocationPage = () => {
  useEffect(() => {
    // 구글 맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmGI0j6d781i2SpRD4LHS081knMiQM_B0`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const location = { lat: 36.32870201193343, lng: 127.42299855952346 }; // 정확한 좌표로 변경
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 17,
    });

    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
      title: "DW아카데미학원",
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: `
      <div style="padding: 10px;">
        <h3 style="margin: 0 0 5px 0;">DW아카데미학원</h3>
        <p style="margin: 0;">대전광역시 중구 중앙로121번길 20<br>방산빌딩 2층, 3층(일부), 5층</p>
      </div>
    `,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  };

  return (
    <Container>
      <Title>오시는 길</Title>
      <Section>
        <MapContainer id="map" />
        <InfoBox>
          <InfoItem>
            <Label>주소</Label>
            <Value>
              대전광역시 중구 중앙로121번길 20 방산빌딩 2층, 3층(일부), 5층
            </Value>
          </InfoItem>
          <InfoItem>
            <Label>전화번호</Label>
            <Value>042-222-2402</Value>
          </InfoItem>
        </InfoBox>
      </Section>

      <Section>
        <TransportTitle>교통안내</TransportTitle>
        <TransportSection>
          <TransportTitle>지하철</TransportTitle>
          <List>
            <li>대전역 1번 출구에서 도보 15분</li>
          </List>
        </TransportSection>

        <TransportSection>
          <TransportTitle>버스</TransportTitle>
          <List>
            <li>대전역에서 하차 후 도보 15분</li>
          </List>
        </TransportSection>

        <TransportSection>
          <TransportTitle>자가용</TransportTitle>
          <List>
            <li>선화로에서 좌회전하고 앞으로 직진</li>
            <li>지하 주차장 이용 가능 (2시간 무료주차)</li>
            <li>
              내비게이션 검색: "DW아카데미학원" 또는 "대전 중구 중앙로121번길
              20"
            </li>
          </List>
        </TransportSection>
      </Section>
    </Container>
  );
};

export default LocationPage;
