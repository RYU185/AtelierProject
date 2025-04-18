import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import styled from 'styled-components';
import AdminTicketMenubar from './AdminTicketMenubar';

// ✅ 정적 이미지 + 업로드 이미지 모두 처리 (현재는 정적만 사용)
const artImages = import.meta.glob("/public/images/ArtistGalleryIMG/*", {
  eager: true,
});
const getImageUrl = (filename) => {
  if (!filename) return '/images/default-image.png';

  const matched = Object.entries(artImages).find(([path]) =>
    path.endsWith(filename)
  );
  return matched ? matched[1].default : '/images/default-image.png';
};

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
    width: 70%;
  }
  &:nth-child(2) {
    width: 30%;
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

const AdminTicketList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/artistgallery/now');
        const galleries = await response.json();

        const updatedData = await Promise.all(
          galleries.map(async (gallery) => {
            return {
              id: gallery.id,
              image: getImageUrl(gallery.posterUrl),
              dateRange: `${gallery.startDate} - ${gallery.endDate}`,
              title: gallery.title,
              visitors: 0 // 예약자 수 추후 추가
            };
          })
        );

        setTicketData(updatedData);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

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
  }, [searchTerm, sortOption, ticketData]);

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
          <Title>티켓 예약 현황</Title>

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
            <SearchButton onClick={() => setSearchTerm(searchTerm)}>
              검색
            </SearchButton>
          </SearchContainer>

          <Table>
            <thead>
              <tr>
                <Th>전시 정보</Th>
                <Th>예약 관람객</Th>
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
                    <div style={{ marginTop: '200px' }}>
                      <p>{ticket.dateRange}</p>
                      <p><strong>{ticket.title}</strong></p>
                    </div>
                  </Td>
                  <Td>{ticket.visitors} 명</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default AdminTicketList;
