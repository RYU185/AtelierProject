import React, { useState } from 'react';
import styled from 'styled-components';

const ArtListContainer = styled.div`
 
  flex: 1;
  padding: 20px;
  margin-left: 100px;
  margin-right: 100px;
  background: #fff;
  border-radius: 8px;
`;

const ArtListHeader = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  
`
const ArtListTitle = styled.h2`
  
  font-size: 24px;
  margin: 0;
`;

const ArtListSearch = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background: #3DA9FC;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddArtButton = styled.button`
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ArtGrid = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 세 장씩 표시
  gap: 20px;
  margin: 0 auto;
  
`;

const ArtItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
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

const ArtActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const EditButton = styled(ActionButton)`
  background: #ffc107;
  color: black;
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;
  color: white;
`;

const AdminArtList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 임시 데이터 (실제로는 API 호출로 데이터를 가져와야 합니다.)
  const artData = [
    { id: 1, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
    { id: 2, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
    { id: 3, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
    { id: 4, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
    { id: 5, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
    { id: 6, title: 'TITLE', artist: 'ARTIST NAME', date: '2023.06.12' },
  ];

  return (
    <>
    <Title>
    <ArtListTitle>작품 목록 관리</ArtListTitle>
    </Title>
    <ArtListContainer>
    
      <ArtListHeader>

        <ArtListSearch>
          <SearchInput
            type="text"
            placeholder="작품명을 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton>검색</SearchButton>
        </ArtListSearch>
        <AddArtButton>작품 추가</AddArtButton>
      </ArtListHeader>
      <ArtGrid>
        {artData.map((art) => (
          <ArtItem key={art.id}>
            <ArtImage />
            <ArtTitle>{art.title}</ArtTitle>
            <ArtArtist>{art.artist}</ArtArtist>
            <ArtDate>{art.date}</ArtDate>
            <ArtActions>
              <EditButton>수정</EditButton>
              <DeleteButton>삭제</DeleteButton>
            </ArtActions>
          </ArtItem>
        ))}
      </ArtGrid>
    </ArtListContainer>
    </>
  );
};

export default AdminArtList;