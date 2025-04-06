import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 15px;
  width: 100%;
  align-self: stretch;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  max-width: 1000px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border: 2px solid #e1e1e1;
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
  cursor: pointer;
  color: #0095e1;
`;

const DrawingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const DrawingItem = styled.div`
  background: #fff;
`;

const DrawingImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
`;

const DrawingInfo = styled.div`
  padding: 12px;
`;

const DrawingTitle = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span.status {
    color: ${(props) => (props.status === "임시저장" ? "#fc7c05" : "#0551ea")};
    font-size: 15px;
  }
`;

const DrawingDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0px;
  padding: 8px;
  background: #f5f5f5;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;
  white-space: nowrap;

  &.continue {
    background: #0095e1;
    color: white;
    &:hover {
      background: #0085d1;
    }
  }

  &.view {
    background: #0095e1;
    color: white;
    &:hover {
      background: #0085d1;
    }
  }

  &.delete {
    background: #fff;
    color: #666;
    &:hover {
      background: #e5e5e5;
    }
  }
`;

const MyDrawings = () => {
  const [activeTab, setActiveTab] = useState("drawing"); // drawing, ticket, goods
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const drawings = [
    {
      id: 1,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2025.02.14",
      status: "임시저장",
    },
    {
      id: 2,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2023.11.21",
      status: "완성",
    },
    {
      id: 3,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2022.03.18",
      status: "완성",
    },
    {
      id: 4,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2022.03.18",
      status: "완성",
    },
    {
      id: 5,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2022.03.18",
      status: "완성",
    },
    {
      id: 6,
      title: "TITLE",
      description: "DESCRIPTION IS NULLABLE T...",
      date: "2022.03.18",
      status: "완성",
    },
  ];

  const handleEdit = (drawingId) => {
    navigate(`/drawingcanvas?edit=${drawingId}`);
  };

  const handleDelete = (drawingId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // Implement the delete logic here
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="내가 만든 작품의 제목을 검색할 수 있어요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <DrawingGrid>
        {drawings.map((drawing) => (
          <DrawingItem key={drawing.id}>
            <DrawingImage />
            <DrawingInfo>
              <DrawingTitle status={drawing.status}>
                {drawing.title}
                <span className="status">{drawing.status}</span>
              </DrawingTitle>
              <DrawingDate>최근 수정일: {drawing.date}</DrawingDate>
            </DrawingInfo>
            <ButtonContainer>
              {drawing.status === "임시저장" ? (
                <>
                  <ActionButton
                    className="continue"
                    onClick={() => handleEdit(drawing.id)}
                  >
                    이어서 그리기
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(drawing.id)}
                  >
                    삭제
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton
                    className="view"
                    onClick={() =>
                      navigate("/community", {
                        state: {
                          id: drawing.id,
                          title: drawing.title,
                          date: drawing.date,
                          image: `/images/${drawing.id}.jpg`, // 실제 이미지 경로로 수정해줘!
                          nickname: "RYU", // 예시
                          content: "그림에 대한 설명 또는 내용", // 필요시
                        },
                      })
                    }
                  >
                    나의 그림보기
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(drawing.id)}
                  >
                    삭제
                  </ActionButton>
                </>
              )}
            </ButtonContainer>
          </DrawingItem>
        ))}
      </DrawingGrid>
    </Container>
  );
};

export default MyDrawings;
