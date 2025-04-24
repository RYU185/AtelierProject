import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  font-size: 14px; /* 글자 크기 키움 */
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
  color: #add8e6; /* 옅은 하늘색 */
  cursor: pointer;
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  /* 아이콘 스타일 */
  svg {
    stroke-width: 2;
  }
`;

const MenuIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  font-size: 16px;
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
  color: #888;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

function Community({
  id,
  user,
  uploadDate,
  text,
  img,
  likes,
  onDelete,
  onOpenModal,
  isModal,
  currentImageIndex: propCurrentImageIndex, // 모달로부터 전달받는 인덱스
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 내부에서 관리하는 인덱스
  const navigate = useNavigate();
  const hasImage = img && img.length > 0;

  useEffect(() => {
    // 모달로부터 currentImageIndex prop이 전달되면 내부 state를 업데이트
    if (propCurrentImageIndex !== undefined) {
      setCurrentImageIndex(propCurrentImageIndex);
    } else {
      setCurrentImageIndex(0); // 모달이 아닐 경우 항상 첫 번째 이미지
    }
  }, [propCurrentImageIndex, img]); // img prop이 변경될 때도 초기화

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const toggleHeart = (e) => {
    e.stopPropagation();
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePostClick = (e) => {
    if (!isModal) {
      onOpenModal(e, { id, user, uploadDate, text, img, likes });
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isModal && hasImage) {
      onOpenModal(e, {
        id,
        user,
        uploadDate,
        text,
        img,
        likes,
        initialImageIndex: currentImageIndex,
      });
    }
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    if (!isModal) {
      onOpenModal(e, {
        id,
        user,
        uploadDate,
        text,
        img,
        likes,
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

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log("수정 기능 (ID:", id, ")");
    setIsMenuOpen(false);
    navigate(`/community/modify/${id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Container onClick={handlePostClick}>
      <Header>
        <UserInfo>
          <Nickname>{user}</Nickname>
          <DateText>{formatDate(uploadDate)}</DateText>
        </UserInfo>
        <MenuIconWrapper onClick={toggleMenu}>
          <MenuIcon />
          {isMenuOpen && (
            <MenuDropdown onClick={(e) => e.stopPropagation()}>
              <MenuItemM onClick={handleEdit}>수정</MenuItemM>
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
              src={`/public/images/DrawingIMG/${image}`}
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
          {isHeartFilled ? <BsHeartFill /> : <BsHeart />}
          <span>{likeCount}</span>
        </ActionIcon>
        <ChatIconStyled onClick={handleChatClick} />
      </Actions>
    </Container>
  );
}

export default Community;
