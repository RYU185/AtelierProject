import React from "react";
import Community from "./Community";
import styled from "styled-components";

const Container = styled.div`
  width: 50%;
  height: 800px;
  background-color: #e5f0fb;
  margin: 0 auto;
`;
const Button = styled.button``;

function CommunityList() {
  return (
    <div>
      <Container>
        <Button>게시글 등록</Button>
        <Button>나의 글 보기</Button>
        <Button>작품 그리기</Button>
        <Community />
      </Container>
    </div>
  );
}

export default CommunityList;
