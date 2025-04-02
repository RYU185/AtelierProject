import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

export default function NoticeDetail() {
  return (
    <div>
      <Header />
      <TitleContainer>
        <BackTitle>Notice</BackTitle>
        <Title>Notice</Title>
      </TitleContainer>
      <Footer />
    </div>
  );
}
