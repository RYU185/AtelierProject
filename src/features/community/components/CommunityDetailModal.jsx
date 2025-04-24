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
  max-width: 1300px;
  max-height: 90%;
  position: relative;
  display: flex;
  overflow: hidden; /* 이미지 넘기기 버튼이 컨텐츠 밖으로 나가지 않도록 */
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px;
  position: relative;
  overflow-y: auto;
`;

const CommentsWrapper = styled.div`
  width: 550px; /* 댓글 영역 너비 */
  padding: 30px;
  border-left: 1px solid #e2e8f0;
  overflow-y: auto; /* 댓글이 많아질 경우 스크롤 */
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 10px; /* 살짝 아래로 조정 */
  right: 10px; /* 살짝 안쪽으로 조정 */
  font-size: 36px;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease-in-out;
  z-index: 10; /* 다른 요소 위에 표시 */

  &:hover {
    color: #e53e3e; /* 호버 시 붉은색 계열 */
  }
`;

function CommunityDetailModal({ post, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <ContentWrapper>
          {post && (
            <div style={{ position: "relative" }}>
              {" "}
              {/* 이미지 넘기기 버튼 absolute positioning 기준 */}
              <Community
                {...post}
                onOpenModal={() => {}}
                onDelete={() => {}}
                isModal={true}
              />
            </div>
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
