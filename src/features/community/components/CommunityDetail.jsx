import React from "react";
import Community from "./Community";
import CommentList from "./CommentList";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 더 투명하게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff; /* 흰색 배경 */
  padding: 15px; /* 패딩 줄임 */
  border-radius: 8px; /* 둥근 모서리 유지 */
  width: 70%; /* 너비 약간 줄임 */
  max-width: 768px; /* 최대 너비 줄임 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 그림자 은은하게 */
  position: relative;
  overflow-y: auto;
  max-height: 85vh; /* 최대 높이 약간 줄임 */
`;

const CloseButton = styled(AiOutlineClose)`
  position: absolute;
  top: 10px; /* 위치 조정 */
  right: 10px; /* 위치 조정 */
  font-size: 25px; /* 크기 줄임 */
  cursor: pointer;
  color: #777; /* 색상 변경 */
  transition: color 0.2s ease-in-out;
  z-index: 1001; /* ModalContainer 보다 높은 값 */

  &:hover {
    color: #e74c3c; /* 호버 시 진하게 */
  }
`;

const CommunityWrapper = styled.div`
  margin-bottom: 15px; /* 간격 줄임 */
  border-bottom: 1px solid #eee; /* 얇은 구분선 */
  padding-bottom: 15px;
`;

function CommunityDetail({ post, onClose, onDelete, onOpenModal }) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <CommunityWrapper>
          <Community {...post} onDelete={onDelete} onOpenModal={onOpenModal} />
        </CommunityWrapper>
        <CommentList />
      </ModalContainer>
    </ModalBackground>
  );
}

export default CommunityDetail;
