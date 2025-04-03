import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import styled from 'styled-components';
import AdminTicketMenubar from './AdminTicketMenubar';

// ✅ AdminGoods와 동일한 스타일 적용
const Container = styled.div`
  display: flex;
  padding: 23px;
  margin-left: 23px;
  position: relative;
`;

const AdminGoodsMenubarWrapper = styled.div`
  position: relative;
  top: 100px;
  left: 21px;
  z-index: 10;
  margin-left: -85px;
`;

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


const Title = styled.h1`
position: relative;
  font-size: 32px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

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
  margin-right: 160px;
`;


const SearchButton = styled.button`
 position: absolute; /* 🔥 버튼 위치 조정 */
  right : 130px; /* 버튼을 검색창의 왼쪽으로 이동 */
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 90px;

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
  table-layout: fixed; /* ✅ 테이블 크기 고정 */
`;

const Th = styled.th`
  background: #f0f0f0;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;

  /* ✅ 너비 비율 조정 */
  &:first-child {
    width: 75%; /* 전시 정보 칸 넓게 */
  }
  &:nth-child(2) {
    width: 25%; /* 누적 관람객 칸 줄이기 */
  }
`;

const Td = styled.td`
  position: relative;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  height: 200px;

  /* ✅ 동일한 비율 적용 */
  &:first-child {
    width: 75%;
  }
  &:nth-child(2) {
    width: 25%;
  }
`;

const Thumbnail = styled.img`
  width: 170px; /* ✅ 이미지 너비 증가 */
  height: 180px; /* ✅ 이미지 세로 크기 증가 */
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  position: absolute; /* ✅ 절대 위치 설정 */
  top: 30%; /* ✅ 부모 요소(Td)의 정중앙 기준 */
  left: 10%;
  transform: translate(-50%, -30%); /* ✅ 위쪽으로 살짝 올려서 조정 */

  &:hover {
    transform: translate(-50%, -30%) scale(1.05);
  }
`;


const AdminTicketList = () => {
  return (
    <>
      <Header />
      <AdminGoodsMenubarWrapper>
        <AdminTicketMenubar />
      </AdminGoodsMenubarWrapper>
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
