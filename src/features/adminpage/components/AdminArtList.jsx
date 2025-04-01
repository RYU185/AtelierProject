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
  font-size: 25px;
  font-weight: bold;
 
  color: #222;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  width: 200px;
  margin-top: -50px;
  margin-left: 15px;
`;

const ArtListContainer = styled.div`
  width: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-left: 100px;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
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
  margin-left: -80px;
`;

const SearchInput = styled.input`
  width: 300px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-left: -80px;
`;

const ArtItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  position: relative;
`;

const MoreOptions = styled.div`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: 300px;
  
`;

const OptionsMenu = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  margin-top: -43px;
  right: 0;
  background: rgba(255, 255, 255, 0.9); /* 불투명도 추가 (0.9로 설정) */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
  z-index: 10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  
  /* hover 시에도 불투명도 유지 */
  &:hover {
    background: rgba(255, 255, 255, 0.9); /* hover시 배경 색상과 불투명도 동일 */
  }
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
    background: ${({ danger }) => (danger ? "#e74c3c" : "#3da9fc")};
    color: white;
  }
`;

const AdminArtList = () => {
  const [menuOpen, setMenuOpen] = useState({});

  const toggleMenu = (id) => {
    setMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 ID에 대한 토글만 관리
    }));
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
      id: 3,
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      date: '1931',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 4,
      title: 'The Scream',
      artist: 'Edvard Munch',
      date: '1893',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 5,
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
      date: '1889',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 6,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 7,
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      date: '1931',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
    {
      id: 8,
      title: 'The Scream',
      artist: 'Edvard Munch',
      date: '1893',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
    },
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
              <OptionsMenu visible={menuOpen[art.id]}>
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
