import React from "react";

eimport styled from "styled-components";

const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 10px 22px;
  font-size: 14px;
  font-weight: bold;
  background: ${({ active }) => (active ? "#3DA9FC" : "#e5e5e5")};
  color: ${({ active }) => (active ? "white" : "#666")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ active }) => (active ? "#3da0e5" : "#ccc")};
  }
`;

const Tabs = ({ tab, setTab }) => {
  return (
    <TabGroup>
      <Tab active={tab === "ticket"} onClick={() => setTab("NOTICE")}>
        공지사항
      </Tab>
      <Tab active={tab === "goods"} onClick={() => setTab("GUIDE")}>
        시설안내
      </Tab>
      <Tab active={tab === "draw"} onClick={() => setTab("draw")}>
        오시는 길
      </Tab>
      <Tab active={tab === "draw"} onClick={() => setTab("CONNTACT")}>
        고객센터
      </Tab>
    </TabGroup>
  );
};

