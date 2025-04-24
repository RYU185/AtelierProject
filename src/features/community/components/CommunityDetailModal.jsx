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
  max-height: 90%;
  position: relative;
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px;
`;

const CommentsWrapper = styled.div`
  width: 570px;
  padding: 30px;
  border-left: 1px solid #e2e8f0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0aec0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f7fafc; /* 스크롤 트랙 색상 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #718096; /* 호버 시 스크롤바 색상 */
  }
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 37px;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #cf2e2e;
  }
`;

function CommunityDetailModal({ post, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentWrapper>
          <CloseButton onClick={onClose} />
          {post && (
            <Community
              {...post}
              onOpenModal={() => {}}
              onDelete={() => {}}
              isModal={true}
            />
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
