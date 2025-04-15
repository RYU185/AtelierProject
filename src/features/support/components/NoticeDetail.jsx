import React from "react";
import axios from "../../../api/axiosInstance";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext";

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
  const [noticeData, setNoticeData] = useState(null);
  const { user } = useAuth();
  console.log("현재 유저 정보:", user); // 🔍 디버그 로그
  const isAdmin = user?.roles?.includes("ADMIN");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/notices/${id}`); // ✅ 중복 /api 제거
        setNoticeData(res.data);
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
        alert("공지사항 정보를 가져오는 데 실패했습니다.");
        navigate("/support/notice");
      }
    };

    fetchNotice();
  }, [id, navigate]);

  if (!noticeData) return <div>로딩 중...</div>;

  const handleBackClick = () => navigate("/support/notice");
  const handleEditClick = () => navigate(`/support/notice/edit/${id}`);
  const handleDeleteClick = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/notices/${id}`); // ✅ 중복 api 제거
        alert("삭제되었습니다.");
        navigate("/support/notice");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Title>NOTICE</Title>
      <NoticeContainer>
        <NoticeHeader>
          <NoticeTitle>{noticeData.title}</NoticeTitle>
          <NoticeInfo>등록일: {noticeData.createdDate || "N/A"}</NoticeInfo>
        </NoticeHeader>
        <NoticeContent>{noticeData.content}</NoticeContent>

        <ButtonGroup>
          <Button onClick={handleBackClick}>목록</Button>

          {isAdmin && ( // 🔥 여기 조건 추가!!!
            <RightButtonGroup>
              <EditButton onClick={handleEditClick}>수정</EditButton>
              <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
            </RightButtonGroup>
          )}
        </ButtonGroup>
      </NoticeContainer>
    </Container>
  );
};

export default NoticeDetail;
