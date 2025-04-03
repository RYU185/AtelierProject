import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
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

const MenuContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const MenuItem = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#007AFF" : "#666")};
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #007AFF;
    }
  `}

  &:hover {
    color: #007aff;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #666;
`;

const TransportSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TransportTitle = styled.h4`
  font-size: 16px;
  color: #333;
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
  const [activeMenu, setActiveMenu] = useState("오시는 길");
  const navigate = useNavigate();

  const menus = [
    { name: "공지사항", path: "/support/notice" },
    { name: "시설 안내", path: "/support/guide" },
    { name: "오시는 길", path: "/support/location" },
    { name: "문의하기", path: "/support/contact" },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);
    navigate(menu.path);
  };

  return (
    <>
      <Header />
      <Container>
        <Title>오시는 길</Title>

        <MenuContainer>
          {menus.map((menu) => (
            <MenuItem
              key={menu.name}
              active={activeMenu === menu.name}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuContainer>

        <Section>
          <MapContainer>
            지도가 표시될 영역입니다.
            {/* TODO: 카카오맵 또는 네이버맵 API 연동 */}
          </MapContainer>

          <InfoBox>
            <InfoItem>
              <Label>주소</Label>
              <Value>서울특별시 강남구 테헤란로 123 OO빌딩 5층</Value>
            </InfoItem>
            <InfoItem>
              <Label>전화번호</Label>
              <Value>02-1234-5678</Value>
            </InfoItem>
            <InfoItem>
              <Label>팩스</Label>
              <Value>02-1234-5679</Value>
            </InfoItem>
            <InfoItem>
              <Label>이메일</Label>
              <Value>info@example.com</Value>
            </InfoItem>
          </InfoBox>
        </Section>

        <Section>
          <TransportTitle>교통안내</TransportTitle>
          <TransportSection>
            <TransportTitle>지하철</TransportTitle>
            <List>
              <li>2호선 강남역 3번 출구에서 도보 5분</li>
              <li>신분당선 강남역 5번 출구에서 도보 7분</li>
            </List>
          </TransportSection>

          <TransportSection>
            <TransportTitle>버스</TransportTitle>
            <List>
              <li>간선버스: 140, 144, 145, 146</li>
              <li>지선버스: 3412, 4412</li>
              <li>광역버스: 9404, 9408</li>
            </List>
          </TransportSection>

          <TransportSection>
            <TransportTitle>자가용</TransportTitle>
            <List>
              <li>강남대로에서 테헤란로 방면으로 우회전</li>
              <li>지하 주차장 이용 가능 (2시간 무료주차)</li>
              <li>내비게이션 검색: "OO센터" 또는 "테헤란로 123"</li>
            </List>
          </TransportSection>
        </Section>
      </Container>
    </>
  );
};

export default LocationPage;
