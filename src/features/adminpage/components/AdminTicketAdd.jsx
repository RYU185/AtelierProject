import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import styled from "styled-components";
import Select from "react-select"; // 🔥 react-select import
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 60px;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 1200px;
`;

const Title = styled.h1`
  text-align: start;
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-top: 30px;
`;

const ImageBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormWrapper = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardSection = styled.div`
  background: rgba(255, 255, 255, 0.07);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 6px;
  color: #e1e1e1;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #6ea8fe;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #4a90e2;
  }
`;

const ChartBlock = styled.div`
  margin-bottom: 10px;
`;

const AdminTicketAdd = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    deadline: "",
    capacity: 0, // ✅ 이거 숫자로!
    price: 0,
    poster: "",
    artistIdList: [],
    artIdList: [], // ✅ 꼭 넣어야 함!
  });

  const [previewImage, setPreviewImage] = useState("");
  const [artistOptions, setArtistOptions] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axiosInstance.get("/artist");
        const formatted = res.data.map((artist) => ({
          value: artist.id,
          label: artist.name,
        }));
        setArtistOptions(formatted);
      } catch (error) {
        console.error("작가 목록 로딩 실패:", error);
      }
    };
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 💡 숫자형 필드는 숫자로 변환
    const parsedValue = ["capacity", "price"].includes(name) ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      setForm((prev) => ({
        ...prev,
        poster: base64Image,
      }));

      setPreviewImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const handleSelectChange = (selected) => {
    setSelectedArtists(selected);
    setForm((prev) => ({
      ...prev,
      artistIdList: selected.map((s) => s.value),
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    const dtoBlob = new Blob(
      [
        JSON.stringify({
          title: form.title,
          description: form.description,
          startDate: form.startDate,
          endDate: form.endDate,
          deadline: form.deadline,
          capacity: form.capacity,
          price: form.price,
          artistIdList: form.artistIdList,
          artIdList: form.artIdList,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("dto", dtoBlob);

    const posterInput = document.querySelector('input[type="file"]');
    if (posterInput.files.length > 0) {
      formData.append("poster", posterInput.files[0]);
    } else {
      alert("포스터 이미지를 업로드해주세요.");
      return;
    }

    await axiosInstance.post("/artistgallery/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("전시 티켓이 등록되었습니다!");
    navigate("/AdminPage?tab=ticket");

  } catch (error) {
    console.error("등록 실패:", error);
    alert("등록 중 오류 발생");
  }
};

  return (
    <Container>
      <MainContent>
        <Title>전시 티켓 추가</Title>

        <FlexRow>
          <ImageBox>
            {previewImage ? (
              <PreviewImage src={previewImage} alt="포스터 미리보기" />
            ) : (
              <span style={{ color: "#888" }}>이미지를 업로드 해주세요</span>
            )}
          </ImageBox>

          <FormWrapper onSubmit={handleSubmit}>
            <CardSection>
              <Label>전시명</Label>
              <Input name="title" value={form.title} onChange={handleChange} required />
              <Label>전시 설명</Label>
              <Input name="description" value={form.description} onChange={handleChange} required />
              <Label>시작일</Label>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
              <Label>종료일</Label>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
              <Label>예약 마감일</Label>
              <Input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />
              <Label>정원</Label>
              <Input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
              />
              <Label>티켓 가격</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </CardSection>

            <CardSection>
              <Label>작가 선택</Label>
              <ChartBlock>
                <Select
                  isMulti
                  options={artistOptions}
                  value={selectedArtists}
                  onChange={handleSelectChange}
                  placeholder="작가를 선택하세요"
                />
              </ChartBlock>

              <Label>포스터 이미지 업로드</Label>
              <Input type="file" accept="image/*" onChange={handlePosterChange} />

              <Button type="submit">티켓 추가</Button>
            </CardSection>
          </FormWrapper>
        </FlexRow>
      </MainContent>
    </Container>
  );
};

export default AdminTicketAdd;
