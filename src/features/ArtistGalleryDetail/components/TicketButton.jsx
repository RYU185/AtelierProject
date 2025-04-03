import React from "react";
import styled from "styled-components";

const Button = styled.div`
  width: 250px;
  text-align: center;
  border: 1px solid #018ec8;
  border-radius: 5px;
  background-color: #018ec8;
  color: #ffffff;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #007acc;
  }
`;

function TicketButton() {
  return (
    <div>
      <Button>티켓 예매하기</Button>
    </div>
  );
}

export default TicketButton;
