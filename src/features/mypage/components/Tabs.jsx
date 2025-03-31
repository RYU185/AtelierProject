import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ccc;
  background: ${(props) => (props.$active ? "#339dff" : "#f5f5f5")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.$active ? "#339dff" : "#eaeaea")};
  }
`;

const Tabs = ({ tab, setTab }) => {
  return (
    <Wrapper>
      <TabButton $active={tab === "ticket"} onClick={() => setTab("ticket")}>
        나의 티켓
      </TabButton>
      <TabButton $active={tab === "goods"} onClick={() => setTab("goods")}>
        굿즈 구매내역
      </TabButton>
      <TabButton $active={tab === "drawing"} onClick={() => setTab("drawing")}>
        나의 드로잉
      </TabButton>
    </Wrapper>
  );
};

export default Tabs;
