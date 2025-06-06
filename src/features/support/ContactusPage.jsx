import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 17px;
  color: #e1e1e1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #004a99;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

// 컴포넌트 정의
const ContactusPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 입력값 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken"); // ✅ 수정!
    let userId = null;
    let isMember = false;

    if (token) {
      try {
        const decoded = jwtDecode(token); // JWT 디코딩
        userId = decoded.userId || decoded.id; // 키 이름이 'userId' 또는 'id'일 수 있음
        isMember = decoded.isMember !== undefined ? decoded.isMember : false; // 'isMember'의 값 확인
      } catch (err) {
        console.error("JWT 파싱 오류:", err);
      }
    }

    const contactPayload = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
      userId: userId,
      isMember: isMember,
    };

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(contactPayload),
      });

      if (!res.ok) throw new Error("문의 등록 실패");

      navigate("/support");
    } catch (err) {
      console.error("❌ 오류 발생:", err);
    }
  };

  return (
    <Container>
      <Title>문의하기</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="subject"
          placeholder="제목"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="문의 내용"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">문의 제출</SubmitButton>
      </Form>
    </Container>
  );
};

export default ContactusPage;
