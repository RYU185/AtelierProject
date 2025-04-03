import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;

  &:before {
    content: "NOTICE";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 8rem;
    color: rgba(200, 200, 255, 0.2);
    z-index: -1;
  }
`;

const NoticeContainer = styled.div`
  padding: 1rem 0;
`;

const NoticeHeader = styled.div`
  border-bottom: 2px solid #333;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

const NoticeTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 500;
`;

const NoticeInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const NoticeContent = styled.div`
  line-height: 1.8;
  color: #333;
  min-height: 200px;
  white-space: pre-line;
  padding: 2rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
`;

const RightButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
    color: white;
    border-color: #333;
  }
`;

const EditButton = styled(Button)`
  padding: 0.75rem 2rem;
  background-color: white;
  &:hover {
    background-color: #0095ff;
    border-color: #0095ff;
  }
`;

const DeleteButton = styled(Button)`
  padding: 0.75rem 2rem;
  background-color: white;
  &:hover {
    background-color: #dc3545;
    border-color: #dc3545;
  }
`;

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 실제로는 API에서 데이터를 가져와야 합니다
  const noticeData = {
    id: id,
    title: "긴급 휴관 안내",
    date: "2025.03.15",
    content:
      "안녕하세요.\n\n저희 미술관은 시설 보수 공사로 인해 다음과 같이 휴관할 예정입니다.\n\n휴관기간: 2025년 3월 20일 ~ 2025년 3월 25일\n\n이용에 불편을 드려 죄송합니다.\n더 나은 서비스로 찾아뵙겠습니다.\n\n감사합니다.",
  };

  const handleBackClick = () => {
    navigate("/support/notice");
  };

  const handleEditClick = () => {
    navigate(`/support/notice/edit/${id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // TODO: API 연동
      console.log("Delete notice:", id);
      navigate("/support/notice");
    }
  };

  return (
    <Container>
      <NoticeContainer>
        <NoticeHeader>
          <NoticeTitle>{noticeData.title}</NoticeTitle>
          <NoticeInfo>등록일: {noticeData.date}</NoticeInfo>
        </NoticeHeader>
        <NoticeContent>{noticeData.content}</NoticeContent>
        <ButtonGroup>
          <Button onClick={handleBackClick}>목록</Button>
          <RightButtonGroup>
            <EditButton onClick={handleEditClick}>수정</EditButton>
            <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
          </RightButtonGroup>
        </ButtonGroup>
      </NoticeContainer>
    </Container>
  );
};

export default NoticeDetail;
