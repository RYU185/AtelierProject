import React from "react";
import GoodsCard from "./GoodsCard";
import styled from "styled-components";

const GoodsContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-content: center;
`;

export default function GoodsList() {
  return (
    <div>
      <GoodsContainer>
        <GoodsCard />
        <GoodsCard />
        <GoodsCard />
        <GoodsCard />
        <GoodsCard />
        <GoodsCard />
        <GoodsCard />
      </GoodsContainer>
    </div>
  );
}
