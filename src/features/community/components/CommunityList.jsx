import React, { useState } from "react";
import Community from "./Community";
import CommunityDetail from "./CommunityDetail";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  font-weight: bold;
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
  font-weight: bold;
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

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 600px;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #bcd0db;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #018ec8;
    border-radius: 5px;
    max-height: 30px;
  }
`;

// 모달 배경 (블러 처리)
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

function CommunityList() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const communityItems = [
    {
      id: 1,
      nickname: "귀염둥이",
      drawingImage: "/src/assets/UserDrawingIMG/Drawing.jpg",
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
      drawingImage: "/src/assets/UserDrawingIMG/Drawing1.png",
      datetext: "2025.03.29 14:00",
      content:
        "세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. ",
    },
    {
      id: 4,
      nickname: "귀염둥이",
      drawingImage: "/src/assets/UserDrawingIMG/Drawing3.png",
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
          <DrawwButton onClick={() => navigate("/drawingcanvas")}>
            작품 그리기
          </DrawwButton>
        </ButtonBox>
        <Grid>
          {communityItems.map((item) => (
            <div key={item.id} onClick={() => setSelectedPost(item)}>
              {" "}
              <Community {...item} />
            </div>
          ))}
        </Grid>
      </Container>

      {selectedPost && (
        <ModalBackground onClick={() => setSelectedPost(null)}>
          {" "}
          <CommunityDetail post={selectedPost} />
        </ModalBackground>
      )}
    </div>
  );
}

export default CommunityList;
