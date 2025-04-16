import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  display: flex;
`;

const AdminContent = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
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
  height: 150px; /* 기본 높이를 크게 설정 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-color: #2a7fbc;
  resize: vertical; /* 세로 크기만 조정 가능 */
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 300px;
  right: 490px;
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
  text-align: center;

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
  text-align: center;

  &:hover {
    background-color: #2a7fbc;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin-top: 100px; /* 위로 올리기 */
  margin-right: 400px;
`;

const ImagePreviewContainer = styled.div`
  width: 400px;
  height: 350px; /* 높이 줄여서 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #aaa;
  border-radius: 8px;
  background-color: #fff;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const PlaceholderText = styled.div`
  color: #888;
  font-size: 16px;
  text-align: center;
`;

function AdminArtAdd() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);  // 추가된 상태
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);  // 이미지 파일 상태도 업데이트
    }
  };

    const handleSubmit = () => {
      const token = localStorage.getItem("authToken");  // 토큰을 로컬스토리지에서 가져옵니다.
if (!token) {
  console.error("토큰이 로컬스토리지에 없습니다");
  // 로그인 페이지로 리디렉션
  window.location.href = "/login";  // 로그인 페이지 URL로 변경
  return;
}
    const formData = new FormData();
    formData.append("file", imageFile);  // 이미지 파일 추가
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("description", description);
    formData.append("year", year);

     // JWT 토큰 가져오기

     fetch("/api/art/add", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => console.log("작품 등록 완료", data))
    .catch(error => console.error("Error:", error));
  };

  return (
    <>
      <Header />
      <Container>
        <AdminMenu />

        <AdminContent>
          <Title>작품 추가</Title>

          <FlexContainer>
            <ImagePreviewContainer>
              {image ? (
                <ImagePreview src={image} alt="Uploaded Image" />
              ) : (
                <PlaceholderText>이미지를 업로드 해주세요</PlaceholderText>
              )}
            </ImagePreviewContainer>

            <InputContainer>
              <InputField
                type="text"
                placeholder="작품 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="작가명"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
              <TextAreaField
                placeholder="상세 설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputField
                type="number"
                placeholder="제작 연도"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </InputContainer>
          </FlexContainer>
        </AdminContent>
      </Container>

      <ButtonContainer>
        <UploadButton htmlFor="file-input">파일 업로드</UploadButton>
        <SubmitButton
          disabled={!image}
          onClick={handleSubmit}
        >
          등록
        </SubmitButton>
      </ButtonContainer>

      <FileInput
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <Footer />
    </>
  );
}

export default AdminArtAdd;
