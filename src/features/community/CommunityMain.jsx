import React from "react";
import CommunityList from "./components/CommunityList";
import Footer from "../Footer";
import Header from "../Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

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
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default CommunityMain;
