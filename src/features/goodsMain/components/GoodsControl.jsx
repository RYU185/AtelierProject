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
  width: 150px;
  padding: 11px;
  font-size: 20px;
  border: 1px solid #007bff;
  background: #ffffff;
  color: #0056b3;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    background: #0056b3;
    color: #ffffff;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background: white;
  border: 1px solid #007bff;
  border-radius: 4px;
  z-index: 1;
  margin-top: 5px;
  transition: 0.5s ease;

  ${Filter}:hover & {
    display: block;
    background-color: #007bff;
    color: #ffffff;
  }
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
        <SortButton>Sort By</SortButton>
        <DropdownMenu>
          <DropdownItem onClick={() => setSortOption("newest")}>신상품</DropdownItem>
          <DropdownItem onClick={() => setSortOption("low-price")}>낮은 가격순</DropdownItem>
          <DropdownItem onClick={() => setSortOption("high-price")}>높은 가격순</DropdownItem>
        </DropdownMenu>
      </Filter>
    </ControlContainer>
  );
};

export default GoodsControl;
