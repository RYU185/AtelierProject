import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  & > div {
    padding: 8px;
  }
`;

// const HeaderBox = styled(Box)`
//   font-weight: bold;
//   background-color: #f5f5f5;
//   border-top: 2px solid #333;
//   border-bottom: 1px solid #333;
// `;

// const NoticeItem = styled(Box)`
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #f9f9f9;
//   }
// `;

const Search = styled.div`
  width: 80%;
  padding-top: 10px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 2px solid #018ec8;
  border-radius: 3px;
  &:focus {
    outline: none;
    border-color: #018ec8;
  }
`;

const Button = styled.button`
  width: 100px;
  border-style: 1px;
  font-size: 20px;
  color: #018ec8;
  border: 2px solid #018ec8;
  border-radius: 3px;
  background-color: #fff;
  &:hover {
    padding: 5px;
    color: #fff;
    border: 2px solid #fff;
    background-color: #018ec8;
    border-radius: 4px;
  }
`;

export default function NoticeList() {
  return (
    <div>
      <Search>
        <Input type="text" placeholder="검색어를 입력해 주세요" />
        <div>
          <Button>검색정렬</Button>
          <Button>최근순</Button>
          <Button>늦은순</Button>
        </div>
      </Search>
      <Container>
        <Box>
          <div>날짜</div>
          <div>제목</div>
          <div>O</div>
        </Box>
      </Container>
    </div>
  );
}
