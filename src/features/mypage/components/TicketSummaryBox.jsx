import React from "react";
import styled from "styled-components";

const Box = styled.div`
  padding: 16px 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  strong {
    color: #007bff;
  }
`;

const TicketSummaryBox = ({ count }) => {
  return (
    <Box>
      총 <strong>{count}</strong>개의 티켓이 활성화 되어 있습니다.
    </Box>
  );
};

export default TicketSummaryBox;