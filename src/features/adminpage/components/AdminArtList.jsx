import React, { useState } from 'react';
import styled from 'styled-components';
import ArtCard from './ArtCard';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 20px;
  margin-top: 10px;
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
  width: 1200px;
  margin: 0 auto;

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
    background: #3da0e5;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background: #3da9fc;
  color: white;
  border: none;
  position: absolute;
  margin-left: -3px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #3da0e5;
  }
`;

const ArtGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ArtItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
`;

const MoreOptions = styled.div`
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  top: 290px;
  right: 5px;
  z-index: 100; /* 다른 요소 위로 올림 */
  color: #4e5b69; /* 테스트용으로 빨간색으로 변경 */
  
  padding: 2px 5px; /* 아이콘 주변에 여백 추가 */
  border-radius: 4px;
`;

const OptionsMenu = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  margin-top: -43px;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
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
  color: ${({ danger }) => (danger ? "#e16060" : "#018ec8")};

  &:hover {
    background: #f0f0f0;
  }
`;

/* === 모달 스타일 추가 === */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  background-color: white;
  max-width: 900px;
  width: 100%;
  height: 60%;
  position: relative;
  border-radius: 8px;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 50px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #303030;
  }
`;

const ModalImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalDescriptionContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 30px;

  & > h2 {
    font-size: 24px;
    color: #333;
  }

  & > p {
    font-size: 16px;
    color: #444;
    padding-top: 10px;
  }
`;

const AdminArtList = () => {
  const [menuOpen, setMenuOpen] = useState({});
  const [selectedArt, setSelectedArt] = useState(null);

  const toggleMenu = (id) => {
    setMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openModal = (art) => {
    setSelectedArt(art);
  };

  const closeModal = () => {
    setSelectedArt(null);
  };

  const artData = [
    {
      id: 1,
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
      date: '1889',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'A beautiful night sky painted by Van GoghThe world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa..'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      date: '1503',
      imageUrl: '/src/assets/ArtIMG/1.jpg',
      description: 'The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.The world-famous portrait of Mona Lisa.'
    }
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
              <MoreOptions onClick={(e) => {
                e.stopPropagation();
                toggleMenu(art.id);
              }}>⋮</MoreOptions>
              <OptionsMenu visible={menuOpen[art.id]}>
                <OptionButton onClick={() => console.log('수정 클릭')}>수정</OptionButton>
                <OptionButton danger onClick={() => console.log('삭제 클릭')}>삭제</OptionButton>
              </OptionsMenu>
              <ArtCard
                title={art.title}
                artist={art.artist}
                date={art.date}
                imageUrl={art.imageUrl}
                onImageClick={() => openModal(art)} // 이미지 클릭 시 모달 열기
              />
            </ArtItem>
          ))}
        </ArtGrid>
      </ArtListContainer>

      {/* 모달 */}
      <ModalOverlay isOpen={selectedArt !== null} onClick={closeModal}>
        {selectedArt && (
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <ModalImageContainer>
              <img src={selectedArt.imageUrl} alt={selectedArt.title} />
            </ModalImageContainer>
            <ModalDescriptionContainer>
              <h2>{selectedArt.title}</h2>
              <p>{selectedArt.description}</p>
            </ModalDescriptionContainer>
          </Modal>
        )}
      </ModalOverlay>
    </PageContainer>
  );
};

export default AdminArtList;
