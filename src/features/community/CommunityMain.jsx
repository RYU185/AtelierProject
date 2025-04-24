import React from "react";
import CommunityList from "./components/CommunityList.jsx";
import Footer from "../Footer";
import Header from "../Header";
import styled from "styled-components";
import TopButton from "../TopButton.jsx";

const Container = styled.div`
  width: 100%;
  margin-top: 70px;
`;

function CommunityMain() {
  return (
    <div>
      <Header />
      <Container>
        <CommunityList />
        {/* Outlet 제거 */}
      </Container>
      <TopButton />
      <Footer />
    </div>
  );
}

export default CommunityMain;
