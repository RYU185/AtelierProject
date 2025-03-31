import React, { useState } from "react";
import styled from "styled-components";

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 22rem;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Filter = styled.div`
  position: relative;
  display: inline-block;
`;

const SortButton = styled.button`
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  margin-top: 5px;
`;

const DropdownItem = styled.button`
  padding: 10px;
  border: none;
  background: white;
  text-align: left;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const GoodsControl = ({ setSortOption, setSearchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ControlContainer>
      <SearchInput type="text" placeholder="검색어를 입력해 주세요" onChange={handleSearchChange} />
      <Filter>
        <SortButton onClick={toggleDropdown}>Sort By</SortButton>
        <DropdownMenu isOpen={isOpen}>
          <DropdownItem
            onClick={() => {
              setSortOption("newest");
              setIsOpen(false);
            }}
          >
            신상품
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setSortOption("price");
              setIsOpen(false);
            }}
          >
            가격순
          </DropdownItem>
        </DropdownMenu>
      </Filter>
    </ControlContainer>
  );
};

export default GoodsControl;
