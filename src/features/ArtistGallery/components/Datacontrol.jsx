import React from "react";
import styled from "styled-components";

const DataControlBox = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px solid black;
`;
const SearchBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.div`
  font-size: 20px;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: #f8f8ff;
    background-color: #018ec8;
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

function Datacontrol() {
  return (
    <div>
      <DataControlBox>
        <SearchBox>
          <Button>전체</Button>
          <Button>현재 전시</Button>
          <Button>과거 전시</Button>
          <Button>예정 전시</Button>
        </SearchBox>
        <Input type="text" placeholder="검색어를 입력해 주세요" />
      </DataControlBox>
    </div>
  );
}

export default Datacontrol;
