import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  position: relative;

  &::after {
    content: "NOTICE";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 80px;
    color: rgba(0, 0, 0, 0.05);
    z-index: -1;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const MenuItem = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#007AFF" : "#666")};
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #007AFF;
    }
  `}

  &:hover {
    color: #007aff;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.active ? "#007AFF" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border: 1px solid ${(props) => (props.active ? "#007AFF" : "#ddd")};
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#f8f9fa")};
  }
`;

const NoticeList = styled.div`
  width: 100%;
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const NoticeDate = styled.div`
  width: 120px;
  color: #666;
`;

const NoticeTitle = styled.div`
  flex: 1;
  color: #333;
`;

const NoticeArrow = styled.div`
  margin-left: 20px;
  color: #999;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${(props) => (props.active ? "#007AFF" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#666")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${(props) => (props.active ? "#0056b3" : "#f0f0f0")};
  }
`;

const SideContent = styled.div`
  width: 300px;
`;

const SearchBox = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
`;

const SearchTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const NoticePage = () => {
  const [activeMenu, setActiveMenu] = useState("공지사항");
  const [activeSort, setActiveSort] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const menus = [
    { name: "공지사항", path: "/support/notice" },
    { name: "시설 안내", path: "/support/guide" },
    { name: "오시는 길", path: "/support/location" },
    { name: "문의하기", path: "/support/contact" },
  ];

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);
    navigate(menu.path);
  };

  const sortOptions = ["최신순", "조회순", "추천순"];

  const dummyNotices = [
    { id: 1, date: "2025.03.15", title: "긴급 휴관 안내" },
    { id: 2, date: "2025.03.15", title: "긴급 휴관 안내" },
    { id: 3, date: "2025.03.15", title: "긴급 휴관 안내" },
    { id: 4, date: "2025.03.15", title: "긴급 휴관 안내" },
    { id: 5, date: "2025.03.15", title: "긴급 휴관 안내" },
  ];

  return (
    <>
      <Header />
      <Container>
        <Title>공지사항</Title>

        <MenuContainer>
          {menus.map((menu) => (
            <MenuItem
              key={menu.name}
              active={activeMenu === menu.name}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuContainer>

        <ContentContainer>
          <MainContent>
            <SortContainer>
              {sortOptions.map((option) => (
                <SortButton
                  key={option}
                  active={activeSort === option}
                  onClick={() => setActiveSort(option)}
                >
                  {option}
                </SortButton>
              ))}
            </SortContainer>

            <NoticeList>
              {dummyNotices.map((notice) => (
                <NoticeItem key={notice.id}>
                  <NoticeDate>{notice.date}</NoticeDate>
                  <NoticeTitle>{notice.title}</NoticeTitle>
                  <NoticeArrow>›</NoticeArrow>
                </NoticeItem>
              ))}
            </NoticeList>

            <Pagination>
              <PageButton>‹</PageButton>
              {[1, 2, 3, 4, 5].map((page) => (
                <PageButton
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              <PageButton>›</PageButton>
            </Pagination>
          </MainContent>

          <SideContent>
            <SearchBox>
              <SearchTitle>검색</SearchTitle>
              <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton>검색</SearchButton>
            </SearchBox>
          </SideContent>
        </ContentContainer>
      </Container>
    </>
  );
};

export default NoticePage;
