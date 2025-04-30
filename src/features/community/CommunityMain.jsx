import React from "react";
import CommunityList from "./components/CommunityList.jsx";
import Footer from "../Footer";
import Header from "../Header";
import styled from "styled-components";
import TopButton from "../TopButton.jsx";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`; 

const Container = styled.div`
  width: 100%;
  margin-top: 70px;
`;

function CommunityMain() {
  return (
    <GradientBackground>
      <Header />
      <Container>
        <CommunityList />
      </Container>
      <TopButton />
      <Footer />
    </GradientBackground>
  );
}

export default CommunityMain;
