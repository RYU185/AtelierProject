import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`padding: 20px; max-width: 600px; margin: auto; background: white; border-radius: 8px;`;
const Title = styled.h1`text-align: center;`;
const Form = styled.form`display: flex; flex-direction: column; gap: 16px;`;
const Input = styled.input`padding: 10px; border-radius: 4px; border: 1px solid #ccc;`;
const TextArea = styled.textarea`padding: 10px; border-radius: 4px; border: 1px solid #ccc; min-height: 100px;`;
const SubmitButton = styled.button`padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold;`;

const ContactusPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactPayload = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
    };

    try {
      const res = await fetch("http://localhost:8081/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactPayload),
      });

      if (!res.ok) throw new Error("문의 등록 실패");

      console.log("✅ 문의 전송 성공");
      navigate("/support");
    } catch (err) {
      console.error("❌ 오류 발생:", err);
    }
  };

  return (
    <Container>
      <Title>문의하기</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="이름" onChange={handleChange} required />
        <Input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
        <Input name="subject" placeholder="제목" onChange={handleChange} required />
        <TextArea name="message" placeholder="문의 내용" onChange={handleChange} required />
        <SubmitButton type="submit">문의 제출</SubmitButton>
      </Form>
    </Container>
  );
};

export default ContactusPage;
