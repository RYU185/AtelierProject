import React, { useState } from "react";
import styled from "styled-components";
import {
  BsThreeDots,
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
  cursor: pointer;
`;

const DateText = styled.span`
  font-size: 11px;
  color: #a0a0a0;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #018ec8;
  margin: 8px 0;
`;

const Content = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  cursor: pointer;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* 이미지가 없을 때 최대 5줄 표시 */
  flex-grow: 1;
`;

const PostImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px; /* 화살표가 위치할 공간 확보 */
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
`;

const MenuIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const MenuIcon = styled(BsThreeDots)`
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

const ChatIcon = styled(BsChat)`
  font-size: 18px;
  color: #888;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ImageNavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 24px;
  color: #99cedf; /* 옅은 하늘색 */

  cursor: pointer;
  z-index: 10;
  padding: 10px;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;

const ImageControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const ImageCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

function Community({ id, user, uploadDate, text, img, likes, onDelete }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const hasImage = img && img.length > 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const toggleHeart = () => {
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
    setIsHeartFilled(!isHeartFilled);
    // TODO: 백엔드에 좋아요 토글 요청 보내기
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePostClick = () => {
    navigate(`/community/detail/${id}`); // 상세 페이지 경로로 이동
  };

  const goToPreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : img.length - 1
    );
  };

  const goToNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex < img.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleEdit = () => {
    // 수정 기능 구현 (예: 수정 모달 열기)
    console.log("수정 기능 (ID:", id, ")");
    setIsMenuOpen(false);
    // TODO: 수정 페이지 또는 모달로 이동하는 로직 구현
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Nickname onClick={handlePostClick}>{user}</Nickname>
          <DateText onClick={handlePostClick}>
            {formatDate(uploadDate)}
          </DateText>
        </UserInfo>
        <MenuIconWrapper onClick={toggleMenu}>
          <MenuIcon />
          {isMenuOpen && (
            <MenuDropdown onClick={(e) => e.stopPropagation()}>
              <MenuItemM onClick={handleEdit}>수정</MenuItemM>
              <MenuItemD onClick={() => onDelete(id)}>삭제</MenuItemD>
            </MenuDropdown>
          )}
        </MenuIconWrapper>
      </Header>
      <Divider />

      <Content $hasImage={hasImage} onClick={handlePostClick}>
        {text}
      </Content>

      {hasImage && (
        <>
          <PostImageWrapper $hasImage={hasImage} onClick={handlePostClick}>
            <PostImage
              src={`/public/images/DrawingIMG/${img[currentImageIndex]}`}
              alt={`첨부된 이미지 ${currentImageIndex + 1}`}
            />
            {img.length > 1 && (
              <>
                <ImageNavigationButton
                  className="left"
                  onClick={goToPreviousImage}
                  style={{ left: 0 }}
                >
                  <BsChevronLeft />
                </ImageNavigationButton>
                <ImageNavigationButton
                  className="right"
                  onClick={goToNextImage}
                  style={{ right: 0 }}
                >
                  <BsChevronRight />
                </ImageNavigationButton>
              </>
            )}
          </PostImageWrapper>
          {img.length > 1 && (
            <ImageControl>
              <ImageCount>
                {currentImageIndex + 1} / {img.length}
              </ImageCount>
            </ImageControl>
          )}
        </>
      )}

      <Actions>
        <ActionIcon onClick={toggleHeart}>
          {isHeartFilled ? <BsHeartFill /> : <BsHeart />}
          <span>{likeCount}</span>
        </ActionIcon>
        <ChatIcon onClick={handlePostClick} />
      </Actions>
    </Container>
  );
}

export default Community;
