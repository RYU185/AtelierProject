import React, { useState } from "react";
import DataControlUser from "./components/DataControlUser";
import UserGalleryList from "./components/UserGalleryList";
import styled from "styled-components";
import TopButton from "../TopButton";

const GradientBackground = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at 0% 0%, rgb(0, 0, 0), rgb(1, 9, 26) 40%, #000000 100%);
`;   


const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding-top: 6.25rem ;
  padding-bottom: 6.25rem;
`;

const BackTitle = styled.h1`
  font-size: 200px;
  text-align: center;
  color: #8d8d8d26;
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
  color: #f0f0f0;
`;

function UserGallery() {
  const [filteredGalleryItems, setFilteredGalleryItems] = useState([]);

  const handleFilterChange = (data) => {
    setFilteredGalleryItems(data);
  };

  return (
    <GradientBackground>
      <TitleContainer>
        <BackTitle>USER GALLERY</BackTitle>
        <Title>USER GALLERY</Title>
      </TitleContainer>
      <DataControlUser onFilterChange={handleFilterChange} />
      <UserGalleryList filteredItems={filteredGalleryItems} />
      <TopButton />
    </GradientBackground>
  );
}

export default UserGallery;
