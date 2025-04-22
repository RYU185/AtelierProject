import React, { useState } from "react";
import styled from "styled-components";
import {
  BsThreeDots,
  BsHeart,
  BsHeartFill,
  BsChat,
  BsArrowsFullscreen,
} from "react-icons/bs";
import FullImageModal from "./FullImageModal";
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
  -webkit-line-clamp: ${(props) => (props.$hasImage ? 2 : 5)};
  flex-grow: 1;
`;

const PostImageWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 8px;
  height: ${(props) => (props.$hasImage ? "auto" : "0px")};
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  display: ${(props) => (props.$hasImage ? "block" : "none")};

  &:hover {
    transform: scale(1.05);
  }
`;

const ExpandButton = styled(BsArrowsFullscreen)`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 5px;
  right: 5px;
  font-size: 18px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 25%;
  padding: 3px;
  cursor: pointer;
  z-index: 5;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
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

function Community({
  id,
  nickname,
  datetext,
  content,
  drawingImage,
  onOpenModal,
  onDelete,
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const hasImage = !!drawingImage;

  const toggleHeart = () => {
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    navigate(`/community/modify/${id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Nickname
            onClick={(e) =>
              onOpenModal(e, { id, nickname, datetext, content, drawingImage })
            }
          >
            {nickname}
          </Nickname>
          <DateText
            onClick={(e) =>
              onOpenModal(e, { id, nickname, datetext, content, drawingImage })
            }
          >
            {datetext}
          </DateText>
        </UserInfo>
        <MenuIconWrapper onClick={toggleMenu}>
          <MenuIcon />
          {isMenuOpen && (
            <MenuDropdown>
              <MenuItemM onClick={handleEdit}>수정</MenuItemM>
              <MenuItemD onClick={handleDelete}>삭제</MenuItemD>
            </MenuDropdown>
          )}
        </MenuIconWrapper>
      </Header>
      <Divider />

      <Content
        $hasImage={hasImage}
        onClick={(e) =>
          onOpenModal(e, { id, nickname, datetext, content, drawingImage })
        }
      >
        {content}
      </Content>

      <PostImageWrapper $hasImage={hasImage}>
        <PostImage
          src={drawingImage}
          alt="Attached Content"
          onClick={(e) =>
            onOpenModal(e, { id, nickname, datetext, content, drawingImage })
          }
          $hasImage={hasImage}
        />
        {hasImage && <ExpandButton onClick={openModal} />}
      </PostImageWrapper>

      <Actions>
        <ActionIcon onClick={toggleHeart}>
          {isHeartFilled ? <BsHeartFill /> : <BsHeart />}
          <span>{likeCount}</span>
        </ActionIcon>
        <ChatIcon
          onClick={(e) =>
            onOpenModal(e, { id, nickname, datetext, content, drawingImage })
          }
        />
      </Actions>

      {isModalOpen && (
        <FullImageModal image={drawingImage} onClose={closeModal} />
      )}
    </Container>
  );
}

export default Community;
