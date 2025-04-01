import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 722px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4199ff;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
`;

const DrawingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const DrawingCard = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DrawingImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const DrawingInfo = styled.div`
  padding: 16px;
`;

const DrawingTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
`;

const DrawingDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const DrawingStatus = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: ${(props) => (props.completed ? "#E8F5E9" : "#FFF3E0")};
  color: ${(props) => (props.completed ? "#2E7D32" : "#E65100")};
`;

const MyDrawing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const drawings = [
    {
      id: 1,
      title: "TITLE",
      date: "최근 수정일: 2022.03.18",
      image: "/images/drawing1.jpg",
      completed: true,
    },
    {
      id: 2,
      title: "TITLE",
      date: "최근 수정일: 2023.11.21",
      image: "/images/drawing2.jpg",
      completed: true,
    },
    {
      id: 3,
      title: "TITLE",
      date: "최근 수정일: 2025.02.14",
      image: "/images/drawing3.jpg",
      completed: false,
    },
  ];

  const filteredDrawings = drawings.filter((drawing) =>
    drawing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="내가 만든 드로잉 작품을 검색할 수 있어요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <DrawingGrid>
        {filteredDrawings.map((drawing) => (
          <DrawingCard key={drawing.id}>
            <DrawingImage src={drawing.image} alt={drawing.title} />
            <DrawingInfo>
              <DrawingTitle>
                {drawing.title}
                <DrawingStatus completed={drawing.completed}>
                  {drawing.completed ? "완성" : "임시저장"}
                </DrawingStatus>
              </DrawingTitle>
              <DrawingDate>{drawing.date}</DrawingDate>
            </DrawingInfo>
          </DrawingCard>
        ))}
      </DrawingGrid>
    </Container>
  );
};

export default MyDrawing;
