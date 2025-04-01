import React from "react";
import Header from "../Header";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
import Footer from "../Footer";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
`;
const BackTitle = styled.h1`
  font-size: 140px;
  text-align: center;
  color: #deeaff;
  padding-top: 100px;
  margin-bottom: 0px;
`;
const Title = styled.h1`
  font-size: 90px;
  text-align: center;
  margin-top: -130px;
  margin-bottom: 150px;
`;

function UserGallery() {
  return (
    <div>
      <Header />
      <TitleContainer>
        <BackTitle>User GALLERY</BackTitle>
        <Title>User GALLERY</Title>
      </TitleContainer>
      <DataControlUser />
      <UserGalleryList />
      <Footer />
    </div>
  );
}

export default UserGallery;
