import React, { useState, useEffect } from "react";
import Community from "./Community";
import CommunityDetail from "./CommunityDetail";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AddPostModal from "./AddPostModal";

const primaryColor = "#64b5f6"; // 소프트 블루
const secondaryColor = "#4fc3f7"; // 보조 소프트톤
const backgroundColor = "#f0f4f8"; // 밝고 깔끔한 배경
const cardBackground = "#ffffff"; // 카드 배경
const textColor = "#2e3a59";
const borderColor = "#dce3eb";
const hoverColor = "#e3f2fd";
const shadow = "0 4px 20px rgba(0,0,0,0.06)";

const Container = styled.div`
  width: 70%;
  background-color: ${backgroundColor};
  border-radius: 16px;
  margin: 0 auto 80px;
  padding-top: 20px;
  box-shadow: ${shadow};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  background-color: white;
  border: 1.5px solid ${borderColor};
  color: ${textColor};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${hoverColor};
    border-color: ${primaryColor};
    color: ${primaryColor};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const StyledDrawwButton = styled(StyledButton)`
  background-color: ${primaryColor};
  color: white;
  border: none;

  &:hover {
    background-color: ${secondaryColor};
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;

  & > div {
    background: ${cardBackground};
    border-radius: 16px;
    box-shadow: ${shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 20px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }
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

  const [sortBy, setSortBy] = useState("latest");

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
