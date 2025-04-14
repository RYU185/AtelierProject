import React, { useState, useMemo } from 'react';
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
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
position: relative;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  margin-right: -150px;
`;

const SortSelect = styled.select`
position: relative;
  padding: 8px;
  top: -40px;
  margin-right: 150px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
    width: 65%;
  }
  &:nth-child(2) {
    width: 15%;
  }
  &:nth-child(3) {
    width: 20%;
  }
`;

const Td = styled.td`
  position: relative;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  height: 200px;
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

const Summary = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
`;

const AdminTicketList = () => {
  const navigate = useNavigate();
  const pricePerTicket = 10000;

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const ticketData = [
    { id: 1, image: '/src/assets/ArtIMG/1.jpg', dateRange: '2025.04.12 - 2025.04.25', title: '현대 산업디자인展', visitors: 15 },
    { id: 2, image: '/src/assets/ArtIMG/2.jpg', dateRange: '2025.04.12 - 2025.04.25', title: '현대 산업디자인展', visitors: 21 },
    { id: 3, image: '/src/assets/ArtIMG/3.jpg', dateRange: '2025.04.12 - 2025.04.25', title: '현대 산업디자인展', visitors: 21 },
  ];

  const handleThumbnailClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...ticketData];

    if (searchTerm.trim() !== '') {
      data = data.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'asc') {
      data.sort((a, b) => a.visitors - b.visitors);
    } else if (sortOption === 'desc') {
      data.sort((a, b) => b.visitors - a.visitors);
    }

    return data;
  }, [searchTerm, sortOption]);

  const totalVisitors = filteredAndSortedData.reduce((sum, ticket) => sum + ticket.visitors, 0);
  const totalRevenue = totalVisitors * pricePerTicket;

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
            <SearchInput
              type="text"
              placeholder="전시명을 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SortSelect
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">정렬 선택</option>
              <option value="asc">관람객 수 오름차순</option>
              <option value="desc">관람객 수 내림차순</option>
            </SortSelect>
            <SearchButton>검색</SearchButton>
          </SearchContainer>

          <Table>
            <thead>
              <tr>
                <Th>전시 정보</Th>
                <Th>누적 관람객</Th>
                <Th>수익</Th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((ticket) => (
                <tr key={ticket.id}>
                  <Td>
                    <Thumbnail
                      src={ticket.image}
                      alt="전시 이미지"
                      onClick={() => handleThumbnailClick(ticket.id)}
                    />
                    <div>
                      <p>{ticket.dateRange}</p>
                      <p><strong>FOLDER [record and archive]</strong></p>
                      <p>{ticket.title}</p>
                    </div>
                  </Td>
                  <Td>{ticket.visitors} 명</Td>
                  <Td>{(ticket.visitors * pricePerTicket).toLocaleString()} 원</Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Summary>
            총 관람객: {totalVisitors}명 | 총 수익: {totalRevenue.toLocaleString()} 원
          </Summary>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default AdminTicketList;
