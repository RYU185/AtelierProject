import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 1300px;
  margin-bottom: 50px;
`;
const Title = styled.h2`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 40px;
`;

const ProfilePreviewBox = styled.div`
  width: 300px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: -10px 200px 0 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 17px;
  color: #e1e1e1;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 120px;
  resize: none;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 160px;
  padding: 12px;
  border: 1px solid #3da9fc;
  border-radius: 6px;
  background-color: #3da9fc;
  color: white;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;
  transition: 0.3s ease;

  &:hover {
    border: 1px solid #3da9fc;
    background-color: #ffffff;
    color: #111111;
  }
`;

const SmallWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  width: 170px;
  padding: 4px;
  border: none;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.07);
  color: white;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;
  transition: 0.3s ease;

  &:hover {
    background-color: #2a8bd7;
  }
`;

const BiographyRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const DateInput = styled.input`
  flex: 0 0 160px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TitleInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const BioLabel = styled.div`
  align-self: flex-end;
  font-size: 17px;
  color: #e1e1e1;
`;

const DeleteButton = styled.button`
  padding: 10px 10px;
  font-size: 14px;
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  height: 42px;
  width: 42px;

  &:hover {
    background-color: #e04848;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  background-color: #fff;
  color: #111;
`;

const AdminArtistAdd = () => {
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [biographies, setBiographies] = useState([{ date: "", title: "" }]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const handleBioChange = (index, field, value) => {
    const updated = [...biographies];
    updated[index][field] = value;
    setBiographies(updated);
  };

  const addBiography = () => {
    setBiographies([...biographies, { date: "", title: "" }]);
  };

  const removeBiography = (index) => {
    const updated = biographies.filter((_, i) => i !== index);
    setBiographies(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || (!profileImg && !editMode) || !description) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    if (editMode) {
      formData.append("id", id);
      formData.append("userId", userId);
    } else {
      if (!userId) {
        alert("유저를 선택해주세요.");
        return;
      }
      formData.append("userId", userId);
    }

    formData.append("name", name);

    if (profileImg) {
      formData.append("profile_img", profileImg);
    }

    formData.append("description", description);

    formData.append(
      "biographyList",
      JSON.stringify(
        biographies.map((b) => ({
          year: b.date,
          award: b.title,
        }))
      )
    );

    try {
      await axiosInstance.post("/artist", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("작가가 성공적으로 등록되었습니다.");
      navigate("/adminpage?tab=artist");
    } catch (err) {
      console.error("작가 등록 실패: ", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const state = location.state;
    if (state && state.artist) {
      const artist = state.artist;
      setEditMode(true);
      setId(artist.id);
      setUserId(artist.userId);
      setName(artist.name);
      setDescription(artist.description);
      setBiographies(
        artist.biographyList.map((b) => ({
          date: b.year,
          title: b.award,
        }))
      );
    } else {
      axiosInstance.get("/user/no-artist").then((res) => {
        setUsers(res.data);
      });
    }
  }, []);

  return (
    <Wrapper>
      <Title>작가 등록</Title>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <ProfilePreviewBox>
            {profileImg ? (
              <PreviewImage src={URL.createObjectURL(profileImg)} alt="미리보기" />
            ) : editMode ? (
              <PreviewImage
                src={`http://localhost:8081/uploads/${location.state.artist.profile_img}`}
                alt="기존 이미지"
              />
            ) : null}
          </ProfilePreviewBox>

          <FormColumn>
            {!editMode && (
              <>
                <Label>유저 선택</Label>
                <Select value={userId} onChange={(e) => setUserId(e.target.value)}>
                  <option value="">-- 유저를 선택하세요 --</option>
                  {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.name} ({user.userId})
                    </option>
                  ))}
                </Select>
              </>
            )}
            <Label>이름 </Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <Label>프로필 이미지</Label>
            <Input type="file" onChange={(e) => setProfileImg(e.target.files[0])} />

            <Label>소개</Label>
            <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />

            <SmallWrapper>
              <BioLabel>수상 경력 / 이력</BioLabel>
              <AddButton type="button" onClick={addBiography}>
                + 수상 경력 / 이력 추가
              </AddButton>
            </SmallWrapper>

            {biographies.map((bio, index) => (
              <BiographyRow key={index}>
                <DateInput
                  type="date"
                  value={bio.date}
                  onChange={(e) => handleBioChange(index, "date", e.target.value)}
                />
                <TitleInput
                  placeholder="내용 또는 수상 기록을 입력해주세요"
                  value={bio.title}
                  onChange={(e) => handleBioChange(index, "title", e.target.value)}
                />
                <DeleteButton type="button" onClick={() => removeBiography(index)}>
                  ㅡ
                </DeleteButton>
              </BiographyRow>
            ))}

            <SubmitButton type="submit">{editMode ? "수정하기" : "등록하기"}</SubmitButton>
          </FormColumn>
        </FormRow>
      </Form>
    </Wrapper>
  );
};

export default AdminArtistAdd;
