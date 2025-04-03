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
    content: "GUIDE";
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

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #007aff;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  border: 1px solid #dee2e6;
  text-align: center;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 10px;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #007aff;
    }
  }
`;

const GuidePage = () => {
  const [activeMenu, setActiveMenu] = useState("시설 안내");
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
    <Container>
      <Header />
      <Title>시설 안내</Title>

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
        <SectionTitle>운영시간</SectionTitle>
        <Content>
          <Table>
            <thead>
              <tr>
                <Th>구분</Th>
                <Th>평일</Th>
                <Th>주말/공휴일</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>운영시간</Td>
                <Td>09:00 ~ 18:00</Td>
                <Td>10:00 ~ 17:00</Td>
              </tr>
              <tr>
                <Td>점심시간</Td>
                <Td>12:00 ~ 13:00</Td>
                <Td>12:00 ~ 13:00</Td>
              </tr>
            </tbody>
          </Table>
        </Content>
      </Section>

      <Section>
        <SectionTitle>이용요금</SectionTitle>
        <Content>
          <Table>
            <thead>
              <tr>
                <Th>구분</Th>
                <Th>성인</Th>
                <Th>청소년</Th>
                <Th>어린이</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>1회 이용권</Td>
                <Td>10,000원</Td>
                <Td>8,000원</Td>
                <Td>5,000원</Td>
              </tr>
              <tr>
                <Td>정기권 (월)</Td>
                <Td>90,000원</Td>
                <Td>70,000원</Td>
                <Td>45,000원</Td>
              </tr>
            </tbody>
          </Table>
        </Content>
      </Section>

      <Section>
        <SectionTitle>이용안내</SectionTitle>
        <Content>
          <List>
            <li>시설 이용 시 반드시 회원카드를 지참해주시기 바랍니다.</li>
            <li>
              안전한 이용을 위해 시설 내 뛰거나 소란을 피우는 행위를 금지합니다.
            </li>
            <li>귀중품은 반드시 보관함에 보관해 주시기 바랍니다.</li>
            <li>시설 내 음식물 반입이 금지됩니다.</li>
            <li>타인에게 피해를 주는 행위는 퇴장 조치될 수 있습니다.</li>
          </List>
        </Content>
      </Section>

      <Section>
        <SectionTitle>휴관일</SectionTitle>
        <Content>
          <List>
            <li>매월 첫째 주 월요일</li>
            <li>법정 공휴일</li>
            <li>시설 정비 기간 (별도 공지)</li>
          </List>
        </Content>
      </Section>
    </Container>
  );
};

export default GuidePage;
