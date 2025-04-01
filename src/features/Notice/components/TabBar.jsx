import styled from "styled-components";
import React, { useState } from "react";

const TabBarBox = styled.div`
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
    color: #000;
  }
`;

function TabBar() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedButtonIndex(index);
  };

  const buttonNames = ["공지사항", "시설안내", "오시는 길", "고객센터"];

  return (
    <div>
      <TabBarBox>
        <SearchBox>
          {buttonNames.map((name, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(index)}
              style={
                selectedButtonIndex === index
                  ? { borderBottom: "2px solid #000", color: "#000" }
                  : {}
              }
            >
              {name}
            </Button>
          ))}
        </SearchBox>
      </TabBarBox>
    </div>
  );
}

export default TabBar;
