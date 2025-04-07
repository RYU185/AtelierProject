import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 기존 AddPostModal과 거의 동일한 스타일

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 700px;
  background-color: #fff;
  border-radius: 20px;
  padding: 50px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  border: none;
  background: transparent;
  font-size: 28px;
  color: #888;
  cursor: pointer;
`;

const NicknameDisplay = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #018ec8;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 17px;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
  margin-bottom: 20px;
  resize: none;
`;

const ImagePreview = styled.div`
  width: 250px;
  height: 250px;
  margin: 30px auto;
  border-radius: 12px;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: cover;
  background-position: center;
  border: 2px dashed #018ec8;
`;

const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  color: #018ec8;
  cursor: pointer;
  border: 2px solid #018ec8;
  padding: 10px 20px;
  border-radius: 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  font-size: 20px;
  background-color: #018ec8;
  color: white;
  border: none;
  border-radius: 14px;
`;

function EditPostModal({ post, onClose, onEdit }) {
  const [content, setContent] = useState(post.content);
  const [imagePreview, setImagePreview] = useState(post.drawingImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const updatedPost = {
      ...post,
      content,
      drawingImage: imagePreview,
    };
    onEdit(updatedPost);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <NicknameDisplay>{post.nickname}</NicknameDisplay>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
        />
        <ImagePreview src={imagePreview} />
        <FileLabel>
          이미지 수정
          <HiddenFileInput type="file" onChange={handleImageChange} />
        </FileLabel>
        <SubmitButton onClick={handleSubmit}>수정 완료</SubmitButton>
      </Modal>
    </Overlay>
  );
}

export default EditPostModal;
