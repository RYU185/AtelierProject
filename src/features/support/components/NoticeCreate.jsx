import React, { useState } from "react";
import axios from "../../../api/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #e1e1e1;
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
  resize: none;

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
  resize: none;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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

const SubmitButton = styled(Button)`
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

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
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
    background-color: ${(props) => (props.$confirm ? "#0095ff" : "#333")};
    color: white;
    border-color: ${(props) => (props.$confirm ? "#0095ff" : "#333")};
  }
`;

const NoticeCreate = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await axios.post("/notices", formData);
      alert("공지사항이 등록되었습니다.");
      navigate("../notice");
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("공지사항 등록에 실패했습니다.");
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    navigate("../notice");
  };

  return (
    <Container>
      <Title>공지사항 등록</Title>
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
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>
          <SubmitButton type="submit">등록</SubmitButton>
        </ButtonGroup>
      </Form>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>공지사항을 등록하시겠습니까?</ModalTitle>
            <ModalButtonGroup>
              <ModalButton onClick={() => setShowModal(false)}>
                취소
              </ModalButton>
              <ModalButton $confirm onClick={handleConfirm}>
                확인
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default NoticeCreate;
