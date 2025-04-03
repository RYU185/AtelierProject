// components/SupportTab.jsx
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
`;

const TabItem = styled(NavLink)`
  padding: 12px 0;
  font-size: 16px;
  color: #888;
  font-weight: 500;
  text-decoration: none;
  position: relative;

  &.active {
    color: #007aff;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #007aff;
    }
  }
`;

const SupportTab = () => {
  return (
    <TabWrapper>
      <TabItem to="/support/notice">공지사항</TabItem>
      <TabItem to="/support/guide">시설 안내</TabItem>
      <TabItem to="/support/location">오시는 길</TabItem>
      <TabItem to="/support/contact">문의하기</TabItem>
    </TabWrapper>
  );
};

export default SupportTab;
