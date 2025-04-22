import React, { useState, useEffect } from "react";
import Community from "./Community";
import CommunityDetail from "./CommunityDetail";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AddPostModal from "./AddPostModal";

const primaryColor = "#00aaff"; // 메인 강조색
const secondaryColor = "#ff6f61"; // 보조 강조색
const backgroundColor = "#f4f9ff"; // 밝은 배경색
const textColor = "#333"; // 기본 글자색
const borderColor = "#d9e3ee"; // 테두리 색상
const hoverColor = "#e1f5fe"; // 호버 시 배경색

const Container = styled.div`
  width: 70%;
  height: auto;
  background-color: ${backgroundColor};
  border-radius: 12px;
  margin: 0 auto;
  margin-bottom: 80px;
  box-shadow: 0 4px 12px rgba(0, 170, 255, 0.15); /* 메인 색상 그림자 */
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const StyledButton = styled.button`
  color: ${textColor};
  background-color: #fff;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid ${borderColor};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    transform 0.1s ease-in-out, border-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${hoverColor};
    color: ${primaryColor};
    border-color: ${primaryColor};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledDrawwButton = styled(StyledButton)`
  background-color: ${primaryColor};
  color: white;
  border: none;

  &:hover {
    background-color: ${secondaryColor};
    color: white;
  }
`;

const SortButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const SortButton = styled(StyledButton)`
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 15px;
  overflow-y: auto;
  max-height: 645px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${primaryColor};
    border-radius: 4px;
    max-height: 30px;
  }
`;

function CommunityList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPost, setSelectedPost] = useState(null);
  const [communityItems, setCommunityItems] = useState([
    {
      id: 1,
      nickname: "귀염둥이",
      drawingImage: "/src/assets/UserDrawingIMG/Drawing.jpg",
      datetext: "2025.03.27 12:00",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
      likes: 15,
      date: new Date("2025-03-27T12:00:00"),
    },
    {
      id: 2,
      nickname: "둘리",
      datetext: "2025.03.28 13:00",
      content:
        "두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. 두번째 게시글 입니다. ",
      likes: 5,
      date: new Date("2025-03-28T13:00:00"),
    },
    {
      id: 3,
      nickname: "마이콜",
      drawingImage: "/src/assets/UserDrawingIMG/Drawing1.png",
      datetext: "2025.03.29 14:00",
      content:
        "세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. 세번째 게시글 입니다. ",
      likes: 22,
      date: new Date("2025-03-29T14:00:00"),
    },
    {
      id: 4,
      nickname: "귀염둥이",
      drawingImage: "/src/assets/UserDrawingIMG/Drawing3.png",
      datetext: "2025.03.27 12:00",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
      likes: 8,
      date: new Date("2025-03-27T12:00:00"),
    },
    {
      id: 5,
      nickname: "곽철용",
      datetext: "2025.03.28 13:00",
      content:
        "안녕하십니까 묻고 더블로가 마포대교는 무너졌냐 내 순정을 무시하면 그땐 나도 깡패가 되는거야야  ",
      likes: 35,
      date: new Date("2025-03-28T13:00:00"),
    },
    {
      id: 6,
      nickname: "예림림",
      datetext: "2025.03.29 14:00",
      content: "쏠수 있어 진짜 쏠수 있어 ",
      likes: 12,
      date: new Date("2025-03-29T14:00:00"),
    },
    {
      id: 7,
      nickname: "고길동",
      drawingImage: "/src/assets/UserDrawingIMG/test.png",
      datetext: "2025.03.30 15:00",
      content: "오냐! ",
      likes: 3,
      date: new Date("2025-03-30T15:00:00"),
    },
  ]);

  const [sortBy, setSortBy] = useState("latest"); // 기본 정렬 방식

  const sortedCommunityItems = [...communityItems].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "latest") {
      return b.date - a.date;
    } else if (sortBy === "oldest") {
      return a.date - b.date;
    }
    return 0;
  });

  const handleOpenModal = (e, post) => {
    e.stopPropagation();
    setSelectedPost(post);
    navigate(`/community/${post.id}`);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    navigate("/community");
  };

  const handleAddPostClick = () => {
    navigate("/community/add");
  };

  const handleCloseAddModal = () => {
    navigate("/community");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      setCommunityItems((prev) => prev.filter((post) => post.id !== id));
      alert("삭제가 완료되었습니다.");
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
        navigate("/community");
      }
    }
  };

  const handleAddPost = (newPost) => {
    setCommunityItems((prev) => [newPost, ...prev]);
  };

  const handleSortChange = (type) => {
    setSortBy(type);
  };

  const isAddModalOpen = location.pathname === "/community/add";

  return (
    <div>
      <Container>
        <ButtonBox>
          <StyledButton onClick={handleAddPostClick}>게시글 등록</StyledButton>
          <StyledButton>나의 글 보기</StyledButton>
          <StyledDrawwButton onClick={() => navigate("/drawingcanvas")}>
            작품 그리기
          </StyledDrawwButton>
        </ButtonBox>

        <SortButtonBox>
          <SortButton onClick={() => handleSortChange("popular")}>
            인기순
          </SortButton>
          <SortButton onClick={() => handleSortChange("latest")}>
            최신순
          </SortButton>
          <SortButton onClick={() => handleSortChange("oldest")}>
            오래된순
          </SortButton>
        </SortButtonBox>

        <Grid>
          {sortedCommunityItems.map((post) => (
            <Community
              key={post.id}
              {...post}
              onOpenModal={handleOpenModal}
              onDelete={handleDelete}
            />
          ))}
        </Grid>
      </Container>

      {selectedPost && (
        <CommunityDetail
          post={selectedPost}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}

      {isAddModalOpen && (
        <AddPostModal onClose={handleCloseAddModal} onSubmit={handleAddPost} />
      )}
    </div>
  );
}

export default CommunityList;
