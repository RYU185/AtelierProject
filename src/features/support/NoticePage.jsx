import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "#000" : "#666")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.active ? "#000" : "transparent")};
  }

  &:hover {
    color: #000;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterContainer = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const FilterOption = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const SearchTypeSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 300px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.25rem 0;

  &::placeholder {
    color: #999;
  }
`;

const NoticeList = styled.div`
  background: white;
  border-radius: 4px;
  overflow: hidden;
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

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

const Arrow = styled.div`
  margin-left: 1rem;
  color: #999;
  font-size: 1rem;
  transform: scaleX(0.7);
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  position: relative;
`;

const PageButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const PageButton = styled.button`
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "#007bff" : "#666")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-size: 0.9rem;

  &:hover {
    color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 2rem;
  background-color: #0095ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoticePage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("title"); // "title" or "date"
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  const notices = [
    { id: 1, date: "2025.03.15", title: "긴급 휴관 안내" },
    { id: 2, date: "2025.03.14", title: "전시회 연장 안내" },
    { id: 3, date: "2025.03.13", title: "주차장 공사 안내" },
    { id: 4, date: "2025.03.12", title: "회원 이벤트 안내" },
    { id: 5, date: "2025.03.11", title: "신규 전시 안내" },
    { id: 6, date: "2025.03.10", title: "휴관일 변경 안내" },
    { id: 7, date: "2025.03.09", title: "미술관 투어 안내" },
    { id: 8, date: "2025.03.08", title: "전시 해설 프로그램" },
  ];

  const filteredNotices = notices.filter((notice) => {
    if (!searchTerm) return true;

    if (searchType === "date") {
      return notice.date.includes(searchTerm);
    } else {
      return notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.date.replace(/\./g, "-"));
    const dateB = new Date(b.date.replace(/\./g, "-"));
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm("");
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowFilter(false);
  };

  const handleCreateClick = () => {
    navigate("create");
  };

  const handleCancel = () => {
    navigate("..");
  };

  const handleNoticeClick = (noticeId) => {
    navigate(`${noticeId}`); // 상대 경로로 이동
  };

  return (
    <>
      <Title>NOTICE</Title>
      <TabContainer></TabContainer>
      <SearchContainer>
        <SearchGroup>
          <SearchTypeSelect
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="title">제목별</option>
            <option value="date">날짜별</option>
          </SearchTypeSelect>
          <SearchBox>
            <SearchInput
              type={searchType === "date" ? "text" : "text"}
              placeholder={
                searchType === "date" ? "YYYY.MM.DD" : "검색어를 입력하세요"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        </SearchGroup>
        <FilterContainer>
          <FilterButton onClick={handleFilterClick}>
            전체 유형 {showFilter ? "▲" : "▼"}
          </FilterButton>
          <FilterDropdown show={showFilter}>
            <FilterOption onClick={() => handleSortChange("newest")}>
              최근 날짜순
            </FilterOption>
            <FilterOption onClick={() => handleSortChange("oldest")}>
              늦은 날짜순
            </FilterOption>
          </FilterDropdown>
        </FilterContainer>
      </SearchContainer>
      <NoticeList>
        {sortedNotices.map((notice) => (
          <NoticeItem
            key={notice.id}
            onClick={() => handleNoticeClick(notice.id)}
          >
            <NoticeDate>{notice.date}</NoticeDate>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <Arrow>›</Arrow>
          </NoticeItem>
        ))}
      </NoticeList>
      <Pagination>
        <PageButtonGroup>
          <PageButton>‹</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>›</PageButton>
        </PageButtonGroup>
        <SubmitButton onClick={handleCreateClick}>등록</SubmitButton>
      </Pagination>
    </>
  );
};

export default NoticePage;
