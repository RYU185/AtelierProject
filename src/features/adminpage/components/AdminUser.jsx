import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../api/axiosInstance'; // 네가 만든 axios 인스턴스 경로
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`;


const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -58px;
  margin-left: 13px;
`;

const TitleWrapper = styled.div`
  position: relative;
  top: 40px;
  margin-left: 480px;
  color: #222;
  font-size: 25px;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1500px;
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
  z-index: 20;
`;

const SortOption = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-top: 20px;
`;

const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  display: block;
  border-top: 3px solid #bbb;
`;

const TableHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px 140px 120px 180px 150px 200px 150px 140px 100px 80px;
  background: #f8f8f8;
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #bbb;
  text-align: center;
  position: sticky;
  top: 0;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 155px 150px 120px 180px 150px 200px 150px 140px 100px 80px;
  text-align: center;
`;

const TableCell = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const AdminUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUserData(response.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = userData.filter(user =>
    user.nickName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.enrolmentDate) - new Date(a.enrolmentDate);
    } else if (sortType === 'points') {
      return b.point - a.point;
    }
    return 0;
  });

  return (
    <>
    <GradientBackground>
      <Header />
      <TitleWrapper>유저 관리</TitleWrapper>

      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

          <TableContainer>
            <TableHeaderWrapper>
              <div>ID</div><div>닉네임</div><div>실명</div><div>Email</div><div>생년월일</div>
              <div>주소</div><div>연락처</div><div>가입일</div><div>성별</div>
            </TableHeaderWrapper>
            <TableWrapper>
              {sortedUsers.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthday}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.enrolmentDate}</TableCell>
                 
                  <TableCell>{user.gender}</TableCell>
                </TableRow>
              ))}
            </TableWrapper>
          </TableContainer>
        </div>
      </Container>
      <Footer />
      </GradientBackground>
    </>
  );
};

export default AdminUser;
