import React, { useState } from "react";
import Community from "./Community";
import CommentList from "./CommentList";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import FullImageModal from "./FullImageModal";

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

const SearchButton = styled(BsSearch)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #018ec8;
  transition: 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

function CommunityDetail({ post, onClose }) {
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);

  return (
    <>
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose} />
          <Community {...post} />
          <SearchButton onClick={() => setIsFullImageOpen(true)} />{" "}
          <CommentList />
        </ModalContainer>
      </ModalBackground>

      {isFullImageOpen && (
        <FullImageModal
          image={post.drawingImage}
          onClose={() => setIsFullImageOpen(false)}
        />
      )}
    </>
  );
}

export default CommunityDetail;
