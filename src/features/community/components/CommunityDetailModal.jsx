import React from "react";
import styled from "styled-components";
import Community from "./Community";
import CommentList from "./CommentList";
import { IoClose } from "react-icons/io5"; // 닫기 아이콘 import

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 1350px;
  max-height: 95%;
  position: relative;
  display: flex;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(98vh - 60px - 250px /* 댓글 영역 예상 높이 감소 */);
`;

const CommunityWrapper = styled.div`
  flex-shrink: 0;
  overflow-y: auto;
`;

const CommentsWrapper = styled.div`
  width: 550px;
  padding: 30px;
  border-left: 1px solid #e2e8f0;
  overflow-y: auto;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 36px;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    color: #e53e3e;
  }
`;

function CommunityDetailModal({ post, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <ContentWrapper>
          {post && (
            <CommunityWrapper>
              <Community
                {...post}
                user={{ nickname: post.userNickname }}
                onOpenModal={() => {}}
                onDelete={() => {}}
                isModal={true}
              />
            </CommunityWrapper>
          )}
        </ContentWrapper>
        <CommentsWrapper>
          {post && <CommentList postId={post ? post.id : null} />}
        </CommentsWrapper>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CommunityDetailModal;
