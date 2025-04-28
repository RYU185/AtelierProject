import React, { useState } from "react";
import styled from "styled-components";

import axios from "axios";

const AdminGoodsAddWrapper = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  color: white;

`;
const AdminContent = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -54px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.input`
  width: 500px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: #2a7fbc;
`;

const TextAreaField = styled.textarea`
  width: 500px;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: #2a7fbc;
  resize: vertical;
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 200px;
  right: 500px;
  display: flex;
  gap: 10px;
`;

const UploadButton = styled.label`
  background-color: #3da9fc;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2a7fbc;
  }
`;

const SubmitButton = styled.button`
  background-color: #3da9fc;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2a7fbc;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin-top: 100px;
  margin-right: 400px;
`;

const ImagePreviewContainer = styled.div`
  width: 400px;
  min-height: 350px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px dashed #aaa;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const PlaceholderText = styled.div`
  color: #888;
  font-size: 16px;
  text-align: center;
`;

function AdminGoodsAdd() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setImageFiles(files);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);

    try {
      const response = await axios.post("/api/goods/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("굿즈 등록 완료!");
        setImagePreviews([]);
        setImageFiles([]);
        setName("");
        setPrice("");
        setStock("");
        setDescription("");
      }
    } catch (err) {
      console.error("굿즈 등록 실패:", err);
      alert("굿즈 등록에 실패했습니다. 관리자에게 문의하세요.");
    }
  };

  return (
    <>
      <AdminGoodsAddWrapper>
        <AdminContent>
          <Title>굿즈 추가</Title>
          <FlexContainer>
            <ImagePreviewContainer>
              {imagePreviews.length > 0 ? (
                imagePreviews.map((src, index) => (
                  <ImagePreview key={index} src={src} alt={`미리보기 ${index + 1}`} />
                ))
              ) : (
                <PlaceholderText>이미지를 업로드 해주세요</PlaceholderText>
              )}
            </ImagePreviewContainer>

            <InputContainer>
              <InputField
                type="text"
                placeholder="상품명"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                type="number"
                placeholder="가격"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputField
                type="number"
                placeholder="재고 수량"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextAreaField
                placeholder="상세 설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputContainer>
          </FlexContainer>
        </AdminContent>

        <ButtonContainer>
          <UploadButton htmlFor="file-input">파일 업로드</UploadButton>
          <SubmitButton disabled={imageFiles.length === 0} onClick={handleSubmit}>
            등록
          </SubmitButton>
        </ButtonContainer>

        <FileInput
          type="file"
          id="file-input"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </AdminGoodsAddWrapper>
    </>
  );
}

export default AdminGoodsAdd;
