import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background: #111;
  color: white;
  font-size: 21px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Left>
        <p>TEAM.Project</p>
        <p>DW ACADEMY</p>
      </Left>
      <Right>
        <p>개인정보처리방침</p>
        <p>Copyright © TEAM All Rights Reserved.</p>
      </Right>
    </FooterWrapper>
  );
};

export default Footer;
