import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../../api/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DataControlBox = styled.div`
  width: 65%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between; /* 버튼 그룹과 검색창 양 끝으로 배치 */
  padding-bottom: 20px;
  border-bottom: 2px solid #bababa;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 15px;
  color: #606060;
  transition: 0.3s ease;
  border-bottom: 3px solid #ffffff;
  &:hover {
    color: #018ec8;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 300px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #018ec8;
  border-radius: 7px;
  padding: 8px 30px 8px 10px;
  &:focus {
    outline: none;
    border-color: #018ec8;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  color: #018ec8;
  font-size: 1.2em;
  cursor: pointer;
`;

function DataControlUser({ onFilterChange }) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const buttonNames = ["전체", "현재 전시", "과거 전시", "예정 전시"];

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
    let apiUrl = "/api/usergallery";
    switch (index) {
      case 1:
        apiUrl = "/api/usergallery/now";
        break;
      case 2:
        apiUrl = "/api/usergallery/past";
        break;
      case 3:
        apiUrl = "/api/usergallery/expected";
        break;
      default:
        break;
    }
    fetchGalleryData(apiUrl);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchGalleryData(`/api/usergallery/title/${searchTerm.trim()}`);
    } else {
      fetchGalleryData("/api/usergallery");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const fetchGalleryData = (apiUrl) => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.length === 0 && searchTerm.trim() !== "") {
          alert("검색 결과가 없습니다.");
        }
        onFilterChange(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        alert("해당 검색어를 가진 전시회가 존재하지 않습니다.");
      });
  };

  return (
    <div>
      <DataControlBox>
        <ButtonGroup>
          {buttonNames.map((name, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(index)}
              style={
                selectedButtonIndex === index
                  ? { borderBottom: "2px solid #018ec8", color: "#018ec8" }
                  : {}
              }
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
        <SearchBox>
          <Input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <SearchIcon icon={faSearch} onClick={handleSearch} />
        </SearchBox>
      </DataControlBox>
    </div>
  );
}

export default DataControlUser;
