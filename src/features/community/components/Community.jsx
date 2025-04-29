import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsHeart, BsChat, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
  font-size: 16px;
  font-weight: bold;
  color: #777;
`;

const DateText = styled.span`
  font-size: 11px;
  color: #a0a0a0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #018ec8;
  margin: 8px 0;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  flex-grow: 1;
`;

const PostImageCarousel = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 8px;
  max-height: 400px;
`;

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  opacity: ${(props) => (props.$active ? 1 : 0)};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #add8e6;
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  svg {
    stroke-width: 2;
  }

  &.left {
    left: 5px;
  }

  &.right {
    right: 5px;
  }
`;

const MenuIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const MenuIcon = styled(FiMoreVertical)`
  font-size: 20px;
  color: #888;
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
`;

const MenuItemM = styled.div`
  width: 80px;
  padding: 8px;
  background: white;
  font-size: 12px;
  color: #018ec8;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f0f0f0;
  }
`;

const MenuItemD = styled.div`
  width: 80px;
  padding: 8px;
  background: white;
  font-size: 12px;
  color: #e16060;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f0f0f0;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  align-items: center;
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-right: 15px;
  color: #ff6347;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(1.3);
  }

  span {
    font-size: 12px;
    margin-left: 4px;
    color: #444;
  }
`;

const ChatIconStyled = styled(BsChat)`
  font-size: 18px;
  color: #555;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

function Community({
  id,
  user: postUser,
  uploadDate,
  text,
  img,
  likes: initialLikes,
  commentCount,
  onDelete,
  onOpenModal,
  isModal,
  currentUser: propCurrentUser,
  currentImageIndex: propCurrentImageIndex,
  openEditModal, // 수정 모달 열기 함수 props로 받음
}) {
  const [likeCount, setLikeCount] = useState(initialLikes || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(propCurrentUser);
  const navigate = useNavigate();
  const hasImage = img && img.length > 0;

  useEffect(() => {
    if (propCurrentUser) {
      setCurrentUser(propCurrentUser);
    } else {
      const fetchCurrentUser = async () => {
        const accessToken = localStorage.getItem("authToken");
        if (accessToken) {
          try {
            const response = await axios.get("/api/user/me", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setCurrentUser(response.data);
          } catch (error) {
            console.error("Community: 사용자 정보 가져오기 실패:", error);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      };
      fetchCurrentUser();
    }
  }, [propCurrentUser]);

  const handleEditClick = (e) => {
    e.stopPropagation();

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    // postUser에 userId가 없는 경우 nickname으로 비교
    if (
      postUser?.userId === undefined &&
      currentUser?.nickName === postUser?.nickname
    ) {
      openEditModal({ id, text });
    } else if (currentUser?.userId === postUser?.userId) {
      openEditModal({ id, text });
    } else {
      alert("본인이 작성한 커뮤니티만 수정할 수 있습니다.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const toggleHeart = async (e) => {
    e.stopPropagation();

    const accessToken = localStorage.getItem("authToken");
    const isLoggedIn = !!accessToken;

    if (!isLoggedIn) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `/api/community/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("toggleHeart - 좋아요 에러:", error);
      alert("좋아요/취소 요청에 실패했습니다.");
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePostClick = (e) => {
    if (!isModal) {
      onOpenModal(e, { id, postUser, uploadDate, text, img, likes: likeCount });
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isModal && hasImage) {
      onOpenModal(e, {
        id,
        postUser,
        uploadDate,
        text,
        img,
        likes: likeCount,
        initialImageIndex: currentImageIndex,
      });
    }
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    if (!isModal) {
      onOpenModal(e, {
        id,
        postUser,
        uploadDate,
        text,
        img,
        likes: likeCount,
        showComments: true,
      });
    }
  };

  const goToPreviousImage = (e) => {
    e.stopPropagation();
    if (hasImage) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : img.length - 1
      );
    }
  };

  const goToNextImage = (e) => {
    e.stopPropagation();
    if (hasImage) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < img.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();

    if (currentUser?.id !== postUser?.id && !currentUser?.isAdmin) {
      alert("본인의 글 또는 관리자만 삭제할 수 있습니다.");
      return;
    }

    const confirmed = window.confirm("정말 이 글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const accessToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `/api/community/delete/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(response.data);
      if (onDelete) onDelete(id);
      window.location.reload();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("handleDeleteClick - 삭제 에러:", error);
      if (error.response?.status === 500) {
        alert("본인의 글만 삭제할 수 있습니다.");
      } else {
        alert("삭제 요청에 실패했습니다. 다시 시도해주세요.");
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Container onClick={handlePostClick}>
        <Header>
          <UserInfo>
            <Nickname>{postUser?.nickname || "알 수 없는 사용자"}</Nickname>
            <DateText>{formatDate(uploadDate)}</DateText>
          </UserInfo>
          <MenuIconWrapper onClick={toggleMenu}>
            <MenuIcon />
            {isMenuOpen && (
              <MenuDropdown onClick={(e) => e.stopPropagation()}>
                <MenuItemM onClick={handleEditClick}>수정</MenuItemM>
                <MenuItemD onClick={handleDeleteClick}>삭제</MenuItemD>
              </MenuDropdown>
            )}
          </MenuIconWrapper>
        </Header>
        <Divider />
        <Content>{text}</Content>
        {hasImage && (
          <PostImageCarousel>
            {img.map((image, index) => (
              <PostImage
                key={index}
                src={
                  image.startsWith("/") ? image : `/images/DrawingIMG/${image}`
                }
                alt={`첨부된 이미지 ${index + 1}`}
                $active={index === currentImageIndex}
              />
            ))}
            {img.length > 1 && (
              <>
                <NavigationButton className="left" onClick={goToPreviousImage}>
                  <BsChevronLeft />
                </NavigationButton>
                <NavigationButton className="right" onClick={goToNextImage}>
                  <BsChevronRight />
                </NavigationButton>
              </>
            )}
          </PostImageCarousel>
        )}
        <Actions onClick={(e) => e.stopPropagation()}>
          <ActionIcon onClick={toggleHeart}>
            <BsHeart />
            <span>{likeCount}</span>
          </ActionIcon>
          <ActionIcon onClick={handleChatClick}>
            <ChatIconStyled />
            <span>{commentCount}</span>
          </ActionIcon>
        </Actions>
      </Container>
    </>
  );
}

export default Community;
