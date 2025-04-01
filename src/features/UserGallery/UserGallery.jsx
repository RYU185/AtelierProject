import React, { useEffect } from "react";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
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
  useEffect(() => {
    console.log("UserGallery 컴포넌트가 렌더링되었습니다.");
  }, []);

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
