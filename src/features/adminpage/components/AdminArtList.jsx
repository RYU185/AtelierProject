import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtCard from '../components/ArtCard';
import { Link } from 'react-router-dom';
import api from "../../../api/axiosInstance";

// ✅ 정적 이미지 + 업로드 이미지 모두 처리
const artImages = import.meta.glob("/public/images/ArtListIMG/*", {
  eager: true,
});

const getImageUrl = (filename) => {
  if (!filename) return '/path/to/default-image.png';

  // ✅ 정적 이미지 매칭 (ArtListIMG)
  const matched = Object.entries(artImages).find(([path]) =>
    path.endsWith(filename)
  );
  if (matched) {
    return matched[1].default;
  }

  // ✅ 업로드 이미지 처리
  return `http://localhost:8081/uploads/${filename.replace(/^\/uploads\//, '')}`;
};

// ✅ 이하 동일 코드
const PageContainer = styled.div`padding: 20px; margin-top: 10px; min-height: 100vh;`;
const ArtListTitle = styled.h2`font-size: 25px; font-weight: bold; color: #222; text-align: center; padding: 12px; border-radius: 6px; width: 200px; margin-top: -50px; margin-left: 15px;`;
const ArtListContainer = styled.div`width: 1200px; margin: 0 auto; padding: 10px; border-radius: 8px; margin-top: 20px;`;
const ArtListHeader = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;`;
const SearchContainer = styled.div`display: flex; gap: 10px;`;
const SearchInput = styled.input`width: 300px; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px;`;
const SearchButton = styled.button`padding: 8px 16px; background: #3da9fc; color: white; border: none; border-radius: 4px; cursor: pointer; &:hover { background: #3da0e5; }`;
const AddButton = styled.button`padding: 8px 16px; background: #3da9fc; color: white; border: none; position: absolute; margin-left: -3px; border-radius: 4px; cursor: pointer; &:hover { background: #3da0e5; }`;
const ArtGrid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;`;
const ArtItem = styled.div`border: 1px solid #ddd; border-radius: 8px; padding: 10px; text-align: center; position: relative; cursor: pointer;`;
const MoreOptions = styled.div`cursor: pointer; font-size: 30px; position: absolute; bottom: 10px; right: 10px; z-index: 100; color: #4e5b69; padding: 2px 5px; transition: all 0.3s ease; pointer-events: auto;`;
const OptionsMenu = styled.div`display: ${({ visible }) => (visible ? 'block' : 'none')}; position: absolute; top: 100%; margin-top: -20px; margin-left: 180px; background: rgba(255, 255, 255, 0.9); border: 1px solid #ccc; border-radius: 4px; width: 100px; z-index: 10; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);`;
const OptionButton = styled.button`width: 100%; left: 30px; padding: 8px; border: none; background: white; cursor: pointer; font-size: 14px; color: ${({ danger }) => (danger ? "#e16060" : "#018ec8")}; &:hover { background: #f0f0f0; }`;
const ModalOverlay = styled.div`position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; justify-content: center; align-items: center; z-index: 1000;`;
const Modal = styled.div`display: grid; grid-template-columns: 3fr 2fr; gap: 20px; background-color: white; max-width: 900px; width: 100%; height: 60%; position: relative; border-radius: 8px; padding: 20px;`;
const CloseButton = styled.button`position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 50px; cursor: pointer; color: #333; &:hover { color: #303030; }`;
const ModalImageContainer = styled.div`width: 100%; height: 100%; overflow: hidden; & > img { width: 100%; height: 100%; object-fit: cover; }`;
const ModalDescriptionContainer = styled.div`width: 100%; height: 100%; padding-top: 30px; padding-left: 10px; padding-right: 30px; & > h2 { font-size: 24px; color: #333; } & > p { font-size: 16px; color: #444; padding-top: 10px; }`;

const AdminArtList = () => {
  const [artList, setArtList] = useState([]);
  const [menuOpen, setMenuOpen] = useState({});
  const [selectedArt, setSelectedArt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArtList();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setMenuOpen({});
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchArtList = async () => {
    try {
      const response = await api.get('/art');
      setArtList(response.data);
    } catch (error) {
      console.error('작품 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const toggleMenu = (id) => setMenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  const openModal = (art) => setSelectedArt(art);
  const closeModal = () => setSelectedArt(null);

  const handleDelete = async (id) => {
    try {
      await api.post(`/art/${id}/delete`);
      setMenuOpen({});
      fetchArtList();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const filteredArtList = artList.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <ArtListTitle>작품 목록 관리</ArtListTitle>
      <ArtListContainer>
        <ArtListHeader>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="작품명을 검색하세요"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchButton onClick={() => {}}>검색</SearchButton>
          </SearchContainer>
          <Link to="/AdminArtAdd"><AddButton>작품 추가</AddButton></Link>
        </ArtListHeader>

        <ArtGrid>
          {filteredArtList.map((art) => (
            <ArtItem key={art.id}>
              <MoreOptions onClick={(e) => {
                e.stopPropagation();
                toggleMenu(art.id);
              }}>⋮</MoreOptions>

              <OptionsMenu visible={menuOpen[art.id]} onClick={(e) => e.stopPropagation()}>
                <OptionButton danger onClick={() => handleDelete(art.id)}>삭제</OptionButton>
              </OptionsMenu>

              <ArtCard
                title={art.title}
                artist={art.artistName}
                date={art.completionDate}
                imageUrl={getImageUrl(art.imgUrl)}
                onImageClick={() => openModal(art)}
              />
            </ArtItem>
          ))}
        </ArtGrid>
      </ArtListContainer>

      <ModalOverlay isOpen={selectedArt !== null} onClick={closeModal}>
        {selectedArt && (
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <ModalImageContainer>
              <img src={getImageUrl(selectedArt.imgUrl)} alt={selectedArt.title} />
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
