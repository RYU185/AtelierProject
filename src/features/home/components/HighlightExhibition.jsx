import React from "react";
import styled from "styled-components";
import Gogh from "../../../assets/images/gogh.jpg";

const Section = styled.section`
  display: flex;
  width: 100%;
  height: 600px;
`;

const LeftBox = styled.div`
  width: 35%;
  background: linear-gradient(to right, #0080ff, #00c0ff);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end; 
  padding-right: 60px; 
  padding-left: 50px;
`;

const Title = styled.h2`
  font-size: 90px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 30px;
  margin-top: 6px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: white;
  margin-top: 20px;
`;

const RightBox = styled.div`
  width: 65%;
  background-size: cover;
  background-position: center;
`;

const HighlightExhibition = () => {
  return (
    <Section>
      <LeftBox>
        <Title>기획전</Title>
        <Subtitle>USER’S GALLERY</Subtitle>
        <Line />
      </LeftBox>

      <RightBox style={{ backgroundImage: `url(${Gogh})` }} />
    </Section>
  );
};

export default HighlightExhibition;
