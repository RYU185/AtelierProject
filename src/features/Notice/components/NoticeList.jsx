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

const HeaderBox = styled(Box)`
  font-weight: bold;
  background-color: #f5f5f5;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;
`;

const NoticeItem = styled(Box)`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export default function NoticeList() {
  return (
    <div>
      <Container>
        <Box>
          <div>날짜</div>
          <div>제목</div>
          <div>ㄷ</div>
        </Box>
      </Container>
    </div>
  );
}
