import React from "react";
import styled from "styled-components";

const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 10px 22px;
  font-size: 14px;
  background-color: #fff;
  /* border-style: none none 1px; */
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    font-weight: bold;
  }
`;

const tabs = [
  { key: "notice", label: "공지사항" },
  { key: "direction", label: "시설안내" },
  { key: "guide", label: "오시는 길" },
  { key: "contact", label: "고객센터" },
];

const TabBar = ({ tab, setTab }) => {
  return (
    <TabGroup>
      {tabs.map(({ key, label }) => (
        <Tab key={key} active={tab === key} onClick={() => setTab(key)}>
          {label}
        </Tab>
      ))}
    </TabGroup>
  );
};

export default TabBar;
