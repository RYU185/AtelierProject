import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AdminContentLayout } from "./AdminContentLayout";
import TitleWrapper from "./Titlewrapper";

const AdminArtAddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const AdminContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  margin-right: 330px;
  font-size: 25px;
  color: #ffffff;
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
flex-direction: row-reverse;
  position: relative;
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
`;

const ImagePreviewContainer = styled.div`
  width: 400px;
  height: 350px;
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
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistList, setArtistList] = useState([]);

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  useEffect(() => {
    axios
      .get("/api/artist")
      .then((res) => setArtistList(res.data))
      .catch((err) => console.error("작가 목록 불러오기 실패", err));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("completionDate", `${year}-01-01`);
    formData.append("uploadDate", uploadDate || new Date().toISOString().split("T")[0]);
    formData.append("artistId", artistId);

    try {
      const response = await axios.post("/api/art/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("작품 등록 완료!");

        // 작품 등록 후 미리보기와 입력값 초기화
        setImagePreview(null);
        setImageFile(null);
        setTitle("");
        setDescription("");
        setYear("");
        setUploadDate("");
        setArtistId("");
      }
    } catch (err) {
      console.error("업로드 실패:", err);
      alert("작품 등록 실패. 관리자에게 문의해주세요.");
    }
  };

  return (
    <>
      <AdminArtAddWrapper>
        <AdminContentLayout>
          <TitleWrapper>작품 목록 관리</TitleWrapper>
          <AdminContent>
            <FlexContainer>
              <ImagePreviewContainer>
                {imagePreview ? (
                  <ImagePreview src={imagePreview} alt="미리보기" />
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

                <select
                  value={artistId}
                  onChange={(e) => setArtistId(e.target.value)}
                  style={{
                    width: "500px",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #2a7fbc",
                  }}
                >
                  <option value="">작가 선택</option>
                  {artistList.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>

                <TextAreaField
                  placeholder="작품 설명"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <InputField
                  type="number"
                  placeholder="제작 연도 (예: 2023)"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />

                <InputField
                  type="date"
                  placeholder="업로드 날짜"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                />
              </InputContainer>
            </FlexContainer>
          </AdminContent>
        </AdminContentLayout>

        <ButtonContainer>
          <UploadButton htmlFor="file-input">파일 업로드</UploadButton>
          <SubmitButton disabled={!imageFile} onClick={handleSubmit}>
            등록
          </SubmitButton>
        </ButtonContainer>

        <FileInput type="file" id="file-input" accept="image/*" onChange={handleImageUpload} />
      </AdminArtAddWrapper>
    </>
  );
}

export default AdminArtAdd;
