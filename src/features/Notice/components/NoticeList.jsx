import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const TabBars = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 300px;
  margin-top: 15px;
  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #0068ca;
  padding-left: 40px;
  outline: none;
`;

// 라이브러리 사용 - react-icons
//import { FaSearch } from "react-icons/fa" => Fa:
const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #0068ca;
  font-size: 16px;
`;

const SortBar = styled.select`
  width: 150px;
  height: 40px;
  margin-top: 15px;
  text-align: center;
  font-size: 15px;
  color: #0068ca;
  border: 1px solid #0068ca;
  border-radius: 2px;
  outline: none;
  /* & > option {
    border-radius: 5px;
  } */
`;
const StyledImg = styled.img`
  width: 30px; /* 이미지 크기 조절 */
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s ease-out-in;

  &:hover {
    transform: scale(0.9); /* 호버 시 크기 확대 */
    /* font-size: 1.1rem; */
    cursor: pointer;
    color: #000;
  }
`;

const NoticeListGrid = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NoticeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const NoticeInfo = styled.div`
  padding: 15px 0;
`;

const NoticeDate = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const NoticeName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export default function NoticeList() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "공지사항 1",
      date: "2024-03-20",
      content: "첫 번째 공지사항입니다.",
      image: "/src/assets/notice1.jpg",
    },
    {
      id: 2,
      title: "공지사항 2",
      date: "2024-03-19",
      content: "두 번째 공지사항입니다.",
      image: "/src/assets/notice2.jpg",
    },
  ]);

  const handleProductClick = (id) => {
    navigate(`/faq/notice/${id}`);
  };

  return (
    <div>
      <TitleContainer>
        <BackTitle>Notice</BackTitle>
        <Title>Notice</Title>
      </TitleContainer>
      <TabBar />
      <TabBars>
        <SearchContainer>
          <SearchIcon />
          <SearchBar placeholder="검색어를 입력하세요" />
        </SearchContainer>
        <SortBar>
          <option value="">정렬</option>
          <option value="price_asc">가격 낮은순</option>
          <option value="price_desc">가격 높은순</option>
        </SortBar>
      </TabBars>
      <NoticeListGrid>
        {notices.map((notice) => (
          <Container key={notice.id} onClick={() => handleProductClick(notice.id)}>
            <NoticeImage src={notice.image} alt={notice.title} />
            <NoticeInfo>
              <NoticeDate>{notice.date}</NoticeDate>
              <NoticeName>{notice.title}</NoticeName>
            </NoticeInfo>
          </Container>
        ))}
      </NoticeListGrid>
    </div>
  );
}
