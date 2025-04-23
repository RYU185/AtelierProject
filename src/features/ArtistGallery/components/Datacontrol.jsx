import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DataControlBox = styled.div`
  width: 52%;
  margin: 0 auto;
  margin-top: 3.125rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #2c2c2c;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: .625rem .9375rem;
  cursor: pointer;
  font-size: .9375rem;
  color: #606060;
  transition: 0.3s ease;
  border-bottom: .1875rem solid #ffffff;
  &:hover {
    color: #018ec8;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 18.75rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: .0625rem solid #ffffff;
  border-radius: .4375rem;
  padding: .5rem 1.875rem .5rem .625rem;
  background-color: #2424241d;
  color: #ffffff;
  transition: 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #018ec8;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: .625rem;
  color: #018ec8;
  font-size: 1.2em;
  cursor: pointer;
`;

function Datacontrol({ onFilterChange }) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const buttonNames = ["전체", "현재 전시", "과거 전시", "예정 전시"];

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
    let apiUrl = "/api/artistgallery";
    switch (index) {
      case 1:
        apiUrl = "/api/artistgallery/now";
        break;
      case 2:
        apiUrl = "/api/artistgallery/past";
        break;
      case 3:
        apiUrl = "/api/artistgallery/expected";
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
      fetchGalleryData(`/api/artistgallery/title/${searchTerm.trim()}`);
    } else {
      fetchGalleryData("/api/artistgallery");
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
                  ? { borderBottom: ".125rem solid #018ec8", color: "#018ec8" }
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

export default Datacontrol;
