import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Date = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #444;
`;

const BackButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #0068ca;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 데이터 (나중에 API로 대체)
  const notice = {
    id: parseInt(id),
    title: "공지사항 " + id,
    date: "2024-03-20",
    content: "이것은 공지사항 " + id + "의 상세 내용입니다.",
  };

  return (
    <Container>
      <Title>{notice.title}</Title>
      <Date>{notice.date}</Date>
      <Content>{notice.content}</Content>
      <BackButton onClick={() => navigate("/faq/notice")}>목록으로 돌아가기</BackButton>
    </Container>
  );
}
