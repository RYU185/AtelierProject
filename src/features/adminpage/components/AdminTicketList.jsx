import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import styled from 'styled-components';

// ✅ AdminGoods와 동일한 스타일 적용
const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

// ✅ AdminGoods의 AdminMenu 스타일 동일하게 적용
const AdminMenuWrapper = styled.div`
  position: relative;
  top: 30px;
  margin-left: 13px;
`;

// 메인 콘텐츠 영역
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: -30px;
`;

// 제목 스타일
const Title = styled.h1`
position: relative;
  font-size: 32px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

// 검색창 컨테이너
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3a92e5;
  }
`;

// 표 스타일
const Table = styled.table`
   width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  margin-top: 20px;
  margin-right: -17px;
  font-size: 16px;
  text-align: center;
  table-layout: fixed;
 
`;

const Th = styled.th`
  background: #f0f0f0;
  padding: 12px;
  justify-content: center;
  border: 1px solid #ddd;
  text-align: center
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

// 이미지 스타일
const Thumbnail = styled.img`
width: 180px;
  height: 130px;
  position: relative;
  object-fit: cover;
  margin-left: -450px;
  border-radius: 5px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  pointer-events: auto; /* ✅ 이미지만 클릭 가능 */

  &:hover {
    transform: scale(1.05);
  }
`;

const AdminTicketList = () => {
  return (
    <>
      <Header />
      <Container>
        {/* ✅ AdminMenuWrapper 적용 */}
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        {/* 메인 콘텐츠 */}
        <MainContent>
          <Title>티켓 판매 내역</Title>

          {/* 검색창 */}
          <SearchContainer>
            <SearchInput type="text" placeholder="전시명을 검색하세요" />
            <SearchButton>검색</SearchButton>
          </SearchContainer>

          {/* 티켓 판매 내역 표 */}
          <Table>
            <thead>
              <tr>
                <Th>전시 정보</Th>
                <Th>누적 관람객</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>
                  <Thumbnail src="/src/assets/ArtIMG/1.jpg" alt="전시 이미지" />
                  <div>
                    <p>2025.04.12 - 2025.04.25</p>
                    <p><strong>FOLDER [record and archive]</strong></p>
                    <p>현대 산업디자인展</p>
                  </div>
                </Td>
                <Td>15 명</Td>
              </tr>
              <tr>
                <Td>
                  <Thumbnail src="/src/assets/ArtIMG/2.jpg" alt="전시 이미지" />
                  <div>
                    <p>2025.04.12 - 2025.04.25</p>
                    <p><strong>FOLDER [record and archive]</strong></p>
                    <p>현대 산업디자인展</p>
                  </div>
                </Td>
                <Td>21 명</Td>
              </tr>
              <tr>
                <Td>
                  <Thumbnail src="/src/assets/ArtIMG/2.jpg" alt="전시 이미지" />
                  <div>
                    <p>2025.04.12 - 2025.04.25</p>
                    <p><strong>FOLDER [record and archive]</strong></p>
                    <p>현대 산업디자인展</p>
                  </div>
                </Td>
                <Td>21 명</Td>
              </tr>
              <tr>
                <Td>
                  <Thumbnail src="/src/assets/ArtIMG/2.jpg" alt="전시 이미지" />
                  <div>
                    <p>2025.04.12 - 2025.04.25</p>
                    <p><strong>FOLDER [record and archive]</strong></p>
                    <p>현대 산업디자인展</p>
                  </div>
                </Td>
                <Td>21 명</Td>
              </tr>
            </tbody>
          </Table>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default AdminTicketList;
