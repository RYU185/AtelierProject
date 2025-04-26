import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px 25px;
  border-radius: 16px;
  width: 90%;
  max-width: 550px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  font-size: 26px;
  border: none;
  background: none;
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #333;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 25px;
  outline: none;

  &:focus {
    border-color: #4fc3f7;
    box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #81d4fa 0%, #4fc3f7 100%);
  color: white;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #4fc3f7 0%, #81d4fa 100%);
    transform: translateY(-2px);
  }
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background-color: #eceff1;
  color: #455a64;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #cfd8dc;
    transform: translateY(-2px);
  }
`;

function EditPostModal({ post, onClose, onSubmit }) {
  const [editText, setEditText] = useState(post?.text || "");

  useEffect(() => {
    if (post) {
      setEditText(post.text);
    }
  }, [post]);

  const handleSubmit = () => {
    onSubmit({ id: post.id, text: editText });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>게시글 수정</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <div>
          <InputLabel htmlFor="editText">내용</InputLabel>
          <TextInput
            id="editText"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </div>
        <ButtonBox>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>수정 완료</SubmitButton>
        </ButtonBox>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EditPostModal;
