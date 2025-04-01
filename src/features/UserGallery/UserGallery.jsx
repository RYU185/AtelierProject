import React from "react";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
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

function UserGallery() {
  return (
    <div>
      <TitleContainer>
        <BackTitle>User GALLERY</BackTitle>
        <Title>User GALLERY</Title>
      </TitleContainer>
      <DataControlUser />
      <UserGalleryList />
    </div>
  );
}

export default UserGallery;
