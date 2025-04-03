import React from "react";
import Community from "./Community";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  height: auto;
  background-color: #e5f0fb;
  border-radius: 15px;
  margin: 0 auto;
  margin-bottom: 80px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Button = styled.div`
  color: #018ec8;
  background-color: #ffffff;
  font: bold;
  margin: 60px 20px;
  padding: 25px;
  border-radius: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    border: 1px solid #0b5671;
  }
`;
const DrawwButton = styled.div`
  color: #ffffff;
  background-color: #018ec8;
  font: bold;
  margin: 60px 20px;
  padding: 25px;
  border-radius: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    border: 1px solid #0c0c0c;
  }
`;

const Gird = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 600px;
`;

function CommunityList() {
  const communityItems = [
    {
      id: 1,
      nickname: "귀염둥이",
      datetext: "2025.03.27 12:00",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
    },
    {
      id: 2,
      nickname: "둘리",
      datetext: "2025.03.28 13:00",
      content:
        "두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. ",
    },
    {
      id: 3,
      nickname: "마이콜",
      datetext: "2025.03.29 14:00",
      content:
        "세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. ",
    },
    {
      id: 4,
      nickname: "귀염둥이",
      datetext: "2025.03.27 12:00",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
    },
    {
      id: 5,
      nickname: "곽철용",
      datetext: "2025.03.28 13:00",
      content:
        "안녕하십니까 묻고 더블로가 마포대교는 무너졌냐 내 순정을 무시하면 그땐 나도 깡패가 되는거야야  ",
    },
    {
      id: 6,
      nickname: "예림림",
      datetext: "2025.03.29 14:00",
      content: "쏠수 있어 진짜 쏠수 있어 ",
    },
  ];
  return (
    <div>
      <Container>
        <ButtonBox>
          <Button>게시글 등록</Button>
          <Button>나의 글 보기</Button>
          <DrawwButton>작품 그리기</DrawwButton>
        </ButtonBox>
        <Gird>
          {communityItems.map((item) => (
            <div key={item.id}>
              <Community {...item} />
            </div>
          ))}
        </Gird>
      </Container>
    </div>
  );
}

export default CommunityList;
