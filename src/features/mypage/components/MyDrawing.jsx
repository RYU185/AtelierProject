import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 722px;
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
  gap: 8px;
  padding-bottom: 20px;
  max-height: 435px;
  overflow-y: auto;
  padding-right: 2px;
  /* 예쁜 스크롤바를 원한다면: */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #02a5e637;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;

const DrawingItem = styled.div`
  background: #f1f1f1;
  border: 0.1px solid #b5b4b4;
`;

const DrawingImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: #ffffff;
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
    color: ${(props) => (props.status === "임시저장" ? "#029149" : "#0551ea")};
    font-size: 15px;
  }
`;

const DrawingDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 3px;
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
    color: #cb1919;
    &:hover {
      background: #e5e5e5;
    }
  }
`;

const MyDrawings = () => {
  const [drawings, setDrawings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchDrawings = async () => {
      try {
        const response = await axios.get("/api/realdrawing/my");
        const mapped = response.data.map((item) => ({
          id: item.id,
          title: item.title || "무제",
          date: new Date(item.updatedAt).toLocaleDateString(),
          status: item.isTemporary ? "임시저장" : "완성",
          imageData: item.imageData,
        }));
        setDrawings(mapped);
      } catch (err) {
        alert("드로잉 정보를 불러오지 못했습니다.");
        console.error(err);
      }
    };

    fetchDrawings();
  }, [navigate]);

  const handleEdit = (drawingId) => {
    navigate(`/drawingcanvas?edit=${drawingId}`);
  };

  const handleDelete = async (drawingId) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`/api/realdrawing/delete/${drawingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("삭제되었습니다.");
      setDrawings((prev) => prev.filter((drawing) => drawing.id !== drawingId));
    } catch (error) {
      console.error("삭제 중 오류:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const filteredDrawings = drawings.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {filteredDrawings.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#888" }}>
          아직 저장된 드로잉이 없습니다. 🎨
        </p>
      )}
      <DrawingGrid>
        {filteredDrawings.map((drawing) => (
          <DrawingItem key={drawing.id}>
            <DrawingImage src={drawing.imageData} alt={drawing.title} />
            <DrawingInfo>
              <DrawingTitle status={drawing.status}>
                {drawing.title}
                <span className="status">{drawing.status}</span>
              </DrawingTitle>
              <DrawingDate>최근 수정일: {drawing.date}</DrawingDate>
            </DrawingInfo>
            <ButtonContainer>
              {drawing.status === "임시저장" && (
                <ActionButton
                  className="continue"
                  onClick={() => handleEdit(drawing.id)}
                >
                  이어서 그리기
                </ActionButton>
              )}
              <ActionButton
                className="delete"
                onClick={() => handleDelete(drawing.id)}
              >
                삭제
              </ActionButton>
            </ButtonContainer>
          </DrawingItem>
        ))}
      </DrawingGrid>
    </Container>
  );
};

export default MyDrawings;
