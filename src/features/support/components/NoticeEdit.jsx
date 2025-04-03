import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  color: #333;
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

const NoticeEdit = ({ noticeId }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    // TODO: API 연동하여 기존 공지사항 데이터 불러오기
    // 임시 데이터
    setFormData({
      title: "긴급 휴관 안내",
      content: "휴관 관련 상세 내용...",
    });
  }, [noticeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 연동
    console.log("Submit:", formData);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // TODO: API 연동
      console.log("Delete:", noticeId);
    }
  };

  const handleCancel = () => {
    // TODO: 뒤로가기 구현
    console.log("Cancel");
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
          <DeleteButton type="button" onClick={handleDelete}>
            삭제
          </DeleteButton>
          <RightButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SaveButton type="submit">저장</SaveButton>
          </RightButtonGroup>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default NoticeEdit;
