import React, { useState } from 'react';
import styled from 'styled-components';
import ArtCard from './ArtCard';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const ArtListTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  background: #3DA9FC; /* ✅ 배경 유지 */
  color: #dee2e6; /* ✅ 텍스트 색상 */
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  width: 200px; /* ✅ 길이 줄이기 */
  margin-top: -50px;
  margin-left: 80px;
`;


const ArtListContainer = styled.div`
  width: 100%;
  width: 1200px; /* ✅ 넓이 조정 */
  margin: 0 auto;
  margin-left: 100px;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px; /* ✅ 컨테이너는 원래 위치 유지 */
  
`;

const ArtListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  width:300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ active }) => (active ? '#3da0e5' : '#829CBC')};
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ active }) => (active ? '#3da0e5' : '#829CBC')};
  }
`;

const ArtGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* ✅ 4개씩 배치 */
  gap: 20px;

  
`;

const ArtItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  position: relative;
`;

const ArtImage = styled.div`
  width: 100%;
  height: 150px;
  background: #f0f0f0;
  margin-bottom: 10px;
`;

const ArtTitle = styled.h3`
  font-size: 16px;
  margin: 5px 0;
`;

const ArtArtist = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const ArtDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 5px 0;
`;

const MoreOptions = styled.div`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  margin-top:160px;
  top: 10px;
  right: 10px;
`;

const OptionsMenu = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  top: 100%;  
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
  z-index: 10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ danger }) => (danger ? "#e74c3c" : "#3da9fc")}; /* 삭제 버튼만 빨간색 */
    color: white;
  }
`;


const AdminArtList = () => {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const artData = [
    {
      id: 1,
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
      date: '1889',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },

    // 추가 데이터...
  ];

  return (
    <PageContainer>
      <ArtListTitle>작품 목록 관리</ArtListTitle>

      <ArtListContainer>
        <ArtListHeader>
          <SearchContainer>
            <SearchInput type="text" placeholder="작품명을 검색하세요" />
            <SearchButton>검색</SearchButton>
          </SearchContainer>

          <Link to="/AdminArtAdd">
            <AddButton>작품 추가</AddButton>
          </Link>
        </ArtListHeader>

        <ArtGrid>
          {artData.map((art) => (
            <ArtItem key={art.id}>
              <MoreOptions onClick={() => toggleMenu(art.id)}>⋮</MoreOptions>
              <OptionsMenu visible={menuOpen === art.id}>
                <OptionButton onClick={() => console.log('수정 클릭')}>수정</OptionButton>
                <OptionButton danger onClick={() => console.log('삭제 클릭')}>삭제</OptionButton>
              </OptionsMenu>
              <ArtCard
                title={art.title}
                artist={art.artist}
                date={art.date}
                imageUrl={art.imageUrl}
              />
            </ArtItem>
          ))}
        </ArtGrid>
      </ArtListContainer>
    </PageContainer>
  );
};

export default AdminArtList;
