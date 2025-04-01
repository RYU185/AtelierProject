import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DataControlBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px solid #bababa;
`;
const SearchBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #606060;
  transition: 0.3s ease;
  border-bottom: 3px solid #ffffff;
  &:hover {
    color: #018ec8;
  }
`;
const Input = styled.input`
  width: 400px;
  border: 2px solid #018ec8;
  border-radius: 7px;
  &:focus {
    outline: none;
    border-color: #018ec8;
  }
`;

function DataControlUser() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  useEffect(() => {
    console.log("DataControlUser 컴포넌트가 렌더링되었습니다.");
  }, []);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  const buttonNames = ["전체", "현재 전시", "과거 전시", "예정 전시"];

  return (
    <div>
      <DataControlBox>
        <SearchBox>
          {buttonNames.map((name, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(index)}
              style={
                selectedButtonIndex === index
                  ? { borderBottom: "3px solid #018ec8", color: "#018ec8" }
                  : {}
              }
            >
              {name}
            </Button>
          ))}
        </SearchBox>
        <Input type="text" placeholder="검색어를 입력해 주세요" />
      </DataControlBox>
    </div>
  );
}

export default DataControlUser;
