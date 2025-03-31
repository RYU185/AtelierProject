import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets }) => {
  return (
    <div>
      <p style={{ marginBottom: "16px", fontWeight: "bold" }}>
        총 {tickets.length}개의 티켓이 활성화 되어 있습니다.
      </p>
      {tickets.map((ticket, i) => (
        <TicketItem key={i} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
