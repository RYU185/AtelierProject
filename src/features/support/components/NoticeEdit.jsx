import React, { useState, useEffect } from "react";
import axios from "../../../api/axiosInstance";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #007aff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #e1e1e1;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SaveButton = styled(Button)`
  background: #007aff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #5a6268;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const RightButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const ModalText = styled.p`
  margin-bottom: 2rem;
  color: #666;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$confirm ? "#dc3545" : "#333")};
    color: white;
    border-color: ${(props) => (props.$confirm ? "#dc3545" : "#333")};
  }
`;

const NoticeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("ADMIN");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/notices/${id}`);
        setFormData({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error("공지사항 불러오기 실패", err);
        alert("공지사항 정보를 불러오지 못했습니다.");
        navigate("/support/notice");
      }
    };

    if (!isAdmin) {
      alert("접근 권한이 없습니다.");
      navigate("/support/notice"); // 일반 유저 접근시 자동 리디렉트
      return;
    }

    fetchNotice(); // ✅ 관리자만 데이터 불러오기 실행
  }, [id, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/notices/${id}`, formData); // ✅ PUT + id로 수정 요청
      alert("공지사항이 수정되었습니다.");
      navigate("/support/notice");
    } catch (err) {
      console.error("공지사항 수정 실패", err);
      alert("공지사항 수정에 실패했습니다.");
    }
  };
  const handleCancel = () => {
    navigate("/support/notice");
  };

  return (
    <Container>
      <Title>공지사항 수정</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>제목</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>내용</Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
          />
        </InputGroup>

        <ButtonGroup>
          <RightButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SaveButton type="submit">저장</SaveButton>
          </RightButtonGroup>
        </ButtonGroup>
      </Form>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
            <ModalText>복구가 불가능합니다.</ModalText>
            <ModalButtonGroup>
              <ModalButton onClick={() => setShowModal(false)}>
                취소
              </ModalButton>
              <ModalButton confirm onClick={handleDeleteConfirm}>
                삭제
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default NoticeEdit;
