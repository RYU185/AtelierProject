import React, { useState, useEffect } from "react";
import Community from "./Community";
import CommunityDetail from "./CommunityDetail";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AddPostModal from "./AddPostModal";
import axios from "axios";

const primaryColor = "#64b5f6";
const secondaryColor = "#4fc3f7";
const backgroundColor = "#f0f4f8";
const cardBackground = "#ffffff";
const textColor = "#2e3a59";
const borderColor = "#dce3eb";
const hoverColor = "#90caf9";
const shadow = "0 4px 20px rgba(0,0,0,0.06)";
const buttonGradient = "linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%)";
const buttonHoverGradient = "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)";
const drawButtonGradient = "linear-gradient(135deg, #b3e5fc 0%, #4fc3f7 100%)";
const drawButtonHoverGradient =
  "linear-gradient(135deg, #81d4fa 0%, #b3e5fc 100%)";

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
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background-color: white;
  border: 1.5px solid ${borderColor};
  color: ${textColor};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${buttonGradient};
    border-color: transparent;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const StyledDrawwButton = styled(StyledButton)`
  background: ${drawButtonGradient};
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(179, 229, 252, 0.3);

  &:hover {
    background: ${drawButtonHoverGradient};
    box-shadow: 0 4px 10px rgba(179, 229, 252, 0.4);
    transform: translateY(-3px);
  }
`;

const SortButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const SortButton = styled(StyledButton)`
  margin-left: 10px;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  const [communityItems, setCommunityItems] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get("/api/community");
        setCommunityItems(response.data);
      } catch (error) {
        console.error("커뮤니티 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchCommunityData();
  }, []);

  const sortedCommunityItems = [...communityItems].sort((a, b) => {
    const dateA = new Date(a.uploadDate);
    const dateB = new Date(b.uploadDate);

    if (sortBy === "popular") {
      return b.likes - a.likes;
    } else if (sortBy === "latest") {
      return dateB - dateA;
    } else if (sortBy === "oldest") {
      return dateA - dateB;
    }
    return 0;
  });

  const handleOpenModal = (e, post) => {
    e.stopPropagation();
    setSelectedPost(post);
    navigate(`/community/detail/id/${post.id}`);
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await axios.post(`/api/community/delete/${id}`);
        if (response.status === 200) {
          setCommunityItems((prev) => prev.filter((post) => post.id !== id));
          alert(response.data);
          if (selectedPost && selectedPost.id === id) {
            setSelectedPost(null);
            navigate("/community");
          }
        } else {
          alert("삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("삭제 요청 에러:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post("/api/community/add", newPost);
      if (response.status === 201) {
        setCommunityItems((prev) => [response.data, ...prev]);
        navigate("/community");
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 등록 에러:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleSortChange = (type) => {
    setSortBy(type);
  };

  const isAddModalOpen = location.pathname === "/community/add";
  const isDetailModalOpen = location.pathname.startsWith(
    "/community/detail/id/"
  );
  const detailPostId = isDetailModalOpen
    ? location.pathname.split("/").pop()
    : null;
  const selectedDetailPost = communityItems.find(
    (post) => post.id === parseInt(detailPostId)
  );

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
          <SortButton
            onClick={() => handleSortChange("latest")}
            style={{
              background: sortBy === "latest" ? buttonGradient : "white",
              color: sortBy === "latest" ? "white" : textColor,
              borderColor: sortBy === "latest" ? "transparent" : borderColor,
              transform: sortBy === "latest" ? "translateY(-3px)" : "none",
              boxShadow:
                sortBy === "latest"
                  ? "0 4px 10px rgba(0, 0, 0, 0.15)"
                  : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            최신순
          </SortButton>
          <SortButton
            onClick={() => handleSortChange("oldest")}
            style={{
              background: sortBy === "oldest" ? buttonGradient : "white",
              color: sortBy === "oldest" ? "white" : textColor,
              borderColor: sortBy === "oldest" ? "transparent" : borderColor,
              transform: sortBy === "oldest" ? "translateY(-3px)" : "none",
              boxShadow:
                sortBy === "oldest"
                  ? "0 4px 10px rgba(0, 0, 0, 0.15)"
                  : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            오래된순
          </SortButton>
          <SortButton
            onClick={() => handleSortChange("popular")}
            style={{
              background: sortBy === "popular" ? buttonGradient : "white",
              color: sortBy === "popular" ? "white" : textColor,
              borderColor: sortBy === "popular" ? "transparent" : borderColor,
              transform: sortBy === "popular" ? "translateY(-3px)" : "none",
              boxShadow:
                sortBy === "popular"
                  ? "0 4px 10px rgba(0, 0, 0, 0.15)"
                  : "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            인기순
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

      {selectedDetailPost && (
        <CommunityDetail
          post={selectedDetailPost}
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
