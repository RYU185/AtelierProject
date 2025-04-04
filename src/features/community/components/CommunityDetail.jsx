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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #f8f8ff;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled(AiOutlineClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

function CommunityDetail({ post, onClose }) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <Community {...post} />
        <CommentList /> {/* 댓글 리스트를 Community 아래에 배치 */}
      </ModalContainer>
    </ModalBackground>
  );
}

export default CommunityDetail;
