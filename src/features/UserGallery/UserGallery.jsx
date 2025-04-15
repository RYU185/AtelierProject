import React, { useState } from "react";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
import styled from "styled-components";
import TopButton from "../TopButton";

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
  const [filteredGalleryItems, setFilteredGalleryItems] = useState([]);

  const handleFilterChange = (data) => {
    setFilteredGalleryItems(data);
  };

  return (
    <div>
      <TitleContainer>
        <BackTitle>USER GALLERY</BackTitle>
        <Title>USER GALLERY</Title>
      </TitleContainer>
      <DataControlUser onFilterChange={handleFilterChange} />
      <UserGalleryList filteredItems={filteredGalleryItems} />
      <TopButton />
    </div>
  );
}

export default UserGallery;
