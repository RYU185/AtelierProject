import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';

// ✅ 컨테이너 스타일
const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

// ✅ 사이드바 스타일
const AdminMenuWrapper = styled.div`
  position: relative;
  top: -58px;
  margin-left: 13px;
`;

// ✅ 제목 스타일
const TitleWrapper = styled.div`
  position: relative;
  top: 40px;
  margin-left: 480px;
  color: #222;
  font-size: 25px;
  font-weight: bold;
`;

// ✅ 검색 및 정렬 스타일
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SortButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #3a92e5;
  }
`;

// ✅ 슬라이드 정렬 옵션
const SortOptions = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background: white;
  position: absolute;
  top: 45px;
  left: 0;
  width: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
`;

const SortOption = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

// ✅ 유저 테이블 스타일 (그리드 적용)
const TableWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 80px 150px 250px 200px 150px 150px 120px 80px;
  border-top: 3px solid #bbb;
  margin-top: 20px;
`;

const TableHeader = styled.div`
  background: #f8f8f8;
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #bbb;
  text-align: center;
`;

const TableRow = styled.div`
  display: contents;
`;

const TableCell = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

// ✅ 유저 데이터
const AdminUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState(null);

  const userData = [
    { id: '1', nickname: '곽두팔', address: '대전광역시 서구 탄방동 4번지', email: 'emil@gmail.com', birth: '1999.09.01', joinDate: '2025.01.16', points: 30000, gender: '남' },
    { id: '2', nickname: '김철수', address: '서울특별시 강남구 테헤란로', email: 'kim@gmail.com', birth: '1995.06.12', joinDate: '2024.11.22', points: 50000, gender: '여' },
    { id: '3', nickname: '이영희', address: '부산광역시 해운대구', email: 'lee@gmail.com', birth: '2000.05.21', joinDate: '2023.07.30', points: 10000, gender: '여' },
    { id: '4', nickname: '곽두팔', address: '대전광역시 서구 탄방동 4번지', email: 'emil@gmail.com', birth: '1999.09.01', joinDate: '2025.01.16', points: 30000, gender: '남' },
    { id: '5', nickname: '곽두팔', address: '대전광역시 서구 탄방동 4번지', email: 'emil@gmail.com', birth: '1999.09.01', joinDate: '2025.01.16', points: 30000, gender: '남' },
    { id: '6', nickname: '곽두팔', address: '대전광역시 서구 탄방동 4번지', email: 'emil@gmail.com', birth: '1999.09.01', joinDate: '2025.01.16', points: 30000, gender: '남' },
    { id: '7', nickname: '곽두팔', address: '대전광역시 서구 탄방동 4번지', email: 'emil@gmail.com', birth: '1999.09.01', joinDate: '2025.01.16', points: 30000, gender: '남' },
  ];

  // 🔍 검색 필터 적용
  const filteredUsers = userData.filter(user =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔽 정렬 로직 적용
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.joinDate) - new Date(a.joinDate);
    } else if (sortType === 'points') {
      return b.points - a.points;
    }
    return 0;
  });

  return (
    <>
      <Header />
      <TitleWrapper>유저 관리</TitleWrapper>

      <Container>
        {/* ✅ 사이드바 유지 */}
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* 🔍 검색 및 정렬 필터 */}
          <FilterContainer>
            <SearchInput
              type="text"
              placeholder="닉네임 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ position: 'relative' }}>
              <SortButton onClick={() => setSortOpen(!sortOpen)}>검색 정렬</SortButton>
              <SortOptions open={sortOpen}>
                <SortOption onClick={() => { setSortType('recent'); setSortOpen(false); }}>최근 가입순</SortOption>
                <SortOption onClick={() => { setSortType('points'); setSortOpen(false); }}>포인트 많은 순</SortOption>
              </SortOptions>
            </div>
          </FilterContainer>

          {/* 📊 테이블 렌더링 */}
          <TableWrapper>
            <TableHeader>ID</TableHeader>
            <TableHeader>닉네임</TableHeader>
            <TableHeader>주소</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>생년월일</TableHeader>
            <TableHeader>가입날짜</TableHeader>
            <TableHeader>포인트</TableHeader>
            <TableHeader>성별</TableHeader>

            {sortedUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birth}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.points}</TableCell>
                <TableCell>{user.gender}</TableCell>
              </TableRow>
            ))}
          </TableWrapper>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AdminUser;
