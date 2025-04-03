import React, { useState } from "react";
import styled from "styled-components";
import { BsThreeDots, BsHeart, BsHeartFill, BsChat } from "react-icons/bs";

const Container = styled.div`
  width: 600px;
  padding: 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;
  margin-bottom: 50px;
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
  font-size: 20px;
  font-weight: bold;
  color: #777;
`;

const DateText = styled.span`
  font-size: 13px;
  color: #a0a0a0;
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

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
`;

const ActionIcon = styled.div`
  font-size: 24px;
  margin-right: 25px;
  color: #ff6347;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(1.3); // 클릭 시 크기 확대
  }
`;

const ChatIcon = styled(BsChat)`
  font-size: 24px;
  color: #888;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

function Community({ id, nickname, datetext, content }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Nickname>{nickname}</Nickname>
          <DateText>{datetext}</DateText>
        </UserInfo>
        <MenuIcon />
      </Header>
      <Divider />
      <Content>{content}</Content>
      <Actions>
        <ActionIcon onClick={toggleHeart}>
          {isHeartFilled ? <BsHeartFill /> : <BsHeart />}
        </ActionIcon>
        <ChatIcon />
      </Actions>
    </Container>
  );
}

export default Community;
