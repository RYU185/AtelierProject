import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// === 스타일 === (생략 없이 전체 유지)
const Title = styled.h2`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #e0e0e0;
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
  border-bottom: 1px solid #ffffff;
`;

const Tab = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "#000000" : "#666")};
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
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #0f0f0f2d;
  color: #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  background-color: #141414;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${(props) => (props.$show ? "block" : "none")};
  color: #e0e0e0;
`;

const FilterOption = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
    color: #141414;
  }
`;

const SearchTypeSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #ffffff;
  background-color: #0f0f0f2d;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  background-color: #0f0f0f2d;
  width: 300px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.25rem 0;
  background-color: #0f0f0f2d;

  &::placeholder {
    color: #999;
  }
`;

const NoticeList = styled.div`
  background: #0f0f0f2d;
  border-radius: 4px;
  overflow: hidden;
`;

const NoticeDate = styled.div`
  width: 120px;
  color: #c4c4c4;
`;

const NoticeTitle = styled.div`
  flex: 1;
  color: #dfdfdf;
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:first-child {
    border-top: 1px solid #f0f0f0;
  }

  &:hover {
    background: #0056b3;

    /* ${NoticeDate}, ${NoticeTitle} {
      color: #000000; // 원하는 hover 색상으로 변경
    } */
  }
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
  gap: 1rem;
  width: 100%;
`;

const PageButton = styled.button`
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#007bff" : "#666")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
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
  const [userRole, setUserRole] = useState(null);

  const [notices, setNotices] = useState([]);
  const [searchType, setSearchType] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchNotices = async () => {
      const role = localStorage.getItem("role");
      setUserRole(role);

      try {
        const res = await axios.get("/notices/paged", {
          params: {
            page: currentPage - 1,
            size: itemsPerPage,
            sort:
              sortOrder === "newest" ? "createdDate,desc" : "createdDate,asc",
          },
        });

        setNotices(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("❌ 공지사항 불러오기 실패", err);
      }
    };

    fetchNotices();
  }, [currentPage, sortOrder]);

  const filteredNotices = notices.filter((notice) => {
    if (!searchTerm) return true;
    if (searchType === "date") {
      return notice.createdDate?.includes(searchTerm); // ← 여기 수정
    }
    return notice.title?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.createdDate); // ← 여기로
    const dateB = new Date(b.createdDate);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const paginatedNotices = sortedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchType]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm("");
  };

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowFilter(false);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNoticeClick = (id) => {
    navigate(`${id}`);
  };

  const handleCreateClick = () => {
    navigate("create");
  };

  return (
    <>
      <Title>공지사항</Title>
      <TabContainer />
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
              type="text"
              placeholder={
                searchType === "date" ? "YYYY-MM-DD" : "검색어를 입력하세요"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        </SearchGroup>
        <FilterContainer>
          <FilterButton onClick={handleFilterClick}>
            정렬 {showFilter ? "▲" : "▼"}
          </FilterButton>
          <FilterDropdown $show={showFilter}>
            <FilterOption onClick={() => handleSortChange("newest")}>
              최신순
            </FilterOption>
            <FilterOption onClick={() => handleSortChange("oldest")}>
              오래된 순
            </FilterOption>
          </FilterDropdown>
        </FilterContainer>
      </SearchContainer>

      <NoticeList>
        {paginatedNotices.length > 0 ? (
          paginatedNotices.map((notice) => (
            <NoticeItem
              key={notice.id}
              onClick={() => handleNoticeClick(notice.id)}
            >
              <NoticeDate>{notice.createdDate}</NoticeDate>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <Arrow>›</Arrow>
            </NoticeItem>
          ))
        ) : (
          <NoticeItem>
            <NoticeTitle>검색 결과가 없습니다.</NoticeTitle>
          </NoticeItem>
        )}
      </NoticeList>

      <Pagination>
        <PageButtonGroup>
          <PageButton onClick={() => goToPage(currentPage - 1)}>‹</PageButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i + 1}
              $active={currentPage === i + 1}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => goToPage(currentPage + 1)}>›</PageButton>
        </PageButtonGroup>
        {typeof userRole === "string" && userRole.includes("ADMIN") && (
          <SubmitButton onClick={handleCreateClick}>등록</SubmitButton>
        )}
      </Pagination>
    </>
  );
};

export default NoticePage;
