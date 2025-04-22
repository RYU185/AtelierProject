import React, { useState } from "react";
import styled from "styled-components";

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
  padding-top: 100px;
`;

const Modal = styled.div`
  width: 700px;
  background-color: #fff;
  border-radius: 20px;
  padding: 50px;
  position: relative;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  border: none;
  background: transparent;
  font-size: 28px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const NicknameDisplay = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #018ec8;
  border-left: 5px solid #018ec8;
  padding-left: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 17px;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
  margin-bottom: 25px;
  resize: none;
  &:focus {
    border-color: #018ec8;
    outline: none;
  }
`;

const ImagePreview = styled.div`
  width: 250px;
  height: 250px;
  background: #f0f0f0;
  margin: 30px auto;
  border-radius: 12px;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: cover;
  background-position: center;
  border: 2px dashed #018ec8;
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 0 auto 35px auto;
  font-size: 16px;
  color: #018ec8;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid #018ec8;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: #018ec8;
    color: white;
  }
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
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0074a4;
  }
`;

function AddPostModal({ onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const now = new Date();
    const datetext = now.toISOString().slice(0, 16).replace("T", " ");
    const nickname = "익명"; // 임시 닉네임 처리 (실제 구현에서는 사용자 정보 활용)

    const newPost = {
      id: Date.now(),
      nickname,
      content,
      datetext,
      drawingImage: imagePreview,
    };

    onSubmit(newPost);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <NicknameDisplay>작성자: 익명</NicknameDisplay> {/* 임시 닉네임 표시 */}
        <TextArea
          placeholder="내용 입력"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
        />
        <ImagePreview src={imagePreview} />
        <FileLabel>
          이미지 업로드
          <HiddenFileInput type="file" onChange={handleImageChange} />
        </FileLabel>
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </Modal>
    </Overlay>
  );
}

export default AddPostModal;
