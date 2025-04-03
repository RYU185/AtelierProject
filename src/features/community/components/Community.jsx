import React from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs"; // 점 3개 아이콘

const Container = styled.div`
  width: 600px;
  padding: 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #777;
`;

const DateText = styled.span`
  font-size: 12px;
  color: #aaa;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #018ec8;
  margin: 10px 0;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const MenuIcon = styled(BsThreeDots)`
  font-size: 18px;
  color: #888;
  cursor: pointer;
`;

function Community() {
  return (
    <Container>
      <Header>
        <UserInfo>
          <Nickname>귀염둥이</Nickname>
          <DateText>2025.03.27 12:00</DateText>
        </UserInfo>
        <MenuIcon />
      </Header>
      <Divider />
      <Content>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Content>
    </Container>
  );
}

export default Community;
