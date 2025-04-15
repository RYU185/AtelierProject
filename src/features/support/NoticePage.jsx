import React, { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// === 스타일 === (생략 없이 전체 유지)
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
  display: ${(props) => (props.$show ? "block" : "none")};
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

// === 컴포넌트 ===
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

  // ✅ axios API 연동
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

        setNotices(res.data.content); // Page<NoticeDTO> 구조에서 content만
        setTotalPages(res.data.totalPages); // 페이지 수도 세팅
      } catch (err) {
        console.error("❌ 공지사항 불러오기 실패", err);
      }
    };

    fetchNotices();
  }, [currentPage, sortOrder]);

  // 🔍 검색 필터
  const filteredNotices = notices.filter((notice) => {
    if (!searchTerm) return true;
    if (searchType === "date") {
      return notice.date.includes(searchTerm);
    }
    return notice.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // ⬆️ 정렬 처리
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.createdDate); // ← 여기로
    const dateB = new Date(b.createdDate);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // ✅ 페이지네이션 처리
  const paginatedNotices = sortedNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지, 검색 초기화 처리
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchType]);

  // ====================== 핸들러 ======================
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

  // ====================== 렌더링 ======================
  return (
    <>
      <Title>NOTICE</Title>
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
        {userRole?.includes("ADMIN") && (
          <SubmitButton onClick={handleCreateClick}>등록</SubmitButton>
        )}
      </Pagination>
    </>
  );
};

export default NoticePage;
