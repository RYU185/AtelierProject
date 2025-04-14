import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import styled from 'styled-components';
import AdminTicketMenubar from './AdminTicketMenubar';

// ✅ 스타일 정의
const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 23px;
  position: relative;
`;

const AdminGoodsMenubarWrapper = styled.div`
  position: relative;
  top: 100px;
  left: 45px;
  z-index: 10;
  margin-left: -85px;
`;

const AdminMenuWrapper = styled.div`
  position: relative;
  top: -30px;
  margin-left: 13px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: -60px;
  margin-left: 30px;
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
  position: absolute;
  right: 130px;
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
  border: 1px solid #ddd;
  text-align: center;

  &:first-child {
    width: 75%;
  }
  &:nth-child(2) {
    width: 25%;
  }
`;

const Td = styled.td`
  position: relative;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  height: 200px;

  &:first-child {
    width: 75%;
  }
  &:nth-child(2) {
    width: 25%;
  }
`;

const Thumbnail = styled.img`
  width: 170px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  position: absolute;
  top: 30%;
  left: 10%;
  transform: translate(-50%, -30%);

  &:hover {
    transform: translate(-50%, -30%) scale(1.05);
  }
`;

const AdminTicketList = () => {
  const navigate = useNavigate();

  // ✅ 이미지 클릭 시 해당 아티스트 갤러리 페이지로 이동
  const handleThumbnailClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  return (
    <>
      <Header />
      <AdminGoodsMenubarWrapper>
        <AdminTicketMenubar />
      </AdminGoodsMenubarWrapper>
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <MainContent>
          <Title>티켓 판매 내역</Title>

          <SearchContainer>
            <SearchInput type="text" placeholder="전시명을 검색하세요" />
            <SearchButton>검색</SearchButton>
          </SearchContainer>

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
                  <Thumbnail
                    src="/src/assets/ArtIMG/1.jpg"
                    alt="전시 이미지"
                    onClick={() => handleThumbnailClick(1)} // ✅ ID 1로 이동
                  />
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
                  <Thumbnail
                    src="/src/assets/ArtIMG/2.jpg"
                    alt="전시 이미지"
                    onClick={() => handleThumbnailClick(2)} // ✅ ID 2로 이동
                  />
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
                  <Thumbnail
                    src="/src/assets/ArtIMG/3.jpg"
                    alt="전시 이미지"
                    onClick={() => handleThumbnailClick(3)} // ✅ ID 3로 이동
                  />
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
                  <Thumbnail
                    src="/src/assets/ArtIMG/3.jpg"
                    alt="전시 이미지"
                    onClick={() => handleThumbnailClick(3)} // ✅ ID 3로 이동
                  />
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
                  <Thumbnail
                    src="/src/assets/ArtIMG/3.jpg"
                    alt="전시 이미지"
                    onClick={() => handleThumbnailClick(3)} // ✅ ID 3로 이동
                  />
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
