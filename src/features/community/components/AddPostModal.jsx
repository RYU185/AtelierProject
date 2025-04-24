import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

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
  padding-top: 50px;
`;

const Modal = styled.div`
  width: 80%;
  max-width: 700px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  overflow: auto;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: transparent;
  font-size: 22px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #000;
  }
  align-self: flex-end;
`;

const NicknameDisplay = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #018ec8;
  border-left: 5px solid #018ec8;
  padding-left: 8px;
  align-self: flex-start;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 15px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 12px;
  margin-bottom: 15px;
  resize: none;
`;

const ImagePreviewWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-top: 20px;
  padding-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  width: 100%;
  justify-content: center; /* ✅ 가운데 정렬로 변경 */
`;

const ImagePreviewContainer = styled.div`
  position: relative;
`;

const ImagePreview = styled.div`
  width: 140px;
  height: 140px;
  background: #f0f0f0;
  border-radius: 8px;
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: cover;
  background-position: center;
  border: 2px dashed #018ec8;
  flex-shrink: 0;
`;

const CancelButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto 10px auto;
  font-size: 13px;
  color: #018ec8;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid #018ec8;
  border-radius: 10px;
  padding: 6px 12px;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: #018ec8;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(1, 142, 200, 0.3);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: #018ec8;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bbf;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 191, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const WarningText = styled.p`
  color: red;
  font-size: 11px;
  margin-top: 3px;
  text-align: center;
`;

function AddPostModal({ onClose, onSubmit, userNickname }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      setUploadError("이미지는 최대 4장까지 업로드할 수 있습니다.");
      return;
    }
    setUploadError("");
    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCancelImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (images.length > 4) {
      setUploadError("이미지는 최대 4장까지 업로드할 수 있습니다.");
      return;
    }

    try {
      // 👉 이미지 업로드 URL 리스트 받기 (가정: base64 → 서버 변환 API 존재)
      const uploadedUrls = await Promise.all(
        images.map(async (img) => {
          const formData = new FormData();
          formData.append("file", img);
          const res = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return res.data.url;
        })
      );

      const postData = {
        text: content,
        img: uploadedUrls,
      };

      await axios.post("/api/community/add", postData);
      onSubmit(postData);
      onClose();
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      setUploadError("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <NicknameDisplay>작성자 : {userNickname}</NicknameDisplay>
        <TextArea
          placeholder="내용 입력"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        />
        <ImagePreviewWrapper>
          {imagePreviews.map((preview, index) => (
            <ImagePreviewContainer key={index}>
              <ImagePreview src={preview} />
              <CancelButton onClick={() => handleCancelImage(index)}>
                <AiOutlineClose />
              </CancelButton>
            </ImagePreviewContainer>
          ))}
        </ImagePreviewWrapper>
        <FileLabel>
          이미지 업로드
          <HiddenFileInput type="file" multiple onChange={handleImageChange} />
        </FileLabel>
        {uploadError && <WarningText>{uploadError}</WarningText>}
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </Modal>
    </Overlay>
  );
}

export default AddPostModal;
