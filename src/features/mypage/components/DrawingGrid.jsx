import React from "react";
import styled from "styled-components";
import DrawingItem from "./DrawingItem";

const DrawingGrid = ({ drawings }) => {
  return (
    <Grid>
      {drawings.map((item, idx) => (
        <DrawingItem key={idx} item={item} />
      ))}
    </Grid>
  );
};

export default DrawingGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
