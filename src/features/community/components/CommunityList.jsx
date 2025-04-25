import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Community from "./Community";
import CommunityDetailModal from "./CommunityDetailModal"; // 변경된 모달 컴포넌트 import
import AddPostModal from "./AddPostModal";

const backgroundColor = "#f0f4f8";
const cardBackground = "#ffffff";
const textColor = "#2e3a59";
const borderColor = "#dce3eb";
const shadow = "0 4px 20px rgba(0,0,0,0.06)";
const buttonGradient = "linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%)";
const drawButtonGradient = "linear-gradient(135deg, #b3e5fc 0%, #4fc3f7 100%)";
const drawButtonHoverGradient =
  "linear-gradient(135deg, #81d4fa 0%, #b3e5fc 100%)";

const Container = styled.div`
  width: 70%;
  background-color: #f0f4f8;
  border-radius: 16px;
  margin: 0 auto 80px;
  padding-top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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
  border: 1.5px solid #dce3eb;
  color: #2e3a59;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%);
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
  background: linear-gradient(135deg, #b3e5fc 0%, #4fc3f7 100%);
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(179, 229, 252, 0.3);

  &:hover {
    background: linear-gradient(135deg, #81d4fa 0%, #b3e5fc 100%);
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
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [communityItems, setCommunityItems] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isMyPostsView, setIsMyPostsView] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPostClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = localStorage.getItem("token"); // 백엔드 응답에 따른 키 값 사용
      if (accessToken) {
        try {
          const response = await axios.get("/api/user/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          // 응답 데이터에서 필요한 사용자 정보 추출
          setLoggedInUser({
            userId: response.data.userId, // 실제 userId 필드명으로 변경
            nickname: response.data.nickname,
            // 필요한 다른 사용자 정보도 포함
          });
        } catch (error) {
          console.error("CommunityList: 사용자 정보 가져오기 실패:", error);
          setLoggedInUser(null);
        } finally {
          setIsLoadingUser(false);
        }
      } else {
        setLoggedInUser(null);
        setIsLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchCommunityData();
    setIsMyPostsView(false);
  }, []);

  const fetchCommunityData = async () => {
    try {
      const response = await axios.get("/api/community");
      // 각 게시글에 현재 사용자의 좋아요 여부 정보를 추가
      const updatedItems = await Promise.all(
        response.data.map(async (post) => {
          const isLiked = loggedInUser?.userId
            ? await checkLikeStatus(post.id, localStorage.getItem("token"))
            : false;
          return { ...post, isLiked };
        })
      );
      setCommunityItems(updatedItems);
      setIsMyPostsView(false);
    } catch (error) {
      console.error("커뮤니티 데이터 로딩 실패:", error);
    }
  };

  const checkLikeStatus = async (communityId, token) => {
    if (!token) return false;
    try {
      const response = await axios.get(
        `/api/community/like/check/${communityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("좋아요 상태 확인 실패:", error);
      return false;
    }
  };

  const handleViewMyPostsClick = async () => {
    const accessToken = localStorage.getItem("token"); // 백엔드 응답에 따른 키 값 사용
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axios.get("/api/community/my", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // 각 게시글에 현재 사용자의 좋아요 여부 정보를 추가
      const updatedItems = await Promise.all(
        response.data.map(async (post) => {
          const isLiked = loggedInUser?.userId
            ? await checkLikeStatus(post.id, localStorage.getItem("token"))
            : false;
          return { ...post, isLiked };
        })
      );
      setCommunityItems(updatedItems);
      setSortBy("latest");
      setIsMyPostsView(true);
    } catch (error) {
      console.error("나의 게시글 로딩 실패:", error);
      alert("나의 게시글을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleViewAllPostsClick = () => {
    fetchCommunityData();
    setIsMyPostsView(false);
  };

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
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsDetailModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      const accessToken = localStorage.getItem("token"); // 백엔드 응답에 따른 키 값 사용
      try {
        const response = await axios.post(`/api/community/delete/${id}`, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setCommunityItems((prev) => prev.filter((item) => item.id !== id));
          alert(response.data);
          if (selectedPost && selectedPost.id === id) {
            setSelectedPost(null);
            setIsDetailModalOpen(false);
          }
        } else {
          alert("삭제 실패");
        }
      } catch (error) {
        console.error("삭제 요청 에러:", error);
        alert("삭제 중 오류 발생");
      }
    }
  };

  const handleAddPost = async (newPost) => {
    const accessToken = localStorage.getItem("token"); // 백엔드 응답에 따른 키 값 사용
    try {
      const response = await axios.post("/api/community/add", newPost, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 201) {
        setCommunityItems((prev) => [response.data, ...prev]);
        navigate("/community");
      } else {
        alert("게시글 등록 실패");
      }
    } catch (error) {
      console.error("게시글 등록 에러:", error);
      alert("게시글 등록 중 오류 발생");
    }
  };

  const handleSortChange = (type) => {
    setSortBy(type);
  };

  return (
    <div>
      <Container>
        <ButtonBox>
          <StyledButton
            onClick={handleViewAllPostsClick}
            style={{
              background: !isMyPostsView ? buttonGradient : "white",
              color: !isMyPostsView ? "white" : textColor,
              borderColor: !isMyPostsView ? "transparent" : borderColor,
            }}
          >
            전체 보기
          </StyledButton>
          <StyledButton
            onClick={handleViewMyPostsClick}
            style={{
              background: isMyPostsView ? buttonGradient : "white",
              color: isMyPostsView ? "white" : textColor,
              borderColor: isMyPostsView ? "transparent" : borderColor,
            }}
          >
            나의 글 보기
          </StyledButton>
          <StyledButton onClick={handleAddPostClick}>게시글 등록</StyledButton>
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
            }}
          >
            인기순
          </SortButton>
        </SortButtonBox>

        <Grid>
          {!isLoadingUser &&
            sortedCommunityItems.map((post) => (
              <Community
                key={post.id}
                {...post}
                user={{ nickname: post.userNickname }}
                onOpenModal={handleOpenModal}
                onDelete={handleDelete}
                currentUser={loggedInUser}
                isLiked={post.isLiked} // 좋아요 여부 prop 전달
              />
            ))}
          {isLoadingUser && <div>사용자 정보를 로딩 중입니다...</div>}
        </Grid>
        {isAddModalOpen && (
          <AddPostModal
            onClose={handleCloseAddModal}
            onSubmit={handleAddPost}
            userNickname={localStorage.getItem("nickname")}
          />
        )}
      </Container>

      {isDetailModalOpen && selectedPost && (
        <CommunityDetailModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CommunityList;
